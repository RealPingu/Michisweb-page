import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { usePDF } from "react-to-pdf";
import BackButton from "../../../../components/ui/returnButton";
import { FooterFuncionarioStock } from "../../../../components/ui/footer";
import InformePDF from "../../../../components/ui/informepdf";

interface LoteDetalle {
  lote: string;
  fecha_vencimiento: string;
  cantidad: number;
  cantidad_defectuosa: number;
  cantidad_en_idea: number;
  cantidad_en_estado: number;
  cantidad_envase_roto: number;
  nombre_medicamento: string;
  concentracion: string;
  via_administracion: string;
}

export const Informes = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { toPDF, targetRef } = usePDF({ filename: "informe-principio-activo.pdf", page: { format: "A4" } });

  const [titulo, setTitulo] = useState({ nombre: "", categoria: "" });
  const [lotesDetalle, setLotesDetalle] = useState<LoteDetalle[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const token = localStorage.getItem("token") || "";

      try {
        const res = await fetch(`http://localhost:8080/medicamentos/principios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTitulo({ nombre: data.nombre, categoria: data.categoria });

        const loteList: LoteDetalle[] = [];

        for (const med of data.medicamentos) {
          const resLotes = await fetch(
            `http://localhost:8080/medicamentos/${med.id_medicamento}/lotes`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const lotes = await resLotes.json();

          for (const lote of lotes) {
            loteList.push({
              lote: lote.lote,
              fecha_vencimiento: lote.fecha_vencimiento.split("T")[0],
              cantidad: lote.cantidad,
              cantidad_defectuosa: lote.cantidad_defectuosa,
              cantidad_en_idea: lote.cantidad_en_idea,
              cantidad_en_estado: lote.cantidad_en_estado,
              cantidad_envase_roto: lote.cantidad_envase_roto,
              nombre_medicamento: med.nombre,
              concentracion: med.dosis_concentracion,
              via_administracion: med.via_administracion,
            });
          }
        }

        setLotesDetalle(loteList);
      } catch (error) {
        console.error("Error cargando informe:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

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
            <h2 className="text-lg font-bold">{titulo.nombre}</h2>
            <p className="text-sm text-gray-600">{titulo.categoria}</p>
          </div>

          <div className="space-y-4">
            {lotesDetalle.map((lote, idx) => (
              <div key={idx} className="border border-gray-300 p-4 rounded-md space-y-1 text-sm">
                <p><strong>Medicamento:</strong> {lote.nombre_medicamento}</p>
                <p><strong>Concentración:</strong> {lote.concentracion}</p>
                <p><strong>Vía de administración:</strong> {lote.via_administracion}</p>
                <p><strong>Lote:</strong> {lote.lote}</p>
                <p><strong>Stock total:</strong> {lote.cantidad} unidades</p>
                <p><strong>Vencido:</strong> {lote.cantidad_en_estado}</p>
                <p><strong>Mal estado:</strong> {lote.cantidad_en_idea}</p>
                <p><strong>Envase roto:</strong> {lote.cantidad_envase_roto}</p>
                <p><strong>Fecha de vencimiento:</strong> {lote.fecha_vencimiento}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="w-full" onClick={() => toPDF()}>
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* PDF HIDDEN RENDER */}
        <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }} ref={targetRef}>
          <InformePDF ingrediente={{ name: titulo.nombre, description: titulo.categoria, lotes: lotesDetalle }} />
        </div>

        <FooterFuncionarioStock />
      </div>
    </div>
  );
};
