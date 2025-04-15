import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { FooterFuncionarioStock } from "../../../components/ui/footer";


const medicamentosDB = [
  {
    codigoBarras: "123456789",
    nombre: "Paracetamol",
    principioActivo: "Ácido acetilsalicílico",
    dosis: "500 mg",
    via: "Oral",
    cantidad: 450,
    fechaVencimiento: "2025-12-31",
  },
  {
    codigoBarras: "987654321",
    nombre: "Eutirox",
    principioActivo: "Levotiroxina sódica",
    dosis: "100 mg",
    via: "Oral",
    cantidad: 120,
    fechaVencimiento: "2024-06-30",
  },
  {
    codigoBarras: "555555555",
    nombre: "Loratadina",
    principioActivo: "Loratadina",
    dosis: "10 mg",
    via: "Oral",
    cantidad: 200,
    fechaVencimiento: "2026-05-20",
  },
];

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
  });
  const [cantidadRecibida, setCantidadRecibida] = useState<number | "">(0);
  const [cantidadDefectuosa, setCantidadDefectuosa] = useState<number>(0);
  const [isMedicamentoFound, setIsMedicamentoFound] = useState(false);
  const [isDefectuoso, setIsDefectuoso] = useState(false);

  const navigate = useNavigate();

  const handleCodigoBarrasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigoBarras(e.target.value);
  };

  const handleBuscarMedicamento = () => {
    const encontrado = medicamentosDB.find(
      (med) => med.codigoBarras === codigoBarras
    );

    if (encontrado) {
      setMedicamento({
        nombre: encontrado.nombre,
        principioActivo: encontrado.principioActivo,
        dosis: encontrado.dosis,
        via: encontrado.via,
        cantidad: encontrado.cantidad,
        fechaVencimiento: encontrado.fechaVencimiento,
        lote: "",
      });
      setIsMedicamentoFound(true);
    } else {
      alert("Medicamento no encontrado, por favor verifica el código de barras.");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cantidadRecibidaNum = typeof cantidadRecibida === "string" ? Number(cantidadRecibida) : cantidadRecibida;

    if (cantidadDefectuosa > cantidadRecibidaNum) {
      alert("La cantidad defectuosa no puede ser mayor a la cantidad recibida.");
      return;
    }
    
    if (1 > cantidadRecibidaNum) {
      alert("Ingrese la cantidad recibida.");
      return;
    }

    console.log("Ingreso de medicamento:", medicamento);
    console.log("Cantidad defectuosa:", cantidadDefectuosa);

    setIsMedicamentoFound(false);
    setCantidadRecibida(0);
    alert("Ingreso realizado con éxito.");
    setCodigoBarras("");
  };

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
                        <label className="block text-sm font-medium text-gray-700">Cantidad Defectuosa</label>
                        <input
                          type="number"
                          value={cantidadDefectuosa}
                          onChange={handleCantidadDefectuosaChange}
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-4">
                    <Button size="lg" className="w-full">Confirmar ingreso</Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>


        <FooterFuncionarioStock></FooterFuncionarioStock>

      </div>
    </div>
  );
};
