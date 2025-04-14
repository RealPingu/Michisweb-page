import { useState } from 'react';
import { Clock, ChevronRight, Plus } from 'lucide-react';
import BackButton from '../../../components/ui/returnButton';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

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
      medications: ['Sertralina  30 comprimidos'],
      status: 'pending',
    },
    {
      id: 2,
      rut: '9.876.543-2',
      timeAgo: '3 días',
      medications: ['Omeprazol 20 mg 30 comprimidos'],
      status: 'pending',
    },
  ]);

  const handleConfirm = (id: number) => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'confirmed' } : r
      )
    );
  };

  const handleAddReservation = () => {
    window.location.href = '/funcionario/prescripciones/reservas/reservar';
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
    <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">

        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/funcionario/prescripciones" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Reservas</h1>
            </div>
          </div>
        </div>

      {/* Listado de reservas */}
      <div className="max-w-4xl mx-auto pt-44">
        {reservations.map((r) => (
          <Card key={r.id} className={r.status === 'confirmed' ? 'opacity-50' : ''}>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{r.timeAgo}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">RUT: {r.rut}</p>
                  <p className="text-xs text-muted-foreground">ID: {r.id}</p>
                </div>
              </div>

              <div className="space-y-1 pl-6">
                {r.medications.map((med, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">• {med}</p>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="link" className="text-sm px-0 h-auto">
                  Detalles <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                {r.status === 'pending' ? (
                  <Button onClick={() => handleConfirm(r.id)} size="sm">
                    Confirmar
                  </Button>
                ) : (
                  <span className="text-sm text-green-600 font-medium">✓ Confirmado</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        <Button className="w-full mt-6" variant="default" onClick={handleAddReservation}>
          Agregar Reserva
        </Button>
        <Button className="w-full mt-6" variant="default">
          Generar informe de reservas
        </Button>
      </div>
    </div>
    </div>
  );
};
