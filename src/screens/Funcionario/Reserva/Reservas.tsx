import { useState } from 'react';
import { Clock, ChevronRight, Plus } from 'lucide-react';
import BackButton from '../../../components/ui/returnButton';

export const Reservas = () => {
    interface Reservation {
        id: number;
        rut: string;
        timeAgo: string;
        medications: string[];
        status: 'pending' | 'confirmed';
      }

      const [reservations, setReservations] = useState<Reservation[]>([
        {
          id: 1,
          rut: '12.345.678-9',
          timeAgo: '15 días',
          medications: [
            'Sertralina  30 comprimidos'
          ],
          status: 'pending'
        },
        {
          id: 2,
          rut: '9.876.543-2',
          timeAgo: '3 días',
          medications: [
            'Omeprazol 20 mg 30 comprimidos'
          ],
          status: 'pending'
        }
      ]);
    
      const handleConfirm = (id: number) => {
        setReservations(prevReservations =>
          prevReservations.map(reservation =>
            reservation.id === id
              ? { ...reservation, status: 'confirmed' }
              : reservation
          )
        );
      };
    
      const handleAddReservation = () => {
        window.location.href = '/funcionario/prescripciones/reservas/reservar';
      };
    
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <BackButton to="/funcionario"/>
                <h1 className="ml-4 text-xl font-semibold text-gray-900">
                  Reservas
                </h1>
              </div>
              <button
                onClick={handleAddReservation}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Agregar Reserva
              </button>
            </div>
          </header>
    
          {/* Main Content */}
          <main className="max-w-3xl mx-auto px-4 py-6">
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${
                    reservation.status === 'confirmed' ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-500">{reservation.timeAgo}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-700 font-medium block">RUT: {reservation.rut}</span>
                      <span className="text-gray-500 text-sm block">ID: {reservation.id}</span>
                    </div>
                  </div>
    
                  <div className="mt-4 space-y-2">
                    {reservation.medications.map((medication, index) => (
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
                    {reservation.status === 'pending' ? (
                      <button
                        onClick={() => handleConfirm(reservation.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Confirmar
                      </button>
                    ) : (
                      <span className="text-green-600 font-medium text-sm">
                        ✓ Confirmado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
                className="w-full bg-gray-900 text-white rounded-md py-3 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 mt-6"
              >
                Generar informe de reservas
              </button>
          </main>
        </div>
      );
}