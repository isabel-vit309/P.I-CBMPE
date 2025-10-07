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
      {/* HEADER */}
      <header
        className="
          flex flex-wrap items-center justify-between
          w-full p-4 md:px-8 border-b border-zinc-200
        "
      >
        {/* LOGO */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Logo />
        </div>

        {/* NAVIGATION */}
        <nav
          className="
            hidden md:flex items-center gap-6
            text-sm lg:text-base mt-4 md:mt-0
          "
        >
          <NavLink to="/home" className="flex items-center gap-2 text-zinc-700 hover:text-primary transition-colors">
            <span>Início</span>
          </NavLink>
          <NavLink to="/list" className="flex items-center gap-2 text-zinc-700 hover:text-primary transition-colors">
            <span>Lista de Ocorrência</span>
          </NavLink>
          <NavLink to="/profile" className="flex items-center gap-2 text-zinc-700 hover:text-primary transition-colors">
            <span>Perfil</span>
          </NavLink>
          <NavLink to="/settings" className="flex items-center gap-2 text-zinc-700 hover:text-primary transition-colors">
            <span>Configurações</span>
          </NavLink>
        </nav>

        {/* USER ICONS */}
        <div className="hidden sm:flex items-center space-x-4 mt-4 md:mt-0">
          <Settings className="w-5 h-5 md:w-6 md:h-6 text-zinc-700" />
          <div className="flex w-10 h-10 md:w-12 md:h-12 bg-input rounded-full items-center justify-center text-zinc-500">
            <GoPerson className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        className="
          flex flex-col items-center justify-center
          flex-1 px-4 text-center gap-6 py-10
        "
      >
        <FaCheck className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 text-green-600" />

        <h1
          className="
            font-roboto font-bold
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            text-gray-800
          "
        >
          Ocorrência registrada!
        </h1>

        <p
          className="
            font-roboto font-medium
            text-base sm:text-lg md:text-xl
            max-w-md sm:max-w-lg md:max-w-2xl
            text-gray-600
          "
        >
          Sua ocorrência foi registrada com sucesso! Você pode administrá-la na
          página <span className="font-semibold text-primary">Lista de Ocorrências</span>.
        </p>

        <button
          onClick={handleClick}
          className="
            h-12 sm:h-14 w-40 sm:w-48
            border-2 border-red-600 text-red-600 font-bold rounded-xl
            hover:bg-red-600 hover:text-white transition-colors
            mt-4
          "
        >
          Início
        </button>
      </main>

      {/* FOOTER MOBILE NAV (opcional, se quiser um menu embaixo no mobile) */}
      <nav
        className="
          flex md:hidden justify-around border-t border-zinc-200 py-2
          bg-white fixed bottom-0 left-0 w-full
        "
      >
        <NavLink to="/home" className="text-sm text-zinc-700 hover:text-primary">
          Início
        </NavLink>
        <NavLink to="/list" className="text-sm text-zinc-700 hover:text-primary">
          Lista
        </NavLink>
        <NavLink to="/profile" className="text-sm text-zinc-700 hover:text-primary">
          Perfil
        </NavLink>
        <NavLink to="/settings" className="text-sm text-zinc-700 hover:text-primary">
          Config.
        </NavLink>
      </nav>
    </div>
  );
}
