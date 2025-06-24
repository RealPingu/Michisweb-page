import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { JSX } from "react";
import { FooterMedico } from "../../components/ui/footer";
import BackButton from "../../components/ui/returnButton";

interface Medicamento {
  id_medicamento: string;
  nombre: string;
  dosis_concentracion: string;
  via_administracion: string;
  cantidad_total: number;
}

interface PrincipioActivo {
  id_principio: string;
  nombre: string;
  categoria: string;
}

interface PrincipioActivoDetalle extends PrincipioActivo {
  cantidad_total_medicamentos: number;
  medicamentos_diferentes: number;
  medicamentos: Medicamento[];
}

export const RevisarStock = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [principios, setPrincipios] = useState<PrincipioActivo[]>([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState<
    PrincipioActivoDetalle | null
  >(null);
  const [loadingPrincipios, setLoadingPrincipios] = useState(false);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchPrincipios = async () => {
      setLoadingPrincipios(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/medicamentos/principios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al cargar principios activos");
        const data = await res.json();
        setPrincipios(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoadingPrincipios(false);
      }
    };
    fetchPrincipios();
  }, [token]);

  const handleToggleDetalle = async (id: string) => {
    if (openId === id) {
      // Cierra dropdown si ya estaba abierto
      setOpenId(null);
      setDetalleSeleccionado(null);
      return;
    }
    if (!token) return;
    setLoadingDetalle(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8080/medicamentos/principios/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Error al cargar detalle del principio");
      const data = await res.json();
      setDetalleSeleccionado(data);
      setOpenId(id);
    } catch (e: any) {
      setError(e.message);
      setOpenId(null);
      setDetalleSeleccionado(null);
    } finally {
      setLoadingDetalle(false);
    }
  };

  const filteredPrincipios = principios.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white flex-1 pb-16">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/medico" />

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
            </div>
          </div>
        </div>

        {/* Lista de principios con dropdown */}
        <div className="pt-44 pb-4 px-4 overflow-y-auto flex-1 space-y-2">
          {loadingPrincipios && <p>Cargando principios activos...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {filteredPrincipios.map((principio) => {
            const isOpen = openId === principio.id_principio;
            return (
              <Card key={principio.id_principio}>
                <CardContent className="p-4 cursor-pointer" onClick={() => handleToggleDetalle(principio.id_principio)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-[#1E1E1E]">{principio.nombre}</h2>
                      <p className="text-sm text-[#757575]">{principio.categoria}</p>
                    </div>
                    <div>{isOpen ? "▲" : "▼"}</div>
                  </div>
                </CardContent>

                {isOpen && detalleSeleccionado && (
                  <div className="bg-gray-50 border-t p-4 space-y-2 max-h-72 overflow-y-auto">
                    <p className="text-sm font-medium text-[#2C2C2C] mb-4">
                      Stock total: {detalleSeleccionado.cantidad_total_medicamentos} unidades
                    </p>
                    <p className="text-lg font-bold text-[#111111] mb-3 border-b border-gray-400 pb-1">
                      Medicamentos
                    </p>
                    {loadingDetalle && <p>Cargando detalle...</p>}
                    {!loadingDetalle && detalleSeleccionado.medicamentos.length === 0 && (
                      <p>No hay medicamentos para este principio activo.</p>
                    )}
                    {!loadingDetalle && detalleSeleccionado.medicamentos.map((med) => (
                      <Card key={med.id_medicamento} className="mb-2">
                        <CardContent className="p-2">
                          <h3 className="font-medium">{med.nombre}</h3>
                          <p className="text-sm text-gray-600">
                            {med.dosis_concentracion} - {med.via_administracion}
                          </p>
                          <p className="text-sm font-semibold">
                            Stock: {med.cantidad_total} unidades
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <FooterMedico />
      </div>
    </div>
  );
};
