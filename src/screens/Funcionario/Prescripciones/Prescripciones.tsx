import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import BackButton from "../../../components/ui/returnButton";
import { Separator } from "../../../components/ui/separator";

export const Prescripciones = (): JSX.Element => {
  const navigate = useNavigate();

  const menuOptions = [
    { id: 1, label: "Entrega prescripciones", path: "./pendientes" },
    { id: 2, label: "Reservas", path: "./reservas" },
  ];

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-2">
          <div className="relative max-w-md mx-auto">
            <BackButton to="/funcionario" />
            <div className="text-center pt-14 pb-2">
              <h1 className="text-xl font-semibold">Prescripciones</h1>
            </div>
            <Separator />
          </div>
        </div>

        {/* Body */}
        <div className="pt-36 px-4 pb-32 flex flex-col gap-4">
          {menuOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => navigate(option.path)}
              size="lg"
              className="w-full"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
