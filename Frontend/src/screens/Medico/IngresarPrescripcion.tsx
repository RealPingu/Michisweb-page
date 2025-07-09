import { Button } from "../../components/ui/button";
import { useState, useEffect, JSX } from "react";
import { FooterMedico } from "../../components/ui/footer";
import BackButton from "../../components/ui/returnButton";
import { Plus, Trash } from "lucide-react";

// Tipos para medicamento/principio
type MedicamentoForm = {
  id_principio: string; // id del principio activo seleccionado
  duracion: string;
  frecuencia: string;
};

type PrincipioActivo = {
  id_principio: string;
  nombre: string;
};

export const IngresarPrescripcion = (): JSX.Element => {
  const [rutPaciente, setRutPaciente] = useState("");
  const [medicamentos, setMedicamentos] = useState<MedicamentoForm[]>([
    { id_principio: "", duracion: "", frecuencia: "" },
  ]);
  const [principiosDisponibles, setPrincipiosDisponibles] = useState<PrincipioActivo[]>([]);
  const [mensajeError, setMensajeError] = useState("");

  // Función para decodificar JWT
  function parseJwt(token: string) {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  useEffect(() => {
    // Al montar, traer principios disponibles para seleccionar
    const fetchPrincipios = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        const res = await fetch("http://localhost:8080/medicamentos/principios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al cargar principios");
        const data = await res.json();
        setPrincipiosDisponibles(data);
      } catch (err) {
        console.error(err);
        setMensajeError("No se pudieron cargar los principios activos.");
      }
    };
    fetchPrincipios();
  }, []);

  const agregarMedicamento = () => {
    setMedicamentos([...medicamentos, { id_principio: "", duracion: "", frecuencia: "" }]);
  };

  const eliminarMedicamento = (index: number) => {
    const nuevosMedicamentos = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(nuevosMedicamentos);
  };

  const handleInputChange = (index: number, campo: keyof MedicamentoForm, valor: string) => {
    const nuevos = [...medicamentos];
    nuevos[index][campo] = valor;
    setMedicamentos(nuevos);
  };

  const handleGuardarPrescripcion = async () => {
    if (!rutPaciente.trim()) {
      setMensajeError("Por favor ingrese el rut del paciente.");
      return;
    }
    for (const med of medicamentos) {
      if (!med.id_principio || !med.duracion.trim() || !med.frecuencia.trim()) {
        setMensajeError("Por favor completa todos los campos de los medicamentos.");
        return;
      }
    }

    const token = localStorage.getItem("token") || "";
    const decoded = parseJwt(token);
    const id_medico = decoded?.id;

    if (!id_medico) {
      setMensajeError("No se pudo obtener el ID del médico del token.");
      return;
    }

    try {
      // Primero obtener id_paciente desde backend usando rutPaciente
      const pacienteRes = await fetch(`http://localhost:8080/pacientes/rut/${rutPaciente}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!pacienteRes.ok) {
        setMensajeError("Paciente no encontrado con ese RUT.");
        return;
      }
      const pacienteData = await pacienteRes.json();
      const id_paciente = pacienteData.id_paciente;

      // Crear el body para la prescripción
      const body = {
        id_medico,
        id_paciente,
        principios: medicamentos.map((med) => ({
          id_principio: med.id_principio,
          duracion: med.duracion,
          frecuencia: med.frecuencia,
        })),
      };

      // POST para crear prescripción
      const res = await fetch("http://localhost:8080/prescripcion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMensajeError(`Error al guardar prescripción: ${errorText}`);
        return;
      }

      setMensajeError("");
      alert("Prescripción creada correctamente.");
      // Limpiar formulario
      setRutPaciente("");
      setMedicamentos([{ id_principio: "", duracion: "", frecuencia: "" }]);
    } catch (error) {
      console.error(error);
      setMensajeError("Error en la conexión al guardar la prescripción.");
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/medico" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Ingresar prescripción</h1>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-36 px-4 pb-32">
          <div className="mb-6">
            <h5 className="text-lg font-medium">Datos del paciente</h5>
            <hr />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">RUT</label>
            <input
              type="text"
              value={rutPaciente}
              onChange={(e) => setRutPaciente(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 12345678-9"
            />
          </div>
          <div className="mb-6">
            <h5 className="text-lg font-medium">Prescripción</h5>
            <hr />
          </div>

          {medicamentos.map((medicamento, index) => (
            <div key={index} className="mb-6 border border-gray-200 rounded-md p-4 relative">
              {index > 0 && (
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => eliminarMedicamento(index)}
                  className="absolute top-1 right-1 z-0"
                >
                  <Trash />
                </Button>
              )}
              <label className="block text-sm font-medium text-gray-700 pb-2">
                Medicamento #{index + 1}
              </label>
              <select
                value={medicamentos[index].id_principio}
                onChange={(e) => handleInputChange(index, "id_principio", e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Selecciona un principio activo
                </option>
                {principiosDisponibles.map((p) => (
                  <option key={p.id_principio} value={p.id_principio}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={medicamentos[index].duracion}
                onChange={(e) => handleInputChange(index, "duracion", e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 14 días"
              />
              <input
                type="text"
                value={medicamentos[index].frecuencia}
                onChange={(e) => handleInputChange(index, "frecuencia", e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 12 horas"
              />
            </div>
          ))}

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <Button variant="secondary" size="icon" className="mx-4" onClick={agregarMedicamento}>
              <Plus />
            </Button>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <div className="text-center mt-4">
            <Button size="lg" className="w-full" onClick={handleGuardarPrescripcion}>
              Guardar prescripción
            </Button>
          </div>

          {mensajeError && (
            <div className="mb-4 pt-4">
              <p className="text-red-600 text-sm">{mensajeError}</p>
            </div>
          )}
        </div>

        <FooterMedico />
      </div>
    </div>
  );
};
