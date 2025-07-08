import { useState, useEffect } from 'react';
import { Clock, ChevronRight, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import BackButton from '../../../components/ui/returnButton';
import { FooterFuncionarioPrescripciones } from '../../../components/ui/footer';

export const PrescripcionesPendientes = () => {
  interface Prescription {
    id: string;
    rut: string;
    timeAgo: string;
    medications: string[];
    status: 'pending' | 'delivered';
    entregadoPorNombre?: string;
    entregadoPorRUT?: string;
  }

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'delivered'>('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [rutInput, setRutInput] = useState('');
  const [errors, setErrors] = useState<{ nombre?: string; rut?: string }>({});

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('http://localhost:8080/receta', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al obtener recetas');

        const data = await response.json();

        const parsed: Prescription[] = data.map((r: any) => ({
          id: r.id_receta,
          rut: r.nombre_paciente,
          timeAgo: calcularTiempoDesde(r.fecha_emision),
          medications: r.principios?.map((p: any) => `${p.nombre} - ${p.duracion}, ${p.frecuencia}`) || [],
          status: r.estado === 'pendiente' ? 'pending' : 'delivered',
          entregadoPorNombre: r.entrega?.nombre_retiro ?? '',
          entregadoPorRUT: r.entrega?.rut_retiro ?? ''
        }));

        setPrescriptions(parsed);
      } catch (error) {
        console.error('Error al cargar recetas', error);
      }
    };

    fetchPrescriptions();
  }, [token]);

  const calcularTiempoDesde = (fechaEmision: string) => {
    const fechaUTC = fechaEmision.endsWith("Z") ? fechaEmision : `${fechaEmision}Z`;
    const fecha = new Date(fechaUTC).getTime();
    const ahora = new Date().getTime();
    let diffMin = Math.floor((ahora - fecha) / 60000);
    if (diffMin < 0) diffMin = 0;
    if (diffMin < 60) return `${diffMin} min`;
    const diffHoras = Math.floor(diffMin / 60);
    if (diffHoras < 24) return `${diffHoras} h`;
    const diffDias = Math.floor(diffHoras / 24);
    return `${diffDias} d`;
  };

  const openModal = (id: string) => {
    setSelectedPrescriptionId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNombre('');
    setRutInput('');
    setErrors({});
  };

  const handleDeliveryConfirmed = async () => {
    const newErrors: typeof errors = {};
    if (!nombre.trim()) newErrors.nombre = 'Este campo es obligatorio';
    if (!rutInput.trim()) newErrors.rut = 'Este campo es obligatorio';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/receta/entregar/${selectedPrescriptionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre,
            rut: rutInput,
            id_funcionario: localStorage.getItem('userId') // Asegúrate de tener esto guardado
          })
        }
      );
      if (!response.ok) {
        throw new Error('Error al marcar como entregada');
      }

      setPrescriptions(prev =>
        prev.map(p =>
          p.id === selectedPrescriptionId
            ? {
                ...p,
                status: 'delivered',
                entregadoPorNombre: nombre,
                entregadoPorRUT: rutInput
              }
            : p
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error al confirmar entrega", error);
    }
  };

  const filteredPrescriptions = prescriptions.filter(p => p.status === activeTab);

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen pb-16">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/funcionario/prescripciones" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Entrega prescripciones</h1>
            </div>

            <div className="flex space-x-4 justify-center">
              <Button
                variant={activeTab === 'pending' ? 'default' : 'outline'}
                onClick={() => setActiveTab('pending')}
              >
                Por entregar
              </Button>
              <Button
                variant={activeTab === 'delivered' ? 'default' : 'outline'}
                onClick={() => setActiveTab('delivered')}
              >
                Entregadas
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-36 pb-4 px-4">
          {filteredPrescriptions.length === 0 ? (
            <p className="text-gray-500 text-center">
              No hay prescripciones {activeTab === 'pending' ? 'pendientes' : 'entregadas'}.
            </p>
          ) : (
            <div className="space-y-4 mt-4">
              {filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-500">{prescription.timeAgo}</span>
                      </div>
                      <span className="text-gray-700 font-bold">{prescription.rut}</span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {prescription.medications.map((medication, index) => (
                        <div key={index} className="text-gray-600 text-sm pl-8">
                          - {medication}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      {prescription.status === 'pending' ? (
                        <Button
                          onClick={() => openModal(prescription.id)}
                          className="text-white"
                        >
                          Entregar
                        </Button>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Entregado a {prescription.entregadoPorNombre || 'N/A'} ({prescription.entregadoPorRUT || 'N/A'})
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Confirmar entrega</h2>
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Nombre de quien retira"
                    value={nombre}
                    onChange={e => {
                      setNombre(e.target.value);
                      if (errors.nombre) setErrors(prev => ({ ...prev, nombre: undefined }));
                    }}
                  />
                  {errors.nombre && (
                    <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="RUT de quien retira"
                    value={rutInput}
                    onChange={e => {
                      setRutInput(e.target.value);
                      if (errors.rut) setErrors(prev => ({ ...prev, rut: undefined }));
                    }}
                  />
                  {errors.rut && (
                    <p className="text-sm text-red-500 mt-1">{errors.rut}</p>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={handleDeliveryConfirmed}
                  disabled={!nombre.trim() || !rutInput.trim()}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterFuncionarioPrescripciones />
    </div>
  );
};
