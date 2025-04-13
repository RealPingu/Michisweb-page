import { ArrowLeftCircleIcon, Package, FileText, ClipboardList } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { JSX, useState } from "react";

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
      { nombre: "Paracetamol", duracion: "5 días", frecuencia: "Cada 8h" },
      { nombre: "Amoxicilina", duracion: "7 días", frecuencia: "Cada 12h" },
    ],
  },
  {
    id: "Prescripción Ibuprofeno",
    medicamentos: [{ nombre: "Ibuprofeno", duracion: "3 días", frecuencia: "Cada 6h" }],
  },
  {
    id: "Prescripción Vitamina C",
    medicamentos: [{ nombre: "Vitamina C", duracion: "10 días", frecuencia: "1 vez al día" }],
  },
];

export const EmitirRecetas = (): JSX.Element => {
  const navigate = useNavigate();
  const [prescripcionSeleccionada, setPrescripcionSeleccionada] = useState<Prescripcion | null>(null);
  const [advertencia, setAdvertencia] = useState<string>("");
  const handleSeleccionPrescripcion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSeleccionado = e.target.value;
    const seleccionada = prescripcionesMock.find(p => p.id === idSeleccionado) || null;
    setPrescripcionSeleccionada(seleccionada);
    setAdvertencia("");
  };
  const handleEmitirReceta = () => {
    if (!prescripcionSeleccionada) {
      setAdvertencia("Selecciona una prescripción antes de emitir la receta.");
    }
    else {
      alert("Receta emitida correctamente.") //Falta verificar que se pongan datos
    }
  };
  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">

        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <Button
              variant="ghost"
              className="absolute w-8 h-8 top-4 left-0 p-0"
              onClick={() => navigate("/medico")}
            >
              <ArrowLeftCircleIcon className="w-8 h-8" />
            </Button>
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
              placeholder="Ingresa nombre"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">RUT</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Ingrese RUT"
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
          {advertencia && (
            <div className="mt-4 text-red-500 text-sm">
              {advertencia}
            </div>
          )}
          <div className="text-center mt-6">
            <Button size="lg" onClick={handleEmitirReceta}>Emitir receta</Button>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-100 border-t text-center text-sm text-gray-500 py-2 flex justify-around">
          <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/medico/revisar-stock")}>
            <Package className="w-5 h-5" />
            <span>Stock</span>
          </div>
          <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/medico/ingresar-prescripcion")}>
            <ClipboardList className="w-5 h-5" />
            <span>Prescripciones</span>
          </div>
          <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/medico/emitir-recetas")}>
            <FileText className="w-5 h-5" />
            <span>Recetas</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};
