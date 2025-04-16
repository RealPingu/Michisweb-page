import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import BackButton from "../../../components/ui/returnButton";

interface MedicationField {
  id: number;
  medicamento: string;
  cantidad: string;
}

interface FormErrors {
  rut?: string;
  nombre?: string;
  medicamentos?: { id: number; medicamento?: string; cantidad?: string }[];
}

export const Reservar = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [retiraEnFarmacia, setRetiraEnFarmacia] = useState(false);
  const [medicationFields, setMedicationFields] = useState<MedicationField[]>([
    { id: 1, medicamento: '', cantidad: '' }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!rut.trim()) newErrors.rut = "El RUT es obligatorio.";
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";

    const medicamentosErrors = medicationFields.map((med) => {
      const medError: { id: number; medicamento?: string; cantidad?: string } = { id: med.id };
      if (!med.medicamento.trim()) medError.medicamento = "Este campo es obligatorio.";
      if (!med.cantidad.trim()) medError.cantidad = "Este campo es obligatorio.";
      return medError;
    });

    if (medicamentosErrors.some(err => err.medicamento || err.cantidad)) {
      newErrors.medicamentos = medicamentosErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log({
      rut,
      nombre,
      retiraEnFarmacia,
      medicamentos: medicationFields
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    navigate("/funcionario/prescripciones/reservas");
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
              className={`w-full p-3 border rounded-md ${
                errors.rut ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="12.345.678-9"
            />
            {errors.rut && <p className="text-sm text-red-500 mt-1">{errors.rut}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={`w-full p-3 border rounded-md ${
                errors.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Horst Von Brand"
            />
            {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>}
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

          {medicationFields.map((field, index) => (
            <div key={field.id} className="border border-gray-300 p-4 rounded-md mb-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicamento</label>
                <input
                  type="text"
                  value={field.medicamento}
                  onChange={(e) => handleMedicationChange(field.id, 'medicamento', e.target.value)}
                  className={`w-full p-3 border rounded-md ${
                    errors.medicamentos?.[index]?.medicamento ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Loratadina 10mg"
                />
                {errors.medicamentos?.[index]?.medicamento && (
                  <p className="text-sm text-red-500 mt-1">{errors.medicamentos[index]?.medicamento}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="text"
                  value={field.cantidad}
                  onChange={(e) => handleMedicationChange(field.id, 'cantidad', e.target.value)}
                  className={`w-full p-3 border rounded-md ${
                    errors.medicamentos?.[index]?.cantidad ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="X"
                />
                {errors.medicamentos?.[index]?.cantidad && (
                  <p className="text-sm text-red-500 mt-1">{errors.medicamentos[index]?.cantidad}</p>
                )}
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

        {/* Modal de confirmación */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4 text-center">Reserva realizada</h2>
              <div className="space-y-4">
                <p className="text-center text-sm text-gray-700">La reserva de medicamentos fue registrada exitosamente.</p>
                <Button className="w-full" onClick={handleModalConfirm}>
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
