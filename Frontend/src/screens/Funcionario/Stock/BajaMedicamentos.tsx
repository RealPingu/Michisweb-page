import { useEffect, useState } from "react";
import {  SearchIcon } from "lucide-react";
import BackButton from "../../../components/ui/returnButton";
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
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        const res = await fetch("http://localhost:8080/medicamentos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const meds = await res.json();

        const medsWithStock: Medication[] = await Promise.all(
          meds.map(async (med: any) => {
            try {
              const loteRes = await fetch(
                `http://localhost:8080/medicamentos/${med.id_medicamento}/lotes`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!loteRes.ok) {
                console.warn(`Lotes no encontrados para medicamento: ${med.nombre}`);
                return null;
              }

              const lotes = await loteRes.json();
              
              const totalStock = lotes.reduce((acc: number, lote: any) => {                
                const usable =
                  Number(lote.cantidad) -
                  (Number(lote.cantidad_reservada) +
                    Number(lote.cantidad_defectuosa) +
                    Number(lote.cantidad_en_idea) +
                    Number(lote.cantidad_en_estado) +
                    Number(lote.cantidad_envase_roto));
                return acc + (usable > 0 ? usable : 0);
              }, 0);

              return {
                id: med.id_medicamento,
                name: med.nombre,
                description: `${med.dosis_concentracion || "s/dosis"} - ${med.via_administracion}`,
                stock: totalStock,
              };
            } catch (err) {
              console.error(`Error con medicamento ${med.nombre}`, err);
              return null;
            }
          })
        );

        const filteredMeds = medsWithStock.filter((m) => m !== null);
        setMedications(filteredMeds);
      } catch (err) {
        console.error("Error al cargar medicamentos:", err);
      }
    };

    fetchData();
  }, []);

  const filteredMeds = medications
    .filter(
      (med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, searchTerm ? undefined : 5); // Solo muestra 5 si no hay búsqueda

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/funcionario/stock" />

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
                      <p className="text-sm text-[#757575]">{med.description}</p>
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