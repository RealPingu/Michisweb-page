import { Button } from "../../components/ui/button";
import { useState, JSX } from "react";
import { FooterMedico } from "../../components/ui/footer";
import BackButton from "../../components/ui/returnButton";

export const AgregarPaciente = (): JSX.Element => {
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleGuardarPaciente = () => {
    if (!nombre || !rut || !fechaNacimiento || !direccion || !telefono) {
      setMensajeError("Por favor completa todos los campos.");
      return;
    }
    setMensajeError("");
    alert("Paciente guardado correctamente.");
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/medico" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Agregar Paciente</h1>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-36 px-4 pb-32">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">RUT</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 12.345.678-9"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Calle Falsa 123"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: +56912345678"
            />
          </div>

          {/* Botón para guardar paciente */}
          <div className="text-center mt-4">
            <Button size="lg" className="w-full" onClick={handleGuardarPaciente}>
              Guardar paciente
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
