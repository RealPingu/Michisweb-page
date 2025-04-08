import { ArrowLeftCircleIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useNavigate } from "react-router-dom";

export const Reserva = (): JSX.Element => {

  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Back button */}
        <button onClick={() => navigate("/funcionario/prescripciones")}>
          <ArrowLeftCircleIcon className="absolute w-[34px] h-[33px] top-[17px] left-4 text-black" />
        </button>

        {/* Header title */}
        <div className="absolute top-11 left-[161px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-black text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
          RESERVA
        </div>

        {/* Divider */}
        <div className="flex flex-col w-80 items-start justify-center absolute top-[82px] left-[37px]">
          <Separator className="w-full" />
        </div>

        {/* Reserve medications button */}
        <Card className="w-[307px] absolute top-[104px] left-[37px] bg-[#2c2c2c] rounded-lg border border-solid">
          <CardContent className="p-3 flex items-center justify-center">
            <span className="font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
              Reservar medicamentos
            </span>
          </CardContent>
        </Card>

        {/* Generate report button */}
        <Card className="w-[307px] h-[75px] absolute top-[165px] left-[37px] bg-[#2c2c2c] rounded-lg border border-solid">
          <CardContent className="p-3 flex items-center justify-center h-full">
            <span className="font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] text-center tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
              Emitir informe
              <br />
              de medicamentos reservados
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
