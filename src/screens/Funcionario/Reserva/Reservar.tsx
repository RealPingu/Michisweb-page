import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import BackButton from '../../../components/ui/returnButton';

interface MedicationField {
  id: number;
  medicamento: string;
  cantidad: string;
}

export const Reservar = () => {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [retiraEnFarmacia, setRetiraEnFarmacia] = useState(false);
  const [medicationFields, setMedicationFields] = useState<MedicationField[]>([
    { id: 1, medicamento: '', cantidad: '' }
  ]);

  const handleAddMedication = () => {
    const newField = {
      id: medicationFields.length + 1,
      medicamento: '',
      cantidad: ''
    };
    setMedicationFields([...medicationFields, newField]);
  };

  const handleMedicationChange = (id: number, field: 'medicamento' | 'cantidad', value: string) => {
    setMedicationFields(medicationFields.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      rut,
      nombre,
      retiraEnFarmacia,
      medicamentos: medicationFields
    });
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
          <BackButton to="/funcionario/prescripciones/reservas" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Reservar medicamentos</h1>
            </div>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="pt-36 px-4 pb-32">
          <div className="mb-6">
            <h5 className="text-lg font-medium">Datos del paciente</h5>
            <hr />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">RUT</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="12.345.678-9"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Horst Von Brand"
            />
          </div>

          <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              checked={retiraEnFarmacia}
              onChange={(e) => setRetiraEnFarmacia(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              id="retiraEnFarmacia"
            />
            <label htmlFor="retiraEnFarmacia" className="text-sm text-gray-700">
              Retira en farmacia normal
            </label>
          </div>

          <div className="mb-6">
            <h5 className="text-lg font-medium">Medicamentos</h5>
            <hr />
          </div>

          {medicationFields.map((field) => (
            <div key={field.id} className="border border-gray-300 p-4 rounded-md mb-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicamento</label>
                <input
                  type="text"
                  value={field.medicamento}
                  onChange={(e) => handleMedicationChange(field.id, 'medicamento', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Loratadina 10mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="text"
                  value={field.cantidad}
                  onChange={(e) => handleMedicationChange(field.id, 'cantidad', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="X"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-center mb-6">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddMedication}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center">
            <Button size="lg" type="submit">Registrar reserva</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
