import { ArrowLeftCircleIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { JSX } from "react";

export const IngresarPrescripcion = (): JSX.Element => {
  const navigate = useNavigate();
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
              <h1 className="text-xl font-semibold">Ingresar prescripción</h1>
            </div>
            
          </div>
        </div>

        {/* Body */}
        <div className="pt-36 px-4">
            <div className="mb-6">
                <h5 className="text-lg font-medium">Datos del paciente</h5>
                <hr />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa nombre"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">RUT</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese RUT"
                />
            </div>
            <div className="mb-6">
                <h5 className="text-lg font-medium">Prescripción</h5>
                <hr />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Medicamento</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese medicamento"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Duración</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese duración"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Frecuencia</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese frecuencia"
                />
            </div>
            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300" />
                <Button variant="secondary" size="icon" className="mx-4">
                    <Plus />
                </Button>
                <div className="flex-grow border-t border-gray-300" />
            </div>
            <div className="text-center mt-4">
                <Button size="lg">Guardar prescripción</Button>
            </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t text-center text-sm text-gray-500 py-2 flex justify-around">
            <div>Stock</div>
            <div>Prescripciones</div>
            <div>Recetas</div>
        </div>
      </div>
    </div>
  );
};