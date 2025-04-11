import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
  const [cantidadRecibida, setCantidadRecibida] = useState<number>(0);
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
      setCantidadRecibida(encontrado.cantidad);
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

    if (cantidadDefectuosa > cantidadRecibida) {
      alert("La cantidad defectuosa no puede ser mayor a la cantidad recibida.");
      return;
    }

    console.log("Ingreso de medicamento:", medicamento);
    console.log("Cantidad defectuosa:", cantidadDefectuosa);

    navigate("/funcionario/stock");
  };

  const handleGoBack = () => {
    navigate("/funcionario/stock");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 bg-white">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleGoBack}>
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-2xl font-medium">Ingreso de Medicamento</h1>
        </div>
      </header>

      {/* Formulario de Ingreso */}
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Escaneo del Código de Barras */}
          <div>
            <label
              htmlFor="codigoBarras"
              className="block text-sm font-medium text-gray-700"
            >
              Código de Barras
            </label>
            <input
              type="text"
              name="codigoBarras"
              id="codigoBarras"
              value={codigoBarras}
              onChange={handleCodigoBarrasChange}
              onKeyPress={(e) => e.key === "Enter" && handleBuscarMedicamento()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
            <button
              type="button"
              onClick={handleBuscarMedicamento}
              className="mt-2 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Buscar Medicamento
            </button>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Principio Activo</label>
                <input
                  type="text"
                  value={medicamento.principioActivo}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dosis</label>
                <input
                  type="text"
                  value={medicamento.dosis}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vía de Administración</label>
                <input
                  type="text"
                  value={medicamento.via}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                <input
                  type="text"
                  value={medicamento.fechaVencimiento}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Campo para Lote y Cantidad Recibida */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Lote</label>
                <input
                  type="text"
                  name="lote"
                  id="lote"
                  value={medicamento.lote}
                  onChange={handleLoteChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cantidad Recibida</label>
                <input
                  type="number"
                  value={cantidadRecibida}
                  onChange={handleCantidadRecibidaChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              {/* Cantidad Defectuosa */}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cantidad Defectuosa</label>
                    <input
                      type="number"
                      value={cantidadDefectuosa}
                      onChange={handleCantidadDefectuosaChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
              >
                Confirmar Ingreso
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
