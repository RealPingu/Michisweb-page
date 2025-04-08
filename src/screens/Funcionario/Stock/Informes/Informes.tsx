//import { useRef } from "react";
import { ArrowLeftCircleIcon, FileDown } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { usePDF } from "react-to-pdf";
import { JSX } from "react";

interface Medication {
  id: number;
  name: string;
  description: string;
  stock: number;
  location: string;
  expirationDate: Date;
  laboratory: string;
  concentration: string;
}

interface ActiveIngredient {
  id: number;
  name: string;
  description: string;
  medications: Medication[];
}

export const Informes = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeIngredientId = searchParams.get("id");
  const { toPDF, targetRef } = usePDF({ filename: 'informe-medicamentos.pdf' });

  // Sample data - replace with your actual data fetching logic
  const activeIngredient: ActiveIngredient = {
    id: Number(activeIngredientId),
    name: "Ácido Acetilsalicílico",
    description: "Antiinflamatorio no esteroideo (AINE)",
    medications: [
      {
        id: 1,
        name: "Aspirina",
        description: "Comprimidos recubiertos",
        concentration: "100mg",
        laboratory: "Bayer",
        stock: 150,
        location: "Farmacia Central",
        expirationDate: new Date(2024, 11, 31),
      },
      {
        id: 2,
        name: "Cardioaspirina",
        description: "Comprimidos con cubierta entérica",
        concentration: "81mg",
        laboratory: "Bayer",
        stock: 200,
        location: "Farmacia Norte",
        expirationDate: new Date(2024, 8, 15),
      },
      {
        id: 3,
        name: "ASA Generic",
        description: "Comprimidos",
        concentration: "500mg",
        laboratory: "Laboratorio Genérico",
        stock: 100,
        location: "Farmacia Sur",
        expirationDate: new Date(2024, 10, 20),
      },
    ],
  };

  const totalStock = activeIngredient.medications.reduce((sum, med) => sum + med.stock, 0);

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <Button
              variant="ghost"
              className="absolute w-8 h-8 top-4 left-0 p-0"
              onClick={() => navigate("/funcionario/stock/emitir-informes")}
            >
              <ArrowLeftCircleIcon className="w-8 h-8" />
            </Button>
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Detalle de Medicamentos</h1>
              <p className="text-sm text-[#757575] mt-1">{activeIngredient.description}</p>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="pt-36 pb-24 px-4" ref={targetRef}>
          {/* Summary Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-[#1E1E1E]">{activeIngredient.name}</h2>
              <p className="text-sm text-[#757575]">{activeIngredient.description}</p>
              <Separator className="my-3" />
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#757575]">Stock total</p>
                <p className="text-lg font-semibold text-[#2C2C2C]">{totalStock} unidades</p>
              </div>
            </CardContent>
          </Card>

          {/* Medications List */}
          <div className="space-y-4">
            {activeIngredient.medications.map((med) => (
              <Card key={med.id}>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold text-[#1E1E1E]">{med.name}</h3>
                  <p className="text-sm text-[#757575]">{med.description}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <p className="text-sm text-[#757575]">Concentración:</p>
                      <p className="text-sm font-medium text-[#2C2C2C]">{med.concentration}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-[#757575]">Laboratorio:</p>
                      <p className="text-sm font-medium text-[#2C2C2C]">{med.laboratory}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-[#757575]">Stock:</p>
                      <p className="text-sm font-medium text-[#2C2C2C]">{med.stock} unidades</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-[#757575]">Ubicación:</p>
                      <p className="text-sm font-medium text-[#2C2C2C]">{med.location}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-[#757575]">Vencimiento:</p>
                      <p className="text-sm font-medium text-[#2C2C2C]">
                        {format(med.expirationDate, "dd 'de' MMMM, yyyy", { locale: es })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-md mx-auto">
            <Button
              className="w-full h-[46px] bg-[#2c2c2c] text-white flex items-center justify-center gap-2"
              onClick={() => toPDF()}
            >
              <FileDown className="w-5 h-5" />
              Exportar a PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
