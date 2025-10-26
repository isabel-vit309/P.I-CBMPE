import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Trash2 } from "lucide-react";

const ocorrencias = [
  {
    id: 1,
    autor: "Jane Doe",
    data: "20/09/25",
    cidade: "São Paulo",
  },
  {
    id: 2,
    autor: "John Smith",
    cargo: "Tech Lead",
    data: "21/09/25",
    cidade: "Rio de Janeiro",
  },
  {
    id: 3,
    autor: "Alice Johnson",
    cargo: "Analista BI",
    data: "22/09/25",
    cidade: "Curitiba",
  },
  {
    id: 4,
    autor: "Bob Williams",
    cargo: "DevOps",
    data: "23/09/25",
    hora: "16:15",
    cidade: "Belo Horizonte",
  },
];

export function ListUsers() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="ml-12 -mt-1.5 lg:mt-0 lg:ml-0 pt-6 pb-2 px-4 md:px-6 text-2xl md:text-4xl font-bold text-gray-800">
            Lista de Usuários
          </h1>
          <nav className="border-b border-zinc-200 pt-3 flex space-x-4 md:space-x-6 px-4 md:px-6 text-gray-500 overflow-x-auto">
            <NavLink
              to="/home"
              className="font-medium text-sm md:text-base py-3 text-gray-900 hover:text-red-600 whitespace-nowrap"
            >
              Início
            </NavLink>
            <NavLink
              to="/new-occurrence"
              className="font-medium text-sm md:text-base py-3 hover:text-red-600 whitespace-nowrap"
            >
              Registrar ocorrência
            </NavLink>
            <NavLink
              to="/registeruser"
              className="font-medium text-sm md:text-base py-3 border-b hover:text-red-600 whitespace-nowrap"
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-sm md:text-base py-3 border-b border-red-600 whitespace-nowrap"
            >
              Lista de ocorrências
            </NavLink>
            <NavLink
              to="#"
              className="font-medium text-red-600 py-3 whitespace-nowrap"
            >
              Admin
            </NavLink>
          </nav>
        </div>
        <div className="p-4 md:p-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <div className="bg-red-600 text-white p-4 hidden md:flex gap-4 min-w-[600px]">
              <span className="flex-1 text-xs font-semibold">Autor</span>
              <span className="flex-1 text-xs font-semibold">Cidade</span>
              <span className="w-5"></span>
            </div>

            <div className="divide-y divide-gray-200">
              {ocorrencias.map((ocorrencia) => (
                <div key={ocorrencia.id} className="p-4 hover:bg-gray-50">
                  <div className="hidden md:flex gap-4 items-center min-w-[600px]">
                    <span className="flex-1">
                      <p className="font-medium text-gray-900">
                        {ocorrencia.autor}
                      </p>
                      <p className="text-gray-500">{ocorrencia.cargo}</p>
                    </span>
                    <span className="flex-1 text-gray-800">
                      {ocorrencia.cidade}
                    </span>
                    <Trash2 className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {ocorrencia.autor}
                        </p>
                        <p className="text-gray-500">{ocorrencia.cargo}</p>
                      </div>
                      <Trash2 className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Data:</span>{" "}
                        {ocorrencia.data}
                      </div>
                      <div>
                        <span className="text-gray-500">Hora:</span>{" "}
                        {ocorrencia.hora}
                      </div>
                      <div>
                        <span className="text-gray-500">Cidade:</span>{" "}
                        {ocorrencia.cidade}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
