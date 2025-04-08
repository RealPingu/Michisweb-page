import { UserCircleIcon } from "lucide-react";
import { JSX } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

import { useNavigate } from "react-router-dom"; //A

export const Login = (): JSX.Element => {
  // Login form data
  const formFields = [
    {
      id: "usuario",
      label: "Usuario",
      placeholder: "Ingrese codigo de usuario",
    },
    {
      id: "password",
      label: "Contraseña",
      placeholder: "Ingrese password",
      type: "password",
    },
  ];

  // Button options MODIFICADO
  const navigate = useNavigate();

  const loginButtons = [
    {
      text: "Ingresar como funcionario",
      className: "w-[215px]",
      onClick: () => navigate("/funcionario"),
    },
    {
      text: "Ingresar como médico",
      className: "w-[191px]",
      onClick: () => navigate("/medico"),
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative flex flex-col items-center justify-center">
        <Card className="border-none shadow-none w-[240px]">
          <CardContent className="p-0 space-y-4">
            <div className="flex justify-center mb-2">
              <UserCircleIcon className="w-[102px] h-[104px] text-gray-800" />
            </div>

            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Input
                  id={field.id}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className="min-w-60 px-4 py-3 rounded-lg border border-[#d9d9d9] font-single-line-body-base text-[16px] leading-[100%]"
                />
              </div>
            ))}

            <div className="space-y-3 pt-2">
              {loginButtons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.onClick} // <<--- Aquí
                  className={`h-10 ${button.className} bg-[#65558f] hover:bg-[#534673] text-white rounded-[100px] font-m3-label-large text-[14px] tracking-[0.1px] leading-[20px]`}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
