import { Button } from "../../components/ui/button";
import { JSX, useState, useEffect } from "react";
import { FooterMedico } from "../../components/ui/footer";
import { usePDF } from "react-to-pdf";
import Receta from "../../components/ui/receta";
import BackButton from "../../components/ui/returnButton";

type Principio = {
  id_principio: string;
  nombre: string;
  duracion: string;
  frecuencia: string;
};

type Prescripcion = {
  id_prescripcion: string;
  medico_nombre: string;
  paciente_nombre: string;
  principios: Principio[];
};

export const EmitirRecetas = (): JSX.Element => {
  const [prescripcionSeleccionada, setPrescripcionSeleccionada] = useState<Prescripcion | null>(null);
  const [mensajeError, setMensajeError] = useState<string>("");
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [prescripciones, setPrescripciones] = useState<Prescripcion[]>([]);

  const { toPDF, targetRef } = usePDF({ filename: "receta.pdf" });

  const rutValido = (r: string) => {
    return r.trim().length > 9 && r.includes("-");
  };

  useEffect(() => {
    const fetchPrescripciones = async () => {
      if (!rutValido(rut)) return;

      const baseURL = "http://localhost:8080";
      const token = localStorage.getItem("token") || "";

      try {
        console.log("Buscando paciente con RUT:", rut);

        const pacienteRes = await fetch(`${baseURL}/pacientes/rut/${rut}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!pacienteRes.ok) {
          const errorText = await pacienteRes.text();
          console.error("Error paciente:", errorText);
          throw new Error("Paciente no encontrado");
        }

        const paciente = await pacienteRes.json();
        setNombre(paciente.nombre);

        const prescripcionesRes = await fetch(`${baseURL}/prescripcion/paciente/${paciente.id_paciente}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!prescripcionesRes.ok) {
          const errorText = await prescripcionesRes.text();
          console.error("Error prescripciones:", errorText);
          throw new Error("No se pudieron obtener prescripciones");
        }

        const prescripcionesData = await prescripcionesRes.json();
        console.log("Prescripciones recibidas:", prescripcionesData);

        setPrescripciones(prescripcionesData);
        setPrescripcionSeleccionada(null);
        setMensajeError("");
      } catch (err) {
        console.error("Error al obtener paciente o prescripciones:", err);
        setPrescripciones([]);
        setPrescripcionSeleccionada(null);
        setMensajeError("Error al obtener paciente o prescripciones.");
      }
    };

    fetchPrescripciones();
  }, [rut]);

  const handleSeleccionPrescripcion = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSeleccionado = e.target.value;
    const seleccionada = prescripciones.find(p => p.id_prescripcion === idSeleccionado) || null;

    if (!seleccionada) {
      setPrescripcionSeleccionada(null);
      return;
    }

    const token = localStorage.getItem("token") || "";

    try {
      // Para cada principio, hacemos fetch para obtener su nombre
      const principiosConNombre = await Promise.all(
        seleccionada.principios.map(async (med) => {
          const res = await fetch(`http://localhost:8080/medicamentos/principios/${med.id_principio}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            console.error(`No se pudo obtener el principio ${med.id_principio}`);
            return {
              ...med,
              nombre: "Nombre no encontrado",
            };
          }

          const data = await res.json();
          return {
            ...med,
            nombre: data.nombre,
          };
        })
      );

      setPrescripcionSeleccionada({
        ...seleccionada,
        principios: principiosConNombre,
      });

    } catch (error) {
      console.error("Error al obtener nombres de principios:", error);
      setPrescripcionSeleccionada(seleccionada); // Sin nombres
    }
  };

  const handleEmitirReceta = async () => {
    if (!rut || !prescripcionSeleccionada) {
      setMensajeError("Por favor completa todos los campos.");
      return;
    }

    setMensajeError("");

    const baseURL = "http://localhost:8080";
    const token = localStorage.getItem("token") || "";

    try {
      // POST para crear receta en backend
      const res = await fetch(`${baseURL}/prescripcion/agregar-receta/${prescripcionSeleccionada.id_prescripcion}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al crear receta: ${errorText}`);
      }

      const data = await res.json();
      console.log("Receta creada:", data);

      // Generar PDF
      toPDF();

    } catch (error: any) {
      console.error("Error al emitir receta:", error);
      setMensajeError(error.message || "Error al emitir receta");
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
              <h1 className="text-xl font-semibold">Emitir recetas</h1>
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
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Ej: 12345678-9"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
          </div>

          {/* Mostrar prescripciones y botón solo si RUT válido y hay prescripciones */}
          {rutValido(rut) && prescripciones.length > 0 && (
            <>
              <div className="mb-6">
                <p className="mt-1 text-sm text-gray-700 mb-6">
                  <strong>Nombre del paciente:</strong> {nombre}
                </p>

                <label className="block text-sm font-medium text-gray-700">Prescripción asociada</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={handleSeleccionPrescripcion}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona una prescripción
                  </option>
                  {prescripciones.map((prescripcion, index) => (
                    <option
                      key={prescripcion.id_prescripcion}
                      value={prescripcion.id_prescripcion}
                    >
                      {`Prescripción #${index + 1} - ${prescripcion.medico_nombre}`}
                    </option>
                  ))}
                </select>
              </div>

              {prescripcionSeleccionada && (
                <div className="space-y-4 mt-6">
                  <h6 className="font-medium">Detalles de la prescripción</h6>
                  {prescripcionSeleccionada.principios.map((med, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded-md">
                      <p>
                        <strong>Nombre:</strong> {med.nombre}
                      </p>
                      <p>
                        <strong>Duración:</strong> {med.duracion}
                      </p>
                      <p>
                        <strong>Frecuencia:</strong> {med.frecuencia}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center mt-4">
                <Button size="lg" className="w-full" onClick={handleEmitirReceta}>
                  Emitir receta
                </Button>
              </div>
            </>
          )}

          {/* Mensajes para usuario */}
          {rut && !rutValido(rut) && (
            <p className="text-red-600 text-center">Por favor ingresa un RUT válido.</p>
          )}
          {rutValido(rut) && prescripciones.length === 0 && (
            <p className="text-gray-600 text-center">No hay prescripciones para este paciente.</p>
          )}

          {mensajeError && (
            <div className="mb-4 pt-4">
              <p className="text-red-600 text-sm">{mensajeError}</p>
            </div>
          )}
        </div>

        <FooterMedico />

        {/* Contenido oculto para PDF */}
        <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }} ref={targetRef}>
          <Receta
            nombrePaciente={nombre || "Nombre no definido"}
            edad="30"
            direccion="Av. Libertador 1234"
            ciudad="Santiago"
            ci={rut || "RUT no definido"}
          />
        </div>
      </div>
    </div>
  );
};
