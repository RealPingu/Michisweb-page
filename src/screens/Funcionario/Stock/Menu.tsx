import { Link } from "react-router-dom";

export const MenuStock = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menú Stock</h1>
      <nav className="flex gap-4 mb-6">
        <Link to="/funcionario/stock" className="text-blue-600">Stock</Link>
      </nav>
    </div>
  );
};