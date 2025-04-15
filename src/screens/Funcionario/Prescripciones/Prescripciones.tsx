import { ArrowLeftCircleIcon } from "lucide-react";
import { JSX } from "react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { useNavigate } from "react-router-dom";

export const Prescripciones = (): JSX.Element => {

  const navigate = useNavigate();

  // Menu options data
  const menuOptions = [
    { id: 1, label: "Entrega prescripciones", path: "./pendientes"},
    { id: 2, label: "Reservas", path: "./reservas"},
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Back button */}
        <button onClick={() => navigate("/funcionario")}>
          <ArrowLeftCircleIcon className="absolute w-[34px] h-[33px] top-[17px] left-4 text-black" />
        </button>

        {/* Header title */}
        <h1 className="absolute top-[49px] left-32 font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-black text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
          PRESCRIPCIONES
        </h1>

        {/* Divider */}
        <div className="flex flex-col w-80 items-start justify-center absolute top-20 left-[51px]">
          <Separator className="w-full" />
        </div>

        {/* Review prescriptions button */}
        <nav className="flex flex-col items-center gap-5 mt-[92px]">
          {menuOptions.map((option, index) => (
            <Button
              key={option.id}
              onClick={() => navigate(option.path)}
              variant="outline"
              size= "menu"
              style={{
                top: index === 0 ? "92px" : index === 1 ? "158px" : "224px",
              }}
            >
              {option.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};
