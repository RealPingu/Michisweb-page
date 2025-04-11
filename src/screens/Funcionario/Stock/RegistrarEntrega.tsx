import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


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
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-4 bg-white shadow">
        <div className="flex items-center gap-4">
          <button onClick={handleGoBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Entrega de Medicamentos</h1>
        </div>
      </header>

      {/* Formulario */}
      <main className="flex-1 px-4 py-6 space-y-4">
        <div>
          <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
            RUT del paciente
          </label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Ej: 10"
            min={1}
          />
        </div>

        <button
          onClick={handleBuscar}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Buscar stock
        </button>

        {/* Error */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Resultado */}
        {resultado && (
          <div className="bg-white p-4 rounded-md shadow space-y-1">
            <h2 className="text-sm font-semibold text-gray-800">Resultado:</h2>
            <p className="text-sm text-gray-700">
              Medicamento disponible: <span className="font-medium">{resultado.nombre}</span>
            </p>
            <p className="text-sm text-gray-700">
              Lote: <span className="font-medium">{resultado.lote}</span>
            </p>
            <p className="text-sm text-gray-700">
              Fecha de vencimiento: <span className="font-medium">{resultado.vencimiento}</span>
            </p>

            {/* Confirmar entrega */}
            <button
              onClick={handleConfirmar}
              className="w-full bg-green-600 text-white py-2 mt-4 rounded-md hover:bg-green-700 transition"
            >
              Confirmar entrega
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
