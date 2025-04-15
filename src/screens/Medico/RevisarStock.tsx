import { useState } from "react";
import { ArrowLeftCircleIcon, SearchIcon, MicIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import { FooterMedico } from "../../components/ui/footer";

interface ActiveIngredient {
  id: number;
  name: string;
  description: string;
  medicationCount: number;
  totalStock: number;
}

export const RevisarStock = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const activeIngredients: ActiveIngredient[] = [
    { 
      id: 1, 
      name: "Ácido Acetilsalicílico", 
      description: "Antiinflamatorio no esteroideo (AINE)",
      medicationCount: 3,
      totalStock: 450
    },
    { 
      id: 2, 
      name: "Omeprazol", 
      description: "Inhibidor de la bomba de protones",
      medicationCount: 2,
      totalStock: 280
    },
    { 
      id: 3, 
      name: "Metformina", 
      description: "Antidiabético oral",
      medicationCount: 4,
      totalStock: 600
    },
    { 
      id: 4, 
      name: "Amoxicilina", 
      description: "Antibiótico betalactámico",
      medicationCount: 3,
      totalStock: 320
    },
  ];
  const filteredIngredients = activeIngredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.description.toLowerCase().includes(searchTerm.toLowerCase())
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
              onClick={() => navigate("/medico")}
            >
              <ArrowLeftCircleIcon className="w-8 h-8" />
            </Button>
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Revisar stock</h1>
            </div>
            
            {/* Search bar */}
            <div className="flex items-center gap-1 bg-m3syslightsurface-container-high rounded-[28px] p-1">
              <div className="flex w-10 h-10 items-center justify-center">
                <SearchIcon className="w-5 h-5" />
              </div>
              <Input
                className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Buscar principio activo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex w-10 h-10 items-center justify-center">
                <MicIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Ingredients List */}
        <div className="pt-44 pb-4 px-4">
          <div className="space-y-4">
            {filteredIngredients.map((ingredient) => (
              <Card 
                key={ingredient.id}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#1E1E1E]">{ingredient.name}</h2>
                      <p className="text-sm text-[#757575]">{ingredient.description}</p>
                      <div className="flex gap-4 mt-2">
                        <p className="text-sm font-medium text-[#2C2C2C]">
                          {ingredient.medicationCount} medicamentos
                        </p>
                        <p className="text-sm font-medium text-[#2C2C2C]">
                          Stock total: {ingredient.totalStock} unidades
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <FooterMedico></FooterMedico>

      </div>
    </div>
  );
};