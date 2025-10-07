import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar"; 
import { Trash2, Menu } from "lucide-react";
import { useState } from 'react';

const ocorrencias = [
  { id: 1, autor: 'Jane Doe', cargo: 'Senior Designer', data: '20/09/25', hora: '10:30', cidade: 'São Paulo', gravidade: 'Alta', situacao: 'Pendente' },
  { id: 2, autor: 'John Smith', cargo: 'Tech Lead', data: '21/09/25', hora: '11:45', cidade: 'Rio de Janeiro', gravidade: 'Média', situacao: 'Em Análise' },
  { id: 3, autor: 'Alice Johnson', cargo: 'Analista BI', data: '22/09/25', hora: '14:00', cidade: 'Curitiba', gravidade: 'Baixa', situacao: 'Concluído' },
  { id: 4, autor: 'Bob Williams', cargo: 'DevOps', data: '23/09/25', hora: '16:15', cidade: 'Belo Horizonte', gravidade: 'Alta', situacao: 'Pendente' },
];

export function List() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar para desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Sidebar mobile */}
      {menuAberto && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMenuAberto(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="p-0">
          <div className="flex items-center gap-4 px-6 pt-6">
            <button 
              onClick={() => setMenuAberto(true)}
              className="md:hidden p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Dashboard</h1>
          </div>
          
          <nav className="border-b border-zinc-200 pt-3 flex gap-4 md:gap-6 px-6 text-gray-500">
            <NavLink to='/home' className="text-sm md:text-base py-3 hover:text-red-600">Início</NavLink>
            <NavLink to='/new-occurrence' className="text-sm md:text-base py-3 hover:text-red-600">Registrar ocorrência</NavLink>
            <NavLink to='/list' className="text-sm md:text-base py-3 text-gray-900 border-b-2 border-red-600">Lista de ocorrências</NavLink>
          </nav>
        </div>
        
        {/* Conteúdo */}
        <div className="p-4 md:p-6"> 
          <div className="bg-white rounded-lg border border-gray-200">
            
            {/* Cabeçalho - só no desktop */}
            <div className="bg-red-600 text-white p-4 hidden md:flex gap-4">
              <span className="flex-1 text-xs font-semibold">Autor</span>
              <span className="flex-1 text-xs font-semibold">Data</span>
              <span className="flex-1 text-xs font-semibold">Hora</span>
              <span className="flex-1 text-xs font-semibold">Cidade</span>
              <span className="flex-1 text-xs font-semibold">Gravidade</span>
              <span className="flex-1 text-xs font-semibold">Situação</span>
            </div>

            {/* Lista */}
            <div className="divide-y divide-gray-200">
              {ocorrencias.map((ocorrencia) => (
                <div key={ocorrencia.id} className="p-4 hover:bg-gray-50">
                  
                  {/* Desktop */}
                  <div className="hidden md:flex gap-4 items-center">
                    <span className="flex-1">
                      <p className="font-medium text-gray-900">{ocorrencia.autor}</p>
                      <p className="text-gray-500">{ocorrencia.cargo}</p>
                    </span>
                    <span className="flex-1 text-gray-800">{ocorrencia.data}</span>
                    <span className="flex-1 text-gray-800">{ocorrencia.hora}</span>
                    <span className="flex-1 text-gray-800">{ocorrencia.cidade}</span>
                    <span className="flex-1 text-gray-800">{ocorrencia.gravidade}</span>
                    <span className="flex-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200">
                        {ocorrencia.situacao}
                      </span>
                    </span>
                    <Trash2 className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{ocorrencia.autor}</p>
                        <p className="text-gray-500">{ocorrencia.cargo}</p>
                      </div>
                      <Trash2 className="h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-500">Data:</span> {ocorrencia.data}</div>
                      <div><span className="text-gray-500">Hora:</span> {ocorrencia.hora}</div>
                      <div><span className="text-gray-500">Cidade:</span> {ocorrencia.cidade}</div>
                      <div><span className="text-gray-500">Gravidade:</span> {ocorrencia.gravidade}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Situação:</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200">
                        {ocorrencia.situacao}
                      </span>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}