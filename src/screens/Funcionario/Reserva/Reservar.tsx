import { useState } from 'react';
import { Plus } from 'lucide-react';
import BackButton from "../../../components/ui/returnButton";

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
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <BackButton to="/funcionario/reservas" />
              <h1 className="text-xl font-semibold text-center flex-1">Reserva medicamentos</h1>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-sm font-medium text-gray-700 mb-4">Reserva</div>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
                  <input
                    type="text"
                    id="rut"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2"
                    placeholder="12.345.678-9"
                  />
                </div>
    
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2"
                    placeholder="Horst Von Brand"
                  />
                </div>
    
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="retiraEnFarmacia"
                    checked={retiraEnFarmacia}
                    onChange={(e) => setRetiraEnFarmacia(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="retiraEnFarmacia" className="ml-2 block text-sm text-gray-700">
                    Retira en farmacia normal
                  </label>
                </div>
              </div>
    
              <div className="space-y-4 mt-6">
                {medicationFields.map((field) => (
                  <div key={field.id} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Medicamento</label>
                      <input
                        type="text"
                        value={field.medicamento}
                        onChange={(e) => handleMedicationChange(field.id, 'medicamento', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2"
                        placeholder="Loratadina 10mg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                      <input
                        type="text"
                        value={field.cantidad}
                        onChange={(e) => handleMedicationChange(field.id, 'cantidad', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2"
                        placeholder="X"
                      />
                    </div>
                  </div>
                ))}
              </div>
    
              <div className='flex flex-col items-center'>
              <button
                type="button"
                onClick={handleAddMedication}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Plus className="w-5 h-5" />
              </button>
              </div>
    
              <button
                type="submit"
                className="w-full bg-gray-900 text-white rounded-md py-3 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 mt-6"
              >
                Registrar reserva
              </button>
            </form>
          </div>
        </div>
      );

}