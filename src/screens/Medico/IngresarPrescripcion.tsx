import { Button } from "../../components/ui/button";
import { useState, JSX } from "react";
import { FooterMedico } from "../../components/ui/footer";
import BackButton from "../../components/ui/returnButton";
import { Plus } from "lucide-react";

export const IngresarPrescripcion = (): JSX.Element => {
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [rutPaciente, setRutPaciente] = useState("");
  const [medicamentos, setMedicamentos] = useState([
    { nombre: "", duracion: "", frecuencia: "" }
  ]);
  const [mensajeError, setMensajeError] = useState("");
  const agregarMedicamento = () => {
    setMedicamentos([...medicamentos, { nombre: "", duracion: "", frecuencia: "" }]);
  };
  const handleInputChange = (index: number, campo: string, valor: string) => {
    const nuevos = [...medicamentos];
    (nuevos[index] as any)[campo] = valor;
    setMedicamentos(nuevos);
  };
  const handleGuardarPrescripcion = () => {
    const camposPacienteVacios = !nombrePaciente.trim() || !rutPaciente.trim();
    const erroresMedicamentos = medicamentos.map(
      (m) => !m.nombre.trim() || !m.duracion.trim() || !m.frecuencia.trim()
    );
    const hayErrores = camposPacienteVacios || erroresMedicamentos.includes(true);
    if (hayErrores) {
      setMensajeError("Por favor completa todos los campos.");
      return;
    }
    setMensajeError("");
    alert("Prescripción emitida correctamente.");
  };
  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/medico" />

            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Ingresar prescripción</h1>
            </div>   
          </div>
        </div>

        {/* Body */}
        <div className="pt-36 px-4 pb-32">
          <div className="mb-6">
            <h5 className="text-lg font-medium">Datos del paciente</h5>
            <hr />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombrePaciente}
              onChange={(e) => setNombrePaciente(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Juanito Pérez"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">RUT</label>
            <input
              type="text"
              value={rutPaciente}
              onChange={(e) => setRutPaciente(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 12.345.678-9"
            />
          </div>
          <div className="mb-6">
            <h5 className="text-lg font-medium">Prescripción</h5>
            <hr />
          </div>

          {medicamentos.map((medicamento, index) => (
            <div key={index} className="mb-6 border border-gray-200 rounded-md p-4">
              <label className="block text-sm font-medium text-gray-700">
                Medicamento #{index + 1}
              </label>
              <input
                type="text"
                value={medicamento.nombre}
                onChange={(e) => handleInputChange(index, "nombre", e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Loratadina"
              />
              <input
                type="text"
                value={medicamento.duracion}
                onChange={(e) => handleInputChange(index, "duracion", e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 14 días"
              />
              <input
                type="text"
                value={medicamento.frecuencia}
                onChange={(e) => handleInputChange(index, "frecuencia", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 12 horas"
              />
            </div>
          ))}

          {/* Botón para agregar más medicamentos */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <Button variant="secondary" size="icon" className="mx-4" onClick={agregarMedicamento}>
              <Plus />
            </Button>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Botón para ingresar prescripción */}
          <div className="text-center mt-4">
            <Button size="lg" className="w-full" onClick={handleGuardarPrescripcion}>
              Guardar prescripción
            </Button>
          </div>

          {/* Error */}
          {mensajeError && (
            <div className="mb-4 pt-4">
              <p className="text-red-600 text-sm">{mensajeError}</p>
            </div>
          )}

        </div>

        <FooterMedico />

      </div>
    </div>
  );
};
