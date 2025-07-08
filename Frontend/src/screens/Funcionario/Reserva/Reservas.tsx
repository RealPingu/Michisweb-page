import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import BackButton from '../../../components/ui/returnButton';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { FooterFuncionarioPrescripciones } from '../../../components/ui/footer';
import { useNavigate } from "react-router-dom";

interface MedicamentoReserva {
  id_medicamento: string;
  nombre_medicamento: string;
  dosis: string;
  cantidad: number;
}

interface Reservation {
  id: string;
  rut: string;
  nombre: string;
  fecha: string;
  status: 'pendiente' | 'confirmado';
  medicamentos: MedicamentoReserva[];
}

export const Reservas = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  // Función para calcular días transcurridos desde la fecha
  const daysAgo = (fechaISO: string): string => {
    const fecha = new Date(fechaISO);
    const ahora = new Date();
    const diff = Math.floor((ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return `${diff} día${diff !== 1 ? 's' : ''}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        const res = await fetch("http://localhost:8080/reservas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const formatted = data.map((r: any) => ({
          id: r.id_reserva,
          rut: r.rut_paciente,
          nombre: r.nombre_paciente,
          fecha: r.fecha,
          status: r.estado.toLowerCase(),
          medicamentos: r.medicamentos,
        }));

        setReservations(formatted);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async (id: string) => {
    const token = localStorage.getItem("token") || "";
    await fetch(`http://localhost:8080/reservas/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReservations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'confirmado' } : r
      )
    );
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen pb-16">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/funcionario/prescripciones" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Reservas</h1>
            </div>
          </div>
        </div>

        {/* Listado de reservas */}
        <div className="max-w-4xl mx-auto pt-32 px-4">
          {reservations
            .slice()
            .sort((a, b) => {
              if (a.status === 'pendiente' && b.status === 'confirmado') return -1;
              if (a.status === 'confirmado' && b.status === 'pendiente') return 1;
              return 0;
            })
            .map((r) => (
            <Card key={r.id} className={r.status === 'confirmado' ? 'opacity-50' : ''}>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{daysAgo(r.fecha)}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">RUT: {r.rut}</p>
                    <p className="text-xs text-muted-foreground">Nombre: {r.nombre}</p>
                  </div>
                </div>

                <div className="space-y-1 pl-6">
                  {r.medicamentos.map((med, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      • {med.nombre_medicamento} {med.dosis} {med.cantidad} comprimidos
                    </p>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2 justify-between">
                  {r.status === 'pendiente' ? (
                    <Button onClick={() => handleConfirm(r.id)}>Confirmar</Button>
                  ) : (
                    <span className="text-sm text-green-600 font-medium">✓ Confirmado</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            className="w-full mt-6"
            variant="default"
            onClick={() => navigate('/funcionario/prescripciones/reservas/reservar')}
          >
            Agregar Reserva
          </Button>
        </div>

        <FooterFuncionarioPrescripciones />
      </div>
    </div>
  );
};
