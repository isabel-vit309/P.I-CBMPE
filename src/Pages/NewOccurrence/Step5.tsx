import { GoPerson } from "react-icons/go";
import { Settings } from 'lucide-react';
import { FaCheck } from "react-icons/fa6";
import { Logo } from "../../Components/Logo";
import { NavLink, useNavigate } from "react-router-dom";


export function StepFive(){

    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate('/home');
    }

    return(
        <div className="min-h-screen">
            <header className="flex items-center w-full justify-between p-4">
                <Logo />
                <nav className="flex items-center gap-6">
                    <NavLink to={"/home"} className="flex items-center gap-3 mt-5">
                        <span>Início</span>
                    </NavLink>
                    <NavLink to={"/list"} className="flex items-center gap-3 mt-5">
                        <span>Lista de Ocorrência</span>
                    </NavLink>
                    <NavLink to={"/profile"} className="flex items-center gap-3 mt-5">
                        <span>Perfil</span>
                    </NavLink>
                    <NavLink to={"/settings"} className="flex items-center gap-3 mt-5">
                        <span>Configurações</span>
                    </NavLink>
                </nav>
                <div className="flex items-center space-x-4">
                    <Settings className='w-6 h-6' />
                    <div className='flex w-12 h-12 bg-input rounded-full items-center justify-center text-zinc-500'>
                        <GoPerson className='w-6 h-6' />
                    </div>
                </div>
            </header>
            <div className="border border-b bg-zinc-200"></div>
            <main className="flex flex-col items-center justify-center h-[80vh] gap-6">
                <FaCheck className="w-44 h-44 text-green-600"/>
                <h1 className="font-roboto font-bold text-5xl">Ocorrência registrada!</h1>
                <p className="font-roboto font-medium text-lg">Sua ocorrência foi registrada com sucesso! Você pode administrá-la na página lista de ocorrências.</p>
                <button onClick={handleClick} className="h-16 w-32 border-2 border-red-600 text-red-600 font-bold ">Início</button>
            </main>
        </div>
    )
}