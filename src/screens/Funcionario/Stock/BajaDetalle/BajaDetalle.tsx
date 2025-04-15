import { useState } from "react";
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { JSX } from "react";

interface RemovalReason {
  id: number;
  name: string;
  description: string;
}

export const BajaDetalle = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  // Replace with your actual data fetching logic
  const medication = {
    id: Number(id),
    name: "Paracetamol",
    description: "500mg - 20 comprimidos",
    stock: 150,
  };

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
    { id: 3, name: "Envase Roto", description: "Empaque o envase dañado" },
  ];

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prev) => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(1, newQuantity), medication.stock);
    });
  };

  const handleRemoval = () => {
    if (!selectedReason) return;
    // Implement your removal logic here
    alert(
      `Removed ${quantity} units of ${medication.name} due to: ${
        removalReasons.find((r) => r.id === selectedReason)?.name
      }`
    );
    navigate("/funcionario/stock/baja-medicamentos");
  };

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
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Eliminar del Inventario</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-32 px-4 pb-24">
          {/* Medication Info */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-[#1E1E1E]">
                {medication.name}
              </h2>
              <p className="text-sm text-[#757575]">{medication.description}</p>
              <p className="text-sm font-medium text-[#2C2C2C] mt-1">
                Stock actual: {medication.stock} unidades
              </p>
            </CardContent>
          </Card>

          {/* Quantity Selector */}
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
                    max={medication.stock}
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        setQuantity(
                          Math.max(1, Math.min(medication.stock, value))
                        );
                      }
                    }}
                    className="w-16 text-center text-xl font-semibold border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(true)}
                    disabled={quantity >= medication.stock}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

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
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#1E1E1E]">
                          {reason.name}
                        </h4>
                        <p className="text-sm text-[#757575] mt-1">
                          {reason.description}
                        </p>
                      </div>
                    </div>
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
              disabled={!selectedReason}
            >
              Confirmar eliminación
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
