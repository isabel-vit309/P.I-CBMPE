
import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar"
import { Ellipsis } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen grid grid-cols-sidebar">
        <Sidebar/>
        <main className=" ">
          
          <h1 className="pt-6 pb- 12 px-6 text-4xl font-bold ">Dashboard</h1>
          <nav className="border-b border-zinc-200 pt-6 pb-4">
            <NavLink to='/home' className="px-6 font-medium text-base">Início</NavLink>
            <NavLink to='/new-occurrence' className="px-6 font-medium text-base">Registrar Ocorrência</NavLink>
            <NavLink to='/list' className="px-6 font-medium text-base">Lista de Ocorrência</NavLink>
            <Ellipsis className="inline w-6 h-6"/>
          </nav>
          </main>

     

    </div>
  )
}