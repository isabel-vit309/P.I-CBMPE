import { GoPerson } from "react-icons/go";
import { Settings } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { Logo } from "../../Components/Logo";
import { NavLink, useNavigate } from "react-router-dom";

export function StepFive() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center justify-between w-full p-4 md:px-8 border-b border-zinc-200">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-base">
          <NavLink
            to="/home"
            className="text-zinc-700 hover:text-primary transition-colors"
          >
            Início
          </NavLink>
          <NavLink
            to="/list"
            className="text-zinc-700 hover:text-primary transition-colors"
          >
            Lista de Ocorrência
          </NavLink>
          <NavLink
            to="/profile"
            className="text-zinc-700 hover:text-primary transition-colors"
          >
            Perfil
          </NavLink>
          <NavLink
            to="/settings"
            className="text-zinc-700 hover:text-primary transition-colors"
          >
            Configurações
          </NavLink>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Settings className="w-6 h-6 text-zinc-700" />
          <div className="flex w-12 h-12 bg-input rounded-full items-center justify-center text-zinc-500">
            <GoPerson className="w-6 h-6" />
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-6 py-10">
        <FaCheck className="w-20 h-20 md:w-32 md:h-32 text-green-600" />

        <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
          Ocorrência registrada!
        </h1>

        <p className="font-medium text-base md:text-lg text-gray-600 max-w-md md:max-w-2xl">
          Sua ocorrência foi registrada com sucesso! Você pode administrá-la na
          página{" "}
          <span className="font-semibold text-primary">
            Lista de Ocorrências
          </span>
          .
        </p>

        <button
          onClick={handleClick}
          className="h-12 w-40 border-2 border-red-600 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-colors mt-4"
        >
          Início
        </button>
      </main>
    </div>
  );
}
