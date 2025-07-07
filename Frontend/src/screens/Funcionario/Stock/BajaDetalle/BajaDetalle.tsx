import { JSX } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import BackButton from "../../../../components/ui/returnButton";

interface RemovalReason {
  id: number;
  name: string;
  description: string;
}

interface Lote {
  id_lote: string;
  lote: string;
  fecha_vencimiento: string;
  usableStock: number;
}

interface Medication {
  id: string;
  name: string;
  description: string;
}

export const BajaDetalle = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [medication, setMedication] = useState<Medication | null>(null);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [selectedLote, setSelectedLote] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  const removalReasons: RemovalReason[] = [
    {
      id: 1,
      name: "Vencido",
      description: "Medicamento fuera de fecha de vencimiento",
    },
    {
      id: 2,
      name: "Mal estado",
      description: "Medicamento en condiciones inadecuadas",
    },
    {
      id: 3,
      name: "Envase Roto",
      description: "Empaque o envase dañado",
    },
  ];

  useEffect(() => {
    const fetchMedicationAndLotes = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        const res = await fetch("http://localhost:8080/medicamentos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const meds = await res.json();
        const med = meds.find((m: any) => m.id_medicamento === id);
        if (!med) return;

        setMedication({
          id: med.id_medicamento,
          name: med.nombre,
          description: `${med.dosis_concentracion || "s/dosis"} - ${med.via_administracion}`,
        });

        const loteRes = await fetch(`http://localhost:8080/medicamentos/${id}/lotes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rawLotes = await loteRes.json();
        const lotesWithStock = rawLotes.map((lote: any) => {
          const usable =
            lote.cantidad -
            (lote.cantidad_reservada || 0) -
            (lote.cantidad_defectuosa || 0) -
            (lote.cantidad_en_idea || 0) -
            (lote.cantidad_en_estado || 0) -
            (lote.cantidad_envase_roto || 0);
          return {
            ...lote,
            usableStock: usable > 0 ? usable : 0,
          };
        });

        setLotes(lotesWithStock);
      } catch (err) {
        console.error("Error al cargar medicamento o lotes:", err);
      }
    };

    fetchMedicationAndLotes();
  }, [id]);

  const handleQuantityChange = (increment: boolean) => {
    const loteStock = lotes.find((l) => l.lote === selectedLote)?.usableStock || 1;
    setQuantity((prev) => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(1, newQuantity), loteStock);
    });
  };

  const handleRemoval = async () => {
    if (!selectedReason || !selectedLote) return;

    const token = localStorage.getItem("token") || "";
    const reasonMap: Record<number, string> = {
      1: "vencido",
      2: "mal_estado",
      3: "envase_roto",
    };

    try {
      const res = await fetch(`http://localhost:8080/medicamentos/lotes//${encodeURIComponent(selectedLote)}/reportar_defecto`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: reasonMap[selectedReason],
          cantidad: quantity,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Error al eliminar: " + errorData.detail);
        return;
      }

      alert("Eliminación registrada exitosamente");
      navigate("/funcionario/stock/baja-medicamentos");
    } catch (err) {
      console.error(err);
      alert("Error inesperado al eliminar");
    }
  };

  const loteStock = lotes.find((l) => l.lote === selectedLote)?.usableStock || 1;

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <Button
              variant="ghost"
              className="absolute w-8 h-8 top-4 left-0 p-0"
              onClick={() => navigate("/funcionario/stock/baja-medicamentos")}
            >
              <ArrowLeftCircleIcon className="w-8 h-8" />
            </Button>
            <BackButton to="/funcionario/stock/baja-medicamentos" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Eliminar del Inventario</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-32 px-4 pb-24">
          {medication && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-[#1E1E1E]">
                  {medication.name}
                </h2>
                <p className="text-sm text-[#757575]">{medication.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Lotes */}
          <h3 className="text-base font-medium mb-3">Selecciona un lote</h3>
          <div className="space-y-3 mb-6">
            {lotes.map((lote) => (
              <Card
                key={lote.lote}
                className={`cursor-pointer transition-all ${
                  selectedLote === lote.lote
                    ? "border-[#2c2c2c] bg-neutral-50"
                    : "border-[#d9d9d9] hover:border-neutral-400"
                }`}
                onClick={() => {
                  setSelectedLote(lote.lote);
                  setQuantity(1);
                }}
              >
                <CardContent className="p-4">
                  <h4 className="font-semibold">{lote.lote}</h4>
                  <p className="text-sm text-[#757575]">
                    Vence: {new Date(lote.fecha_vencimiento).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Stock disponible: {lote.usableStock} unidades
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quantity Selector */}
          {selectedLote && (
            <div className="mb-6">
              <h3 className="text-base font-medium mb-3">Cantidad a eliminar</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(false)}
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                    <input
                      type="number"
                      min={1}
                      max={loteStock}
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value)) {
                          setQuantity(Math.max(1, Math.min(loteStock, value)));
                        }
                      }}
                      className="w-16 text-center text-xl font-semibold border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(true)}
                      disabled={quantity >= loteStock}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Removal Reasons */}
          <div>
            <h3 className="text-base font-medium mb-3">Razón de eliminación</h3>
            <div className="space-y-3">
              {removalReasons.map((reason) => (
                <Card
                  key={reason.id}
                  className={`cursor-pointer transition-all ${
                    selectedReason === reason.id
                      ? "border-[#2c2c2c] bg-neutral-50"
                      : "border-[#d9d9d9] hover:border-neutral-400"
                  }`}
                  onClick={() => setSelectedReason(reason.id)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium text-[#1E1E1E]">{reason.name}</h4>
                    <p className="text-sm text-[#757575] mt-1">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-md mx-auto">
            <Button
              size="lg"
              className="w-full"
              onClick={handleRemoval}
              disabled={!selectedLote || !selectedReason}
            >
              Confirmar eliminación
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
