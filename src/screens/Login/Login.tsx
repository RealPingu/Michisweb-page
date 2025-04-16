import { UserCircleIcon } from "lucide-react";
import { JSX, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mockUsers = [
    { username: "F123", password: "func123", role: "funcionario" },
    { username: "M456", password: "med456", role: "medico" },
  ];

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.username === usuario && u.password === password
    );

    if (user) {
      if (user.role === "funcionario") {
        navigate("/funcionario");
      } else if (user.role === "medico") {
        navigate("/medico");
      }
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center w-full min-h-screen px-4">
      {/* Encabezado de bienvenida */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#2196F3]">Farmacia CESFAM</h1>
        <p className="text-sm text-gray-600">Bienvenido, por favor inicie sesión</p>
      </div>

      <Card className="border-none shadow-md w-full max-w-xs bg-white">
        <CardContent className="p-6 space-y-5">
          <div className="flex justify-center">
            <UserCircleIcon className="w-24 h-24 text-[#2196F3]" />
          </div>

          {/* Usuario */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Código de usuario</span>
            <Input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese código de usuario"
              className="px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Contraseña</span>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese password"
              className="px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={handleLogin}
              variant="default"
              size="lg"
              className="w-full"
            >
              Ingresar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
