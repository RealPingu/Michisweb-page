import React, { useState } from "react";
import BackButton from "../../../components/ui/returnButton";
import { Button } from "../../../components/ui/button";
import { FooterFuncionarioStock } from "../../../components/ui/footer";


export const IngresarMedicamentos = () => {
  const [codigoBarras, setCodigoBarras] = useState("");
const [medicamento, setMedicamento] = useState<any>({
  nombre: "",
  principioActivo: "",
  dosis: "",
  via: "",
  cantidad: 0,
  fechaVencimiento: "",
  lote: "",
  codigoBarras: "",
});
  const [cantidadRecibida, setCantidadRecibida] = useState<number | "">("");
  const [cantidadDefectuosa, setCantidadDefectuosa] = useState<number | "">("");
  const [cantidadVencida, setCantidadVencida] = useState<number | "">("");
  const [cantidadMalEstado, setCantidadMalEstado] = useState<number | "">("");
  const [cantidadEnvaseRoto, setCantidadEnvaseRoto] = useState<number | "">("");
  const [isMedicamentoFound, setIsMedicamentoFound] = useState(false);
  const [isDefectuoso, setIsDefectuoso] = useState(false);  
  const [error, setError] = useState<string | null>(null);

  const handleCodigoBarrasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigoBarras(e.target.value);
  };

