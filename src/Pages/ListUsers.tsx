import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Trash2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  roles: string[];
}

export function ListUsers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const verificarSeUsuarioEhAdmin = () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return false;

      let token = storedToken.replace(/^"|"$/g, "").trim();
      if (token.startsWith("Bearer ")) {
        token = token.slice(7);
      }

      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));

        const userRoles = payload.roles || payload.authorities || [];
        const isUserAdmin = userRoles.some(
          (role: string) => role.includes("ADMIN") || role.includes("admin")
        );

        return isUserAdmin;
      }
    } catch (error) {
      console.error("Erro ao verificar permissões do usuário:", error);
    }
    return false;
  };

  const filterUsuarios = (term: string) => {
    if (!term.trim()) {
      setFilteredUsuarios(usuarios);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    const filtered = usuarios.filter(
      (usuario) =>
        usuario.nome.toLowerCase().includes(lowerCaseTerm) ||
        usuario.email.toLowerCase().includes(lowerCaseTerm) ||
        usuario.roles.some(
          (role) =>
            role.toLowerCase().includes(lowerCaseTerm) ||
            (role === "ADMIN" && "administrador".includes(lowerCaseTerm)) ||
            (role === "BOMBEIRO" && "bombeiro".includes(lowerCaseTerm))
        )
    );

    setFilteredUsuarios(filtered);
  };

  useEffect(() => {
    const adminStatus = verificarSeUsuarioEhAdmin();
    setIsAdmin(adminStatus);

    if (!adminStatus) {
      setLoading(false);
      setError("Você não tem permissão para acessar esta página.");
      return;
    }

    const carregarUsuarios = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          setError("Token não encontrado. Faça login novamente.");
          setLoading(false);
          return;
        }

        let token = storedToken.replace(/^"|"$/g, "").trim();
        if (token.startsWith("Bearer ")) {
          token = token.slice(7);
        }

        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_BASE_URL}/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuarios(response.data);
        setFilteredUsuarios(response.data);
      } catch (err: any) {
        console.error("Erro ao carregar usuários:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Sessão expirada ou sem permissão. Faça login novamente.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError(
            "Erro ao carregar usuários: " +
              (err.response?.data?.message || err.message)
          );
        }
      } finally {
        setLoading(false);
      }
    };

    carregarUsuarios();
  }, []);
  useEffect(() => {
    filterUsuarios(searchTerm);
  }, [searchTerm, usuarios]);

  const handleDeleteUser = async (userId: number, userName: string) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
      return;
    }

    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        alert("Token não encontrado. Faça login novamente.");
        return;
      }

      let token = storedToken.replace(/^"|"$/g, "").trim();
      if (token.startsWith("Bearer ")) {
        token = token.slice(7);
      }

      const API_BASE_URL = import.meta.env.VITE_API_URL;

      await axios.delete(`${API_BASE_URL}/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUsuarios = usuarios.filter(
        (usuario) => usuario.id !== userId
      );
      setUsuarios(updatedUsuarios);
      setFilteredUsuarios(
        updatedUsuarios.filter(
          (usuario) =>
            usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.roles.some(
              (role) =>
                role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (role === "ADMIN" &&
                  "administrador".includes(searchTerm.toLowerCase())) ||
                (role === "BOMBEIRO" &&
                  "bombeiro".includes(searchTerm.toLowerCase()))
            )
        )
      );

      alert("Usuário excluído com sucesso!");
    } catch (err: any) {
      console.error("Erro ao excluir usuário:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Sessão expirada ou sem permissão. Faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (err.response?.status === 404) {
        alert("Erro: Usuário não encontrado.");
      } else {
        alert(
          "Erro ao excluir usuário: " +
            (err.response?.data?.message || err.message)
        );
      }
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrador";
      case "BOMBEIRO":
        return "Bombeiro";
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <div className="flex-1 bg-gray-50 flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-red-600 mb-4">
              Acesso Negado
            </h1>
            <p className="text-gray-600">
              Você não tem permissão para acessar esta página.
            </p>
            <NavLink
              to="/home"
              className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Voltar para o Início
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <Sidebar />

      <div className="flex-1 w-full">
        <div className="p-4 md:p-6">
          <h1 className="ml-12 md:-mt-1.5 lg:ml-0 lg:mt-0 text-2xl md:text-4xl font-bold text-gray-800 mb-3">
            Lista de Usuários
          </h1>

          <nav className="border-b border-zinc-200 flex gap-4 md:gap-6 overflow-x-auto text-gray-600">
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
              className="font-medium text-sm md:text-base py-3 hover:text-red-600 whitespace-nowrap"
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-sm md:text-base py-3 border-b-2 border-red-600 text-red-600 whitespace-nowrap"
            >
              Lista de ocorrências
            </NavLink>
            <NavLink
              to="/list-users"
              className="font-medium text-sm md:text-base py-3 text-red-600 whitespace-nowrap"
            >
              Admin
            </NavLink>
          </nav>
        </div>

        <div className="p-4 md:p-6">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              {/* Barra de Pesquisa */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Pesquisar por nome, email ou cargo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {filteredUsuarios.length} usuário(s) encontrado(s)
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
              </div>

              {/* Lista de Usuários */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="hidden md:flex bg-red-600 text-white text-sm font-semibold px-6 py-3">
                  <span className="flex-1">Nome</span>
                  <span className="flex-1">Email</span>
                  <span className="flex-1">Função</span>
                  <span className="w-20 text-center">Ações</span>
                </div>

                {filteredUsuarios.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    {searchTerm ? (
                      <>
                        <p>Nenhum usuário encontrado para "{searchTerm}"</p>
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-2 text-red-600 hover:text-red-700 underline"
                        >
                          Limpar pesquisa
                        </button>
                      </>
                    ) : (
                      <p>Nenhum usuário cadastrado</p>
                    )}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredUsuarios.map((usuario) => (
                      <div
                        key={usuario.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="hidden md:flex gap-4 items-center">
                          <span className="flex-1">
                            <p className="font-medium text-gray-900">
                              {usuario.nome}
                            </p>
                          </span>
                          <span className="flex-1 text-gray-800">
                            {usuario.email}
                          </span>
                          <span className="flex-1 text-gray-800">
                            {usuario.roles.map(formatRole).join(", ")}
                          </span>
                          <span className="w-20 flex justify-center">
                            <button
                              onClick={() =>
                                handleDeleteUser(usuario.id, usuario.nome)
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                              title="Excluir usuário"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </span>
                        </div>

                        <div className="md:hidden space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {usuario.nome}
                              </p>
                              <p className="text-gray-500 text-sm mt-1">
                                {usuario.email}
                              </p>
                              <div className="mt-2">
                                <span className="text-sm text-gray-700">
                                  <span className="text-gray-500">Função:</span>{" "}
                                  {usuario.roles.map(formatRole).join(", ")}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleDeleteUser(usuario.id, usuario.nome)
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 ml-2"
                              title="Excluir usuário"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
