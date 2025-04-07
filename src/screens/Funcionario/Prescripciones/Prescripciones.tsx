import { ArrowLeftCircleIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { useNavigate } from "react-router-dom";

export const Prescripciones = (): JSX.Element => {

  const navigate = useNavigate();

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
        <Button className="flex w-[307px] h-10 items-center justify-center gap-2 p-3 absolute top-[107px] left-[43px] bg-[#2c2c2c] rounded-lg overflow-hidden border border-solid">
          <span className="relative w-fit mt-[-1.00px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-white text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
            Revisar prescripciones pendientes
          </span>
        </Button>

        {/* Reservation card */}
        <Card
          onClick={() => navigate("./reserva")}
          className="w-[305px] h-[143px] absolute top-[239px] left-[45px] bg-[#2c2c2c] rounded-lg overflow-hidden border border-solid cursor-pointer hover:bg-[#3d3d3d] transition"
        >
          <CardContent className="flex items-center justify-center h-full p-3">
            <span className="relative w-fit font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
              RESERVA
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
