import { useState } from 'react';
import { Clock, ChevronRight, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import BackButton from '../../../components/ui/returnButton';

export const PrescripcionesPendientes = () => {
  interface Prescription {
    id: number;
    rut: string;
    timeAgo: string;
    medications: string[];
    status: 'pending' | 'delivered';
    entregadoPorNombre?: string;
    entregadoPorRUT?: string;
  }

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      rut: '12.345.678-9',
      timeAgo: '6 min',
      medications: [
        'Amoxicilina 500 mg 3 días cada 8 horas',
        'Loratadina 10 mg 7 días cada 1 día'
      ],
      status: 'pending'
    },
    {
      id: 2,
      rut: '9.876.543-2',
      timeAgo: '23 min',
      medications: [
        'Sertralina 100 mg permanente cada 1 día',
        'Escopolamina 3 mg permanente cada 1 día'
      ],
      status: 'pending'
    },
    {
      id: 3,
      rut: '20.123.456-K',
      timeAgo: '48 min',
      medications: [
        'Metformina 1000 mg permanente cada 1 día'
      ],
      status: 'delivered',
      entregadoPorNombre: 'Carlos Pérez',
      entregadoPorRUT: '11.111.111-1'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'pending' | 'delivered'>('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [rutInput, setRutInput] = useState('');

  const openModal = (id: number) => {
    setSelectedPrescriptionId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNombre('');
    setRutInput('');
  };

  const handleDeliveryConfirmed = () => {
    if (!nombre || !rutInput) {
      alert('Por favor, completa todos los campos');
      return;
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
  };

  const filteredPrescriptions = prescriptions.filter(p => p.status === activeTab);

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">

        {/* Encabezado */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/funcionario/prescripciones" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Entrega prescripciones</h1>
            </div>

            {/* Pestañas */}
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

        {/* Lista de prescripciones */}
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
                      <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700">
                        Detalles
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>

                      {prescription.status === 'pending' ? (
                        <Button
                          onClick={() => openModal(prescription.id)}
                          className="text-white"
                        >
                          Entregar
                        </Button>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Entregado a {prescription.entregadoPorNombre} ({prescription.entregadoPorRUT})
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Modal de confirmación */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Confirmar entrega</h2>
              <div className="space-y-3">
                <Input
                  placeholder="Nombre de quien retira"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <Input
                  placeholder="RUT de quien retira"
                  value={rutInput}
                  onChange={e => setRutInput(e.target.value)}
                />
                <Button className="w-full" onClick={handleDeliveryConfirmed}>
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
