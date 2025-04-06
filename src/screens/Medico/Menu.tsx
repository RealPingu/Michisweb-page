import { Link, Outlet } from "react-router-dom";

export const MenuMedico = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menú Médico</h1>
      <nav className="flex gap-4 mb-6">
        <Link to="/medico/revisar-stock" className="text-blue-600">Revisar Stock</Link>
        <Link to="/medico/emitir-recetas" className="text-blue-600">Emitir Recetas</Link>
      </nav>
      <div className="border p-4">
        <Outlet />
      </div>
    </div>
  );
};  