import { Package, Truck, FileText, ArrowDownCircle, ArrowLeftCircleIcon } from "lucide-react";
import { JSX } from "react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { useNavigate } from "react-router-dom";

export const MenuStock = (): JSX.Element => {
  const navigate = useNavigate();

  const menuOptions = [
    { id: 1, label: "Ingresar productos", path: "/funcionario/stock/ingresar-medicamentos", icon: Package },
    { id: 2, label: "Registrar entregas", path: "/funcionario/stock/registrar-entrega", icon: Truck },
    { id: 3, label: "Emitir informes", path: "/funcionario/stock/emitir-informes", icon: FileText },
    { id: 4, label: "Registrar bajas", path: "/funcionario/stock/baja-medicamentos", icon: ArrowDownCircle },
  ];
  

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Back button */}
        <button onClick={() => navigate("/funcionario")}>
          <ArrowLeftCircleIcon className="absolute w-[34px] h-[33px] top-[17px] left-4 text-black" />
        </button>

        {/* Title */}
        <h1 className="absolute top-[54px] left-1/2 transform -translate-x-1/2 font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-black text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
          STOCK
        </h1>

        {/* Divider */}
        <div className="flex flex-col w-80 items-start justify-center absolute top-[89px] left-9">
          <Separator className="w-full" />
        </div>

        {/* Stock options */}
        <nav className="flex flex-col items-center gap-4 mt-24 px-4">
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
