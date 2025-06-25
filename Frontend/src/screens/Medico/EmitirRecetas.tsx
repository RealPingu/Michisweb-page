import { Button } from "../../components/ui/button";
import { JSX, useState } from "react";
import { FooterMedico } from "../../components/ui/footer";
import { usePDF } from "react-to-pdf";
import Receta from "../../components/ui/receta";
import BackButton from "../../components/ui/returnButton";

type Medicamento = {
  nombre: string;
  duracion: string;
  frecuencia: string;
};

type Prescripcion = {
  id: string;
  medicamentos: Medicamento[];
};

const prescripcionesMock: Prescripcion[] = [
  {
    id: "Prescripción Paracetamol-Amoxicilina",
    medicamentos: [
      { nombre: "Paracetamol", duracion: "5 días", frecuencia: "8 horas" },
      { nombre: "Amoxicilina", duracion: "7 días", frecuencia: "12 horas" },
    ],
  },
  {
    id: "Prescripción Ibuprofeno",
    medicamentos: [{ nombre: "Ibuprofeno", duracion: "3 días", frecuencia: "6 horas" }],
  },
  {
    id: "Prescripción Vitamina C",
    medicamentos: [{ nombre: "Vitamina C", duracion: "10 días", frecuencia: "1 día" }],
  },
];

export const EmitirRecetas = (): JSX.Element => {
  const [prescripcionSeleccionada, setPrescripcionSeleccionada] = useState<Prescripcion | null>(null);
  const [mensajeError, setMensajeError] = useState<string>("");
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const handleSeleccionPrescripcion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSeleccionado = e.target.value;
    const seleccionada = prescripcionesMock.find(p => p.id === idSeleccionado) || null;
    setPrescripcionSeleccionada(seleccionada);
    setMensajeError("");
  };
  const { toPDF, targetRef } = usePDF({ filename: "receta.pdf" });
  const handleEmitirReceta = () => {
    if (!nombre || !rut || !prescripcionSeleccionada) {
      setMensajeError("Por favor completa todos los campos.");
      return;
    }
    setMensajeError("");
    toPDF();
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
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Ej: Juanito Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">RUT</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Ej: 12.345.678-9"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <h5 className="text-lg font-medium">Medicamentos</h5>
            <hr />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Prescripción asociada</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              onChange={handleSeleccionPrescripcion}
              defaultValue=""
            >
              <option value="" disabled>Selecciona una prescripción</option>
              {prescripcionesMock.map((prescripcion) => (
                <option key={prescripcion.id} value={prescripcion.id}>
                  {prescripcion.id}
                </option>
              ))}
            </select>
          </div>

          {prescripcionSeleccionada && (
            <div className="space-y-4 mt-6">
              <h6 className="font-medium">Detalles de la prescripción</h6>
              {prescripcionSeleccionada.medicamentos.map((med, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded-md">
                  <p><strong>Medicamento:</strong> {med.nombre}</p>
                  <p><strong>Duración:</strong> {med.duracion}</p>
                  <p><strong>Frecuencia:</strong> {med.frecuencia}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <Button size="lg" className="w-full" onClick={handleEmitirReceta}>Emitir receta</Button>
          </div>

          {/* Error */}
          {mensajeError && (
            <div className="mb-4 pt-4">
              <p className="text-red-600 text-sm">{mensajeError}</p>
            </div>
          )}

        </div>

        <FooterMedico />

        {/* Contenido oculto para PDF */}
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} ref={targetRef}>
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