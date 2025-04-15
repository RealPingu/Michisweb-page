import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { usePDF } from "react-to-pdf";
import InformePDF from "../../../../components/ui/informepdf";
import BackButton from "../../../../components/ui/returnButton";
import { FooterFuncionarioStock } from "../../../../components/ui/footer";

const mockIngredientes = [
  {
    id: 1,
    name: "Ácido Acetilsalicílico",
    description: "Antiinflamatorio no esteroideo (AINE)",
    medicamentos: [
      {
        nombre: "Aspirina",
        stock: 150,
        concentracion: "500 mg",
        laboratorio: "Bayer",
        vencimiento: "2026-03-15",
      },
      {
        nombre: "Bufferin",
        stock: 100,
        concentracion: "325 mg",
        laboratorio: "Lion Corp",
        vencimiento: "2025-10-10",
      },
      {
        nombre: "Ecotrin",
        stock: 200,
        concentracion: "81 mg",
        laboratorio: "Prestige Brands",
        vencimiento: "2026-01-05",
      },
    ],
  },
  {
    id: 2,
    name: "Omeprazol",
    description: "Inhibidor de la bomba de protones",
    medicamentos: [
      {
        nombre: "Losec",
        stock: 100,
        concentracion: "20 mg",
        laboratorio: "AstraZeneca",
        vencimiento: "2025-11-10",
      },
      {
        nombre: "Omeprazol MK",
        stock: 180,
        concentracion: "20 mg",
        laboratorio: "Tecnoquímicas",
        vencimiento: "2026-02-01",
      },
    ],
  },
  // Puedes continuar agregando los demás ingredientes si lo necesitas
];

export const Informes = () => {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "", 10);
  const ingrediente = mockIngredientes.find((i) => i.id === id);

  const { toPDF, targetRef } = usePDF({
    filename: "informe-principio-activo.pdf",
    page: { format: "A4" },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!ingrediente) {
    return <div className="p-4 text-center">Ingrediente no encontrado</div>;
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <div className="absolute top-4 left-0">
              <BackButton to="/funcionario/stock/emitir-informes" />
            </div>
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Informe</h1>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-36 px-4 pb-32 space-y-6">
          <div>
            <h2 className="text-lg font-bold">{ingrediente.name}</h2>
            <p className="text-sm text-gray-600">{ingrediente.description}</p>
          </div>
          <div className="space-y-4">
            {ingrediente.medicamentos.map((med, idx) => (
              <div
                key={idx}
                className="border border-gray-300 p-4 rounded-md space-y-1 text-sm"
              >
                <p>
                  <strong>Nombre:</strong> {med.nombre}
                </p>
                <p>
                  <strong>Stock:</strong> {med.stock} unidades
                </p>
                <p>
                  <strong>Concentración:</strong> {med.concentracion}
                </p>
                <p>
                  <strong>Laboratorio:</strong> {med.laboratorio}
                </p>
                <p>
                  <strong>Fecha de vencimiento:</strong> {med.vencimiento}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="w-full" onClick={() => toPDF()}>
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Contenido oculto para PDF */}
        <div
          style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
          ref={targetRef}
        >
          <InformePDF ingrediente={ingrediente} />
        </div>
        <FooterFuncionarioStock></FooterFuncionarioStock>
      </div>
    </div>
  );
};
