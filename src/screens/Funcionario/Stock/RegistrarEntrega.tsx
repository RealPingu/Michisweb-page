import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { FooterFuncionarioStock } from "../../../components/ui/footer";
import BackButton from "../../../components/ui/returnButton";


const buscarMedicamento = (rut: string, principio: string, cantidad: number) => {
  if (principio.toLowerCase() === "ibuprofeno") {
    return {
      nombre: "Ibuprofeno 400mg",
      lote: "L-000222",
      vencimiento: "15/08/2025",
      disponible: 80,
    };
  }
  // Si no se encuentra
  return null;
};

export const RegistrarEntrega = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [principio, setPrincipio] = useState("");
  const [cantidad, setCantidad] = useState<number | "">("");
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuscar = () => {
    setError(null);
    if (!rut || !principio || !cantidad) {
      setError("Por favor completa todos los campos.");
      setResultado(null);
      return;
    }

    const res = buscarMedicamento(rut, principio, Number(cantidad));

    if (res) {
      if (cantidad > res.disponible) {
        setError(`Solo hay ${res.disponible} unidades disponibles.`);
        setResultado(null);
      } else {
        setResultado(res);
      }
    } else {
      setError("No se encontró stock para ese principio activo.");
      setResultado(null);
    }
  };

  const handleConfirmar = () => {
    alert("Entrega confirmada");
    setResultado(null);
    setPrincipio("");
    setCantidad("");
    setRut("");
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">

        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
          <BackButton to="/funcionario/stock" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Entrega de medicamento</h1>
            </div>
          </div>
        </div>
        {/* Body */}<div className="pt-36 px-4 pb-20">
        <main className="flex-1 px-4 space-y-4">
          <div>
            <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
              RUT
            </label>
            <input
              type="text"
              id="rut"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 12.345.678-9"
            />
          </div>

          <div>
            <label htmlFor="principio" className="block text-sm font-medium text-gray-700">
              Principio activo
            </label>
            <input
              type="text"
              id="principio"
              value={principio}
              onChange={(e) => setPrincipio(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Paracetamol"
            />
          </div>

          <div>
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
              Cantidad a entregar
            </label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 10"
              min={1}
            />
          </div>

          <div className="text-center mt-4">
            <Button size="lg" className="w-full" onClick={handleBuscar}>
              Buscar stock
            </Button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {resultado && (
            <div className="bg-white p-4 rounded-md shadow space-y-1">
              <h2 className="text-lg font-medium text-gray-800">Resultado:</h2>
              <p className="text-sm text-gray-700">
                Medicamento disponible: <span className="font-medium">{resultado.nombre}</span>
              </p>
              <p className="text-sm text-gray-700">
                Lote: <span className="font-medium">{resultado.lote}</span>
              </p>
              <p className="text-sm text-gray-700">
                Fecha de vencimiento: <span className="font-medium">{resultado.vencimiento}</span>
              </p>

              <div className="text-center mt-4">
                <Button size="lg" className="w-full" onClick={handleConfirmar}>
                  Confirmar entrega
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      <FooterFuncionarioStock></FooterFuncionarioStock>
        
      </div>
    </div>
  );
};
