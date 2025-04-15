import { UserCircleIcon } from "lucide-react";
import { JSX, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();

  // Estado
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Lista de usuarios simulados
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
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative flex flex-col items-center justify-center">
        <Card className="border-none shadow-none w-[240px]">
          <CardContent className="p-0 space-y-4">
            <div className="flex justify-center mb-2">
              <UserCircleIcon className="w-[102px] h-[104px] text-gray-800" />
            </div>

            <div className="space-y-2">
              <Input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese código de usuario"
                className="min-w-60 px-4 py-3 rounded-lg border border-[#d9d9d9] font-single-line-body-base text-[16px] leading-[100%]"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese password"
                className="min-w-60 px-4 py-3 rounded-lg border border-[#d9d9d9] font-single-line-body-base text-[16px] leading-[100%]"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={handleLogin} 
                variant="default" size="lg"
              >
                Ingresar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
