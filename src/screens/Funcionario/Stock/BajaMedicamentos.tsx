import { useState } from "react";
import { ArrowLeftCircleIcon, SearchIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import { FooterFuncionarioStock } from "../../../components/ui/footer";

interface Medication {
  id: number;
  name: string;
  description: string;
  stock: number;
}

export const BajaMedicamentos = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample medication data - replace with your actual data source
  const medications: Medication[] = [
    {
      id: 1,
      name: "Paracetamol",
      description: "500mg - 20 comprimidos",
      stock: 150,
    },
    {
      id: 2,
      name: "Ibuprofeno",
      description: "400mg - 30 comprimidos",
      stock: 200,
    },
    {
      id: 3,
      name: "Aspirina",
      description: "100mg - 40 comprimidos",
      stock: 175,
    },
  ];

  const filteredMeds = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <Button
              variant="ghost"
              className="absolute w-8 h-8 top-4 left-0 p-0"
              onClick={() => navigate("/funcionario/stock")}
            >
              <ArrowLeftCircleIcon className="w-8 h-8" />
            </Button>
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Baja de Medicamentos</h1>
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-1 bg-m3syslightsurface-container-high rounded-[28px] p-1">
              <div className="flex w-10 h-10 items-center justify-center">
                <SearchIcon className="w-5 h-5" />
              </div>
              <Input
                className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Buscar medicamento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Medication List */}
        <div className="pt-44 pb-4 px-4">
          <div className="space-y-4">
            {filteredMeds.map((med) => (
              <Card
                key={med.id}
                className="w-full cursor-pointer hover:shadow-md transition-shadow"
                onClick={() =>
                  navigate(`/funcionario/stock/baja-medicamentos/${med.id}`)
                }
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-[#1E1E1E]">
                        {med.name}
                      </h2>
                      <p className="text-sm text-[#757575]">
                        {med.description}
                      </p>
                      <p className="text-sm font-medium text-[#2C2C2C] mt-1">
                        Stock: {med.stock} unidades
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <FooterFuncionarioStock></FooterFuncionarioStock>
      </div>
    </div>
  );
};
