import { ArrowLeftCircleIcon } from "lucide-react";
import { JSX } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";

// Menu options data
const menuOptions = [
  { id: 1, label: "STOCK", path: "./Stock"},
  { id: 2, label: "PRESCRIPCIONES", path: "./Prescripciones"},
];

export const MenuFuncionario = (): JSX.Element => {
  
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Back button */}
        <button onClick={() => navigate("/")}>
          <ArrowLeftCircleIcon className="absolute w-[34px] h-[33px] top-[17px] left-4 text-black" />
        </button>

        {/* Header */}
        <h1 className="absolute top-[49px] left-[113px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-black text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
          MENÚ FUNCIONARIO
        </h1>

        {/* Divider */}
        <div className="flex flex-col w-80 items-start justify-center absolute top-[76px] left-[37px]">
          <Separator className="w-full" />
        </div>

        {/* Menu options */}
        {menuOptions.map((option, index) => {

          return (
            <Card
              key={option.id}
              onClick={() => navigate(option.path)}
              className="w-[268px] absolute left-[63px] bg-[#2c2c2c] rounded-lg overflow-hidden border border-solid cursor-pointer hover:bg-[#3d3d3d] transition"
              style={{
                top: `${102 + index * 163}px`,
                height: index === 0 ? "138px" : "133px",
              }}
            >
              <CardContent className="flex items-center justify-center h-full p-3">
                <span className="font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
                  {option.label}
                </span>
              </CardContent>
            </Card>
          );
        })}

      </div>
    </div>
  );
};
