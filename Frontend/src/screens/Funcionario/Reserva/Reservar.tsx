import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import BackButton from "../../../components/ui/returnButton";

interface MedicationOption {
  id_medicamento: string;
  nombre: string;
  dosis_concentracion: string;
}

interface MedicationField {
  id: number;
  id_medicamento: string;
  cantidad: string;
}

interface FormErrors {
  rut?: string;
  medicamentos?: { id: number; id_medicamento?: string; cantidad?: string }[];
}

export const Reservar = () => {
  const navigate = useNavigate();
  const [rut, setRut] = useState('');
  const [pacienteId, setPacienteId] = useState<string | null>(null);
  const [medicationOptions, setMedicationOptions] = useState<MedicationOption[]>([]);
  const [medicationFields, setMedicationFields] = useState<MedicationField[]>([
    { id: 1, id_medicamento: '', cantidad: '' }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const token = localStorage.getItem("token") || "";

  // 🔎 Buscar paciente por RUT y luego obtener medicamentos válidos
  useEffect(() => {
    const fetchPacienteAndMedicamentos = async () => {
      if (!rut) return;
      try {
        const resPaciente = await fetch(`http://localhost:8080/pacientes/rut/${rut}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resPaciente.ok) throw new Error("Paciente no encontrado");
        const paciente = await resPaciente.json();
        setPacienteId(paciente.id_paciente);

        const resPrescripciones = await fetch(`http://localhost:8080/prescripcion/paciente/${paciente.id_paciente}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const prescripciones = await resPrescripciones.json();

        const principioIds = new Set(
          prescripciones.flatMap((p: any) =>
            p.principios.map((pr: any) => pr.id_principio)
          )
        );

        const medicamentos: MedicationOption[] = [];

        for (const id of principioIds) {
          const res = await fetch(`http://localhost:8080/medicamentos/principios/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          data.medicamentos.forEach((m: any) => {
            medicamentos.push({
              id_medicamento: m.id_medicamento,
              nombre: m.nombre,
              dosis_concentracion: m.dosis_concentracion,
            });
          });
        }

        setMedicationOptions(medicamentos);
      } catch (error) {
        console.error("Error al cargar paciente o medicamentos:", error);
        setPacienteId(null);
        setMedicationOptions([]);
      }
    };

    fetchPacienteAndMedicamentos();
  }, [rut]);

  const handleAddMedication = () => {
    setMedicationFields(prev => [
      ...prev,
      { id: prev.length + 1, id_medicamento: '', cantidad: '' }
    ]);
  };

  const handleRemoveMedication = (id: number) => {
    setMedicationFields(prev => prev.filter(m => m.id !== id));
  };

  const handleMedicationChange = (id: number, field: 'id_medicamento' | 'cantidad', value: string) => {
    setMedicationFields(prev =>
      prev.map(med => med.id === id ? { ...med, [field]: value } : med)
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!rut.trim()) newErrors.rut = "El RUT es obligatorio.";

    const medsErrors = medicationFields.map(m => {
      const err: { id: number; id_medicamento?: string; cantidad?: string } = { id: m.id };
      if (!m.id_medicamento) err.id_medicamento = "Seleccione un medicamento.";
      if (!m.cantidad.trim()) err.cantidad = "Ingrese una cantidad.";
      return err;
    });

    if (medsErrors.some(e => e.id_medicamento || e.cantidad)) {
      newErrors.medicamentos = medsErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!pacienteId) return;

    const cincoDiasAtras = new Date();
    cincoDiasAtras.setDate(cincoDiasAtras.getDate() - 1);
    const reservaData = {
      id_paciente: pacienteId,
      fecha: cincoDiasAtras.toISOString(),
      estado: "pendiente",
      medicamentos: medicationFields.map(m => ({
        id_medicamento: m.id_medicamento,
        cantidad: parseInt(m.cantidad, 10)
      })),
    };

    try {
      const res = await fetch("http://localhost:8080/reservas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservaData),
      });

      if (!res.ok) throw new Error("Error al crear la reserva");
      setModalOpen(true);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const closeModal = () => setModalOpen(false);
  const handleModalConfirm = () => {
    setModalOpen(false);
    navigate("/funcionario/prescripciones/reservas");
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/funcionario/prescripciones/reservas" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Reservar medicamentos</h1>
            </div>
          </div>
        </div>

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
              className={`w-full p-3 border rounded-md ${errors.rut ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="12.345.678-9"
            />
            {errors.rut && <p className="text-sm text-red-500 mt-1">{errors.rut}</p>}
          </div>

          <div className="mb-6">
            <h5 className="text-lg font-medium">Medicamentos</h5>
            <hr />
          </div>

          {medicationFields.map((field, index) => (
            <div key={field.id} className="border border-gray-300 p-4 rounded-md mb-4 space-y-4 relative">
              {index > 0 && (
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => handleRemoveMedication(field.id)}
                  className="absolute top-2 right-2"
                >
                  <Trash />
                </Button>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Medicamento</label>
                <select
                  value={field.id_medicamento}
                  onChange={(e) => handleMedicationChange(field.id, 'id_medicamento', e.target.value)}
                  className={`w-full p-3 border rounded-md ${errors.medicamentos?.[index]?.id_medicamento ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Seleccione un medicamento</option>
                  {medicationOptions.map((m) => (
                    <option key={m.id_medicamento} value={m.id_medicamento}>
                      {m.nombre} {m.dosis_concentracion}
                    </option>
                  ))}
                </select>
                {errors.medicamentos?.[index]?.id_medicamento && (
                  <p className="text-sm text-red-500 mt-1">{errors.medicamentos[index]?.id_medicamento}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="text"
                  value={field.cantidad}
                  onChange={(e) => handleMedicationChange(field.id, 'cantidad', e.target.value)}
                  className={`w-full p-3 border rounded-md ${errors.medicamentos?.[index]?.cantidad ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="X"
                />
                {errors.medicamentos?.[index]?.cantidad && (
                  <p className="text-sm text-red-500 mt-1">{errors.medicamentos[index]?.cantidad}</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-center mb-6">
            <Button type="button" variant="outline" size="icon" onClick={handleAddMedication}>
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center">
            <Button size="lg" type="submit">Registrar reserva</Button>
          </div>
        </form>

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
