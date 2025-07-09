import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FooterMedico } from "../../components/ui/footer";
import BackButton from "../../components/ui/returnButton";

export const AgregarPaciente = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token") || "";

    try {
      const res = await fetch("http://localhost:8080/pacientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rut,
          nombre,
          numero: parseInt(numero),
          correo,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Error al crear paciente");
      }

      setSuccess(true);
      setRut("");
      setNombre("");
      setNumero("");
      setCorreo("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen pb-16">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/medico" />
            <div className="text-center pt-14 pb-4">
              <h1 className="text-xl font-semibold">Agregar paciente</h1>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="pt-32 pb-6 px-4 space-y-6"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">RUT</label>
            <Input value={rut} onChange={(e) => setRut(e.target.value)} placeholder="Ej: 12345678-9" required />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Nombre Apellido" required />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Número</label>
            <Input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Ej: 912345678" required />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Correo</label>
            <Input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Ej: nombre@correo.cl" required />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">Paciente creado correctamente</p>}

          <div className="text-center">
            <Button type="submit" className="w-full">Guardar</Button>
          </div>
        </form>

        <FooterMedico />
      </div>
    </div>
  );
};
