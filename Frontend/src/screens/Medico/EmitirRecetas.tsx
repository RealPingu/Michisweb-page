import { Button } from "../../components/ui/button";
import { JSX, useState, useEffect } from "react";
import { FooterMedico } from "../../components/ui/footer";
import BackButton from "../../components/ui/returnButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RecetaPDF from "../../components/ui/receta";

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
  const [showRecetaModal, setShowRecetaModal] = useState(false);

  const rutValido = (r: string) => r.trim().length > 9 && r.includes("-");

  useEffect(() => {
    const fetchPrescripciones = async () => {
      if (!rutValido(rut)) return;

      const baseURL = "http://localhost:8080";
      const token = localStorage.getItem("token") || "";

      try {
        const pacienteRes = await fetch(`${baseURL}/pacientes/rut/${rut}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!pacienteRes.ok) throw new Error("Paciente no encontrado");

        const paciente = await pacienteRes.json();
        setNombre(paciente.nombre);

        const prescripcionesRes = await fetch(
          `${baseURL}/prescripcion/paciente/${paciente.id_paciente}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!prescripcionesRes.ok)
          throw new Error("No se pudieron obtener prescripciones");

        const prescripcionesData = await prescripcionesRes.json();
        setPrescripciones(prescripcionesData);
        setPrescripcionSeleccionada(null);
        setMensajeError("");
      } catch (err) {
        console.error(err);
        setPrescripciones([]);
        setPrescripcionSeleccionada(null);
        setMensajeError("Error al obtener paciente o prescripciones.");
      }
    };

    fetchPrescripciones();
  }, [rut]);

  const handleSeleccionPrescripcion = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const idSeleccionado = e.target.value;
    const seleccionada = prescripciones.find(
      (p) => p.id_prescripcion === idSeleccionado
    ) || null;

    if (!seleccionada) {
      setPrescripcionSeleccionada(null);
      return;
    }

    const token = localStorage.getItem("token") || "";

    try {
      const principiosConNombre = await Promise.all(
        seleccionada.principios.map(async (med) => {
          const res = await fetch(
            `http://localhost:8080/medicamentos/principios/${med.id_principio}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (!res.ok) {
            console.error(`No se pudo obtener el principio ${med.id_principio}`);
            return { ...med, nombre: "Nombre no encontrado" };
          }

          const data = await res.json();
          return { ...med, nombre: data.nombre };
        })
      );

      setPrescripcionSeleccionada({
        ...seleccionada,
        principios: principiosConNombre,
      });
    } catch (error) {
      console.error("Error al obtener nombres de principios:", error);
      setPrescripcionSeleccionada(seleccionada); // fallback sin nombres
    }
  };

  const handleEmitirReceta = () => {
    if (!rut || !prescripcionSeleccionada) {
      setMensajeError("Por favor completa todos los campos.");
      return;
    }

    setMensajeError("");
    setShowRecetaModal(true);
  };

  const handleSolicitarRetiro = async () => {
    if (!prescripcionSeleccionada) {
      setMensajeError("Debes seleccionar una prescripción primero.");
      return;
    }

    const token = localStorage.getItem("token") || "";
    const id = prescripcionSeleccionada.id_prescripcion;

    try {
      const res = await fetch(`http://localhost:8080/prescripcion/agregar-receta/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("No se pudo emitir la receta");

      const data = await res.json();
      console.log("Receta creada:", data);

      alert("✅ Receta enviada a farmacia CESFAM correctamente");
    } catch (error) {
      console.error("Error al emitir receta:", error);
      alert("❌ Error al emitir receta a CESFAM");
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

          {rutValido(rut) && prescripciones.length > 0 && (
            <>
              <div className="mb-6">
                <p className="mt-1 text-sm text-gray-700 mb-6">
                  <strong>Nombre del paciente:</strong> {nombre}
                </p>

                <label className="block text-sm font-medium text-gray-700">
                  Prescripción asociada
                </label>
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
                    <div
                      key={index}
                      className="border border-gray-300 p-4 rounded-md"
                    >
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

              <div className="text-center mt-4 space-y-2">
                <Button
                  className="w-full"
                  onClick={handleSolicitarRetiro}
                >
                  Solicitar retiro en farmacia CESFAM
                </Button>

                <Button size="lg" className="w-full" onClick={handleEmitirReceta}>
                  Emitir receta PDF
                </Button>
              </div>

              {showRecetaModal && prescripcionSeleccionada && (
                <div className="mt-6 text-center">
                  <PDFDownloadLink
                    document={
                      <RecetaPDF
                        nombrePaciente={nombre}
                        edad="30"
                        direccion="Av. Libertador 1234"
                        ciudad="Santiago"
                        ci={rut}
                      />
                    }
                    fileName="receta.pdf"
                  >
                    {({ loading }) => (
                      <Button className="mt-2">
                        {loading ? "Generando PDF..." : "Descargar PDF"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </div>
              )}
            </>
          )}

          {rut && !rutValido(rut) && (
            <p className="text-red-600 text-center">
              Por favor ingresa un RUT válido.
            </p>
          )}
          {rutValido(rut) && !mensajeError && prescripciones.length === 0 && (
            <p className="text-gray-600 text-center">
              No hay prescripciones para este paciente.
            </p>
          )}
          {mensajeError && (
            <div className="mb-4 pt-4">
              <p className="text-red-600 text-center">{mensajeError}</p>
            </div>
          )}
        </div>

        <FooterMedico />
      </div>
    </div>
  );
};
