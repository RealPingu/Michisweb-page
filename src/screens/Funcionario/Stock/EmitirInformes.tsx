import {
  ArrowLeftCircleIcon,
  CalendarIcon,
  FileTextIcon,
  MapPinIcon,
  MicIcon,
  SearchIcon,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { JSX } from "react";


export const EmitirInformes = (): JSX.Element => {
  // Data for the medication card
  const medicationData = {
    name: "Nombre del medicamento",
    description: "Descripción de medicamento",
    imageUrl: "/image.svg",
  };

  // Data for the bottom navigation
  const navigationItems = [
    { name: "Stock", icon: <MapPinIcon className="w-5 h-5 md:w-6 md:h-6" />, active: true },
    {
      name: "Prescripciones",
      icon: <FileTextIcon className="w-5 h-5 md:w-6 md:h-6" />,
      active: false,
    },
    {
      name: "Reservas",
      icon: <CalendarIcon className="w-5 h-5 md:w-6 md:h-6" />,
      active: false,
    },
  ];

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Back button */}
        <ArrowLeftCircleIcon className="absolute w-8 h-8 md:w-[42px] md:h-[42px] top-4 left-4" />

        {/* Title */}
        <div className="absolute w-full px-4 text-center top-[79px]">
          <div className="font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-black text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)]">
            Informe de stock
          </div>
        </div>

        {/* Divider */}
        <div className="absolute w-[calc(100%-2rem)] mx-4 top-[107px]">
          <Separator className="w-full" />
        </div>

        {/* Search bar */}
        <div className="absolute w-[calc(100%-2rem)] mx-4 top-[119px]">
          <div className="flex items-center gap-1 bg-m3syslightsurface-container-high rounded-[28px] p-1">
            <div className="flex w-10 h-10 md:w-12 md:h-12 items-center justify-center">
              <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <Input
              className="flex-1 border-none bg-transparent font-m3-body-large font-[number:var(--m3-body-large-font-weight)] text-m3syslighton-surface-variant text-[length:var(--m3-body-large-font-size)] tracking-[var(--m3-body-large-letter-spacing)] leading-[var(--m3-body-large-line-height)] focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
              placeholder="Búsqueda de medicamento"
            />

            <div className="flex w-10 h-10 md:w-12 md:h-12 items-center justify-center">
              <MicIcon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>

        {/* Search history label */}
        <div className="absolute px-4 top-[199px]">
          <div className="font-body-small font-[number:var(--body-small-font-weight)] text-black text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)]">
            Historial de búsqueda
          </div>
        </div>

        {/* Medication card */}
        <Card className="absolute w-[calc(100%-2rem)] mx-4 top-[231px] rounded-lg border border-solid border-[#d9d9d9]">
          <CardContent className="p-4 flex flex-col gap-4 h-full">
            <div className="relative w-full aspect-video bg-[url(/image.svg)] bg-cover bg-center bg-image-placeholder rounded-md" />

            <div className="flex flex-col gap-2">
              <div className="flex items-start w-full">
                <div className="flex-1 text-[#1e1e1e] text-[length:var(--body-base-font-size)] leading-[var(--body-base-line-height)] mt-[-1.00px] font-body-base font-[number:var(--body-base-font-weight)] tracking-[var(--body-base-letter-spacing)] [font-style:var(--body-base-font-style)]">
                  {medicationData.name}
                </div>
              </div>

              <div className="flex items-start w-full">
                <div className="w-fit text-[#757575] text-[length:var(--body-small-font-size)] leading-[var(--body-small-line-height)] mt-[-1.00px] font-body-small font-[number:var(--body-small-font-weight)] tracking-[var(--body-small-letter-spacing)] [font-style:var(--body-small-font-style)]">
                  {medicationData.description}
                </div>
              </div>
            </div>

            <Button className="w-full h-[46px] mt-auto bg-[#2c2c2c] text-neutral-100 rounded-lg font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
              Revisar informe de stock
            </Button>
          </CardContent>
        </Card>

        {/* Bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 flex items-start gap-2 px-2 py-0 bg-m3syslightsurface-container">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1 pt-3 pb-4 px-0 flex-1 grow"
            >
              <div
                className={`inline-flex flex-col items-center justify-center ${item.active ? "bg-m3syslightsecondary-container" : ""} rounded-2xl overflow-hidden`}
              >
                <div className="flex w-10 h-10 md:w-16 md:h-8 px-2 md:px-5 py-1 items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <div
                className={`relative text-xs md:text-sm ${item.active ? "font-m3-label-medium-prominent font-[number:var(--m3-label-medium-prominent-font-weight)] text-m3syslighton-surface" : "font-m3-label-medium font-[number:var(--m3-label-medium-font-weight)] text-m3syslighton-surface-variant"} text-[length:var(--m3-label-medium-font-size)] text-center tracking-[var(--m3-label-medium-letter-spacing)] leading-[var(--m3-label-medium-line-height)] [font-style:var(--m3-label-medium-font-style)]`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};