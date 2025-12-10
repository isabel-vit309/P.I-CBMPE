import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-sidebar">
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="pt-6 pb-2 px-6 text-4xl font-bold text-gray-800">
            Dashboard
          </h1>
          <nav className="border-b border-zinc-200 pt-3 flex space-x-6 px-6 text-gray-500">
            <NavLink
              to="/home"
              className="font-medium text-base py-3 text-gray-900 border-b-2 hover:text-red-600"
            >
              Início
            </NavLink>
            <NavLink
              to="/new-occurrence"
              className="font-medium text-base py-3 hover:text-red-600"
            >
              Registrar ocorrência
            </NavLink>
            <NavLink
              to="/registeruser"
              className="font-medium text-base py-3 border-b border-red-600"
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-base py-3 hover:text-red-600"
            >
              Lista de ocorrências
            </NavLink>
            <button
              onClick={handleLogout}
              className="ml-auto font-medium text-base py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
