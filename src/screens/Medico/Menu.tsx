import { ArrowLeftCircleIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

import { useNavigate } from "react-router-dom";//A

export const MenuMedico = (): JSX.Element => {
  //AGREGADO
  const navigate = useNavigate();

  // Menu options data for mapping
  const menuOptions = [
    { id: 1, label: "Revisar stock" },
    { id: 2, label: "Ingresar prescripciones" },
    { id: 3, label: "Emitir recetas" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        <header className="flex flex-col items-center">
          <button onClick={() => navigate("/")}>
            <ArrowLeftCircleIcon className="absolute w-[34px] h-[33px] top-[17px] left-4 text-black" />
          </button>

          <h1 className="absolute top-[53px] left-[139px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-black text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
            MENÚ MÉDICO
          </h1>

          <div className="flex flex-col w-80 items-start justify-center absolute top-[79px] left-[37px]">
            <Separator className="w-full" />
          </div>
        </header>

        <nav className="flex flex-col items-center gap-5 mt-[92px]">
          {menuOptions.map((option, index) => (
            <Button
              key={option.id}
              className="w-[266px] h-[45px] bg-[#2c2c2c] rounded-lg border border-solid text-neutral-100 font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]"
              style={{
                position: "absolute",
                left: "64px",
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
