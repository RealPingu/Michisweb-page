import { Package, ClipboardList, FileText, ArrowDownCircle, Truck, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FooterFuncionarioPrescripciones = () => {
    const navigate = useNavigate();
    return (
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-100 border-t text-center text-sm text-gray-500 py-2 flex justify-around">
        <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/funcionario/Prescripciones/reservas")}>
          <Calendar className="w-5 h-5" />
          <span>Reservas</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/funcionario/prescripciones/pendientes")}>
          <ClipboardList className="w-5 h-5" />
          <span>Prescripciones</span>
        </div>
      </div>
    );
  };

export const FooterFuncionarioStock = () => {
    const navigate = useNavigate();
    return (
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-100 border-t text-center text-sm text-gray-500 py-2 flex justify-around">
        <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/funcionario/stock/ingresar-medicamentos")}>
          <Package className="w-5 h-5" />
          <span>Ingreso</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/funcionario/stock/registrar-entrega")}>
          <Truck className="w-5 h-5" />
          <span>Entrega</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/funcionario/stock/emitir-informes")}>
          <FileText className="w-5 h-5" />
          <span>Informe</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/funcionario/stock/baja-medicamentos")}>
          <ArrowDownCircle className="w-5 h-5" />
          <span>Baja</span>
        </div>
      </div>
    );
  };

export const FooterMedico = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-100 border-t text-center text-sm text-gray-500 py-2 flex justify-around">
      <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/medico/revisar-stock")}>
        <Package className="w-5 h-5" />
        <span>Stock</span>
      </div>
      <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/medico/ingresar-prescripcion")}>
        <ClipboardList className="w-5 h-5" />
        <span>Prescripciones</span>
      </div>
      <div className="flex flex-col items-center hover:text-black cursor-pointer" onClick={() => navigate("/medico/emitir-recetas")}>
        <FileText className="w-5 h-5" />
        <span>Recetas</span>
      </div>
    </div>
  );
};