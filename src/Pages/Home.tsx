import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar"; 

export function Home() {
  return (
    <div className="min-h-screen grid grid-cols-sidebar">
      <Sidebar/>
      <div className="flex-1 bg-gray-50">

        <div className="p-0">
          <h1 className="pt-6 pb-2 px-6 text-4xl font-bold text-gray-800">Dashboard</h1>
          
          <nav className="border-b border-zinc-200 pt-3 flex space-x-6 px-6 text-gray-500">
            <NavLink to='/home' className="font-medium text-base py-3 text-gray-900 border-b-2 border-red-600">Início</NavLink>
            <NavLink to='/new-occurrence' className="font-medium text-base py-3 hover:text-red-600">Registrar ocorrência</NavLink>
            <NavLink to='/list' className="font-medium text-base py-3 hover:text-red-600">Lista de ocorrências</NavLink>
          </nav>
        </div>

      </div>
    </div>
  )
}