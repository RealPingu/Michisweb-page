import { Package, ClipboardList, FileText } from "lucide-react";
import { JSX } from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";//A
import BackButton from "../../components/ui/returnButton";


export const MenuMedico = (): JSX.Element => {
  //AGREGADO
  const navigate = useNavigate();

  // Menu options data for mapping
  const menuOptions = [
    { id: 1, label: "Revisar stock", path: "./revisar-stock", icon: Package },
    { id: 2, label: "Ingresar prescripciones", path: "./ingresar-prescripcion", icon: ClipboardList },
    { id: 3, label: "Emitir recetas", path: "./emitir-recetas", icon: FileText },
  ];

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/" />
            <div className="text-center pt-14 pb-2">
              <h1 className="text-xl font-semibold">Menú médico</h1>
            </div>
            <Separator />
          </div>
        </div>

        <nav className="pt-36 px-4 pb-32 flex flex-col gap-4">
          {menuOptions.map(({ id, label, path, icon: Icon }) => (
            <Button
              key={id}
              onClick={() => navigate(path)}
              size="lg"
              className="w-full flex items-center gap-2"
            >
              <Icon className="w-5 h-5" />
              {label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};
