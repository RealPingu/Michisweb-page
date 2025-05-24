import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { ArrowLeftCircleIcon, LogOutIcon } from "lucide-react";

const BackButton = ({ to = "/funcionario/" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="absolute top-4 left-0 right-0 flex justify-between px-4 items-center">
      <Button
        variant="ghost"
        className="w-8 h-8 p-0"
        onClick={() => navigate(to)}
        title="Volver"
      >
        <ArrowLeftCircleIcon className="w-full h-full text-gray-700" />
      </Button>

      <Button
        variant="ghost"
        className="w-8 h-8 p-0"
        onClick={handleLogout}
        title="Cerrar sesión"
      >
        <LogOutIcon className="w-full h-full text-red-600" />
      </Button>
    </div>
  );
};

export default BackButton;