const handleBuscarMedicamento = async () => {
  const token = localStorage.getItem("token") || "";
  const hoy = new Date();
  const fechaVencimientoAuto = new Date(hoy.setMonth(hoy.getMonth() + 3))
  .toISOString()
  .split("T")[0]; // formato YYYY-MM-DD

  try {
    const res = await fetch(`http://localhost:8080/medicamentos/codigo_barras/${codigoBarras}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      setError("Medicamento no encontrado, por favor verifica el código de barras.");
      setIsMedicamentoFound(false);
      return;
    }

    const data = await res.json();

    setMedicamento({
      id: data.id_medicamento,
      nombre: data.nombre,
      principioActivo: data.principio_activo,
      dosis: data.dosis_concentracion,
      via: data.via_administracion,
      cantidad: 0, // esta parte no viene, así que puedes ignorarla o dejarla en 0
      fechaVencimiento: fechaVencimientoAuto, // eso se setea al ingresar
      lote: "",
      codigoBarras: codigoBarras, // lo que buscaste
    });

    setIsMedicamentoFound(true);
    setError("");
  } catch (error) {
    console.error("Error buscando medicamento:", error);
    setError("Error al buscar medicamento.");
    setIsMedicamentoFound(false);
  }
};
  const handleLoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicamento({ ...medicamento, lote: e.target.value });
  };

  const handleCantidadRecibidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantidadRecibida(Number(e.target.value));
  };

  const handleCantidadDefectuosaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantidadDefectuosa(Number(e.target.value));
  };

  const handleDefectuosoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefectuoso(e.target.checked);
    if (!e.target.checked) {
      setCantidadDefectuosa(0);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const cantidadRecibidaNum = typeof cantidadRecibida === "string" ? Number(cantidadRecibida) : cantidadRecibida;
  const defectuosa = typeof cantidadDefectuosa === "string" ? Number(cantidadDefectuosa) : cantidadDefectuosa;
  const vencida = typeof cantidadVencida === "string" ? Number(cantidadVencida) : cantidadVencida;
  const malEstado = typeof cantidadMalEstado === "string" ? Number(cantidadMalEstado) : cantidadMalEstado;
  const envaseRoto = typeof cantidadEnvaseRoto === "string" ? Number(cantidadEnvaseRoto) : cantidadEnvaseRoto;

  const totalDefectuosos = defectuosa + vencida + malEstado + envaseRoto;

  if (!isMedicamentoFound) return;
  if (totalDefectuosos > cantidadRecibidaNum) {
    setError("La cantidad defectuosa no puede ser mayor a la cantidad recibida.");
    return;
  }
  if (1 > cantidadRecibidaNum) {
    setError("Ingrese la cantidad recibida.");
    return;
  }

  const loteData = {
    codigo_barras: medicamento.codigoBarras,
    lote: medicamento.lote,
    fecha_vencimiento: new Date(medicamento.fechaVencimiento).toISOString(),
    cantidad: cantidadRecibidaNum,
    hay_defectuosos: isDefectuoso,
    cantidad_reservada: 0,
    cantidad_defectuosa: isDefectuoso ? defectuosa : 0,
    cantidad_en_idea: isDefectuoso ? vencida : 0,
    cantidad_en_estado: isDefectuoso ? malEstado : 0,
    cantidad_envase_roto: isDefectuoso ? envaseRoto : 0,
  };

  const token = localStorage.getItem("token") || "";
  try {
    const res = await fetch("http://localhost:8080/medicamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loteData),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Error al crear lote");
    }

    alert("Lote ingresado con éxito.");
    // Reset de los campos
    setIsMedicamentoFound(false);
    setCantidadRecibida(0);
    setCantidadDefectuosa(0);
    setCodigoBarras("");
    setCantidadVencida("");
    setCantidadMalEstado("");
    setCantidadEnvaseRoto("");
    setError("");
  } catch (err) {
    console.error("Error al crear lote:", err);
    setError("Hubo un problema al guardar el lote.");
  }
};

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">

        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
          <BackButton to="/funcionario/stock" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Ingreso de medicamento</h1>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="pt-36 pb-20 px-4 overflow-y-auto flex-1">
          <div className="px-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Escaneo del Código de Barras */}
              <div className="mb-6">
                <label htmlFor="codigoBarras" className="block text-sm font-medium text-gray-700">
                  Código de Barras
                </label>
                <input
                  type="text"
                  name="codigoBarras"
                  id="codigoBarras"
                  value={codigoBarras}
                  onChange={handleCodigoBarrasChange}
                  onKeyPress={(e) => e.key === "Enter" && handleBuscarMedicamento()}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="text-center mt-4">
                  <Button size="lg" className="w-full" onClick={handleBuscarMedicamento}>Buscar Medicamento</Button>
                </div>
              </div>

              {/* Mostrar Datos del Medicamento si se encuentra */}
              {isMedicamentoFound && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      value={medicamento.nombre}
                      readOnly
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Principio Activo</label>
                    <input
                      type="text"
                      value={medicamento.principioActivo}
                      readOnly
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dosis</label>
                    <input
                      type="text"
                      value={medicamento.dosis}
                      readOnly
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vía de Administración</label>
                    <input
                      type="text"
                      value={medicamento.via}
                      readOnly
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                    <input
                      type="text"
                      value={medicamento.fechaVencimiento}
                      readOnly
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Lote</label>
                    <input
                      type="text"
                      name="lote"
                      id="lote"
                      value={medicamento.lote}
                      onChange={handleLoteChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cantidad Recibida</label>
                    <input
                      type="number"
                      value={cantidadRecibida}
                      onChange={handleCantidadRecibidaChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={isDefectuoso}
                        onChange={handleDefectuosoChange}
                        className="mr-2"
                      />
                      Medicamentos defectuosos
                    </label>
                    {isDefectuoso && (
                      <div className="mt-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cantidad Defectuosa</label>
                          <input
                            type="number"
                            value={cantidadDefectuosa}
                            onChange={handleCantidadDefectuosaChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cantidad Vencida</label>
                          <input
                            type="number"
                            value={cantidadVencida}
                            onChange={(e) => setCantidadVencida(Number(e.target.value))}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cantidad en Mal Estado</label>
                          <input
                            type="number"
                            value={cantidadMalEstado}
                            onChange={(e) => setCantidadMalEstado(Number(e.target.value))}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cantidad con Envase Roto</label>
                          <input
                            type="number"
                            value={cantidadEnvaseRoto}
                            onChange={(e) => setCantidadEnvaseRoto(Number(e.target.value))}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-4">
                    <Button size="lg" className="w-full">Confirmar ingreso</Button>
                  </div>
                </div>
              )}
            </form>
            

          {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>


        <FooterFuncionarioStock></FooterFuncionarioStock>

      </div>
    </div>
  );
};
