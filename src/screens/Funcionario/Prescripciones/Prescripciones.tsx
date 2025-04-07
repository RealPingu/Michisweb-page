import {useState} from 'react';
import { Clock, ChevronRight, ArrowLeftCircleIcon } from 'lucide-react';
import BackButton from '../../../components/ui/returnButton';

export const Prescripciones = () => {

  interface Prescription {
      id: number;
      rut: string;
      timeAgo: string;
      medications: string[];
      status: 'pending' | 'delivered';
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
      status: 'pending'
    }
  ]);

  const handleDelivered = (id: number) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(prescription =>
        prescription.id === id
          ? { ...prescription, status: 'delivered' }
          : prescription
      )
    );
  };


    return (
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <BackButton to="/" />
          <h1 className="ml-4 text-xl font-semibold text-gray-900">
            Entrega prescripciones pendientes
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.rut}
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

              <div className="mt-4 flex items-center justify-between">
                <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700">
                  Detalles
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
                {prescription.status === 'pending' ? (
                  <button
                    onClick={() => handleDelivered(prescription.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Entregado
                  </button>
                ) : (
                  <span className="text-green-600 font-medium text-sm">
                    ✓ Entregado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    );
  };