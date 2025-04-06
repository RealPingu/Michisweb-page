import { Link } from "react-router-dom";

export const MenuFuncionario = () => {
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Menú Funcionario</h1>
    <nav className="flex gap-4 mb-6">
      <Link to="/funcionario/stock" className="text-blue-600">Stock</Link>
      <Link to="/funcionario/prescripciones" className="text-blue-600">Prescripciones</Link>
    </nav>
  </div>
  );
};