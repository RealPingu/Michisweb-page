import { useState } from 'react';
import { Clock, ChevronRight, X } from 'lucide-react';
import BackButton from '../../../components/ui/returnButton';

export const Prescripciones = () => {
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <BackButton to="/" />
          <h1 className="ml-4 text-xl font-semibold text-gray-900">
            Entrega prescripciones
          </h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto px-4 pt-6 flex space-x-4">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
          }`}
        >
          Por entregar
        </button>
        <button
          onClick={() => setActiveTab('delivered')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'delivered' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
          }`}
        >
          Entregadas
        </button>
      </div>

      {/* Lista de prescripciones */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {filteredPrescriptions.length === 0 ? (
          <p className="text-gray-500 text-center">No hay prescripciones {activeTab === 'pending' ? 'pendientes' : 'entregadas'}.</p>
        ) : (
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
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
                    <button
                      onClick={() => openModal(prescription.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Entregar
                    </button>
                  ) : (
                    <div className="text-green-600 text-sm">
                      <div>✓ Entregado</div>
                      <div className="text-gray-600">
                        Por: {prescription.entregadoPorNombre} ({prescription.entregadoPorRUT})
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Confirmar entrega</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">RUT</label>
                <input
                  type="text"
                  value={rutInput}
                  onChange={(e) => setRutInput(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                />
              </div>
              <button
                onClick={handleDeliveryConfirmed}
                className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Entrega realizada
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
