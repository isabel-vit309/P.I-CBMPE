import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Trash2, Filter, X } from "lucide-react";
import axios from "axios";

interface Ocorrencia {
  id: number;
  roles: string[];
  viatura: string;
  grupamento: string;
  status: string;
  dataHoraOcorrido: string;
  dataRegistro: string;
  regiao: string;
  descricao: string;
  recursosUtilizados: string;
  numeroVitimas: number;
  enderecoOcorrencia: string;
  situacaoFinal: string;
  nome: string;
  codigoIdentificacao: string;
  cpf: string;
  telefone: string;
}

interface Filtros {
  tipo: string;
  regiao: string;
  gravidade: string;
}

export function List() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [ocorrenciasFiltradas, setOcorrenciasFiltradas] = useState<
    Ocorrencia[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filtros, setFiltros] = useState<Filtros>({
    tipo: "",
    regiao: "",
    gravidade: "",
  });

  // Recupera IDs deletados do localStorage
  const getDeletados = (): number[] => {
    return JSON.parse(localStorage.getItem("ocorrenciasDeletadas") || "[]");
  };

  // Verifica se o usuário é admin
  const verificarSeUsuarioEhAdmin = () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return false;
      let token = storedToken.replace(/^"|"$/g, "").trim();
      if (token.startsWith("Bearer ")) token = token.slice(7);
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const userRoles = payload.roles || payload.authorities || [];
        return userRoles.some((role: string) =>
          role.toLowerCase().includes("admin")
        );
      }
    } catch (error) {
      console.error("Erro ao verificar permissões do usuário:", error);
    }
    return false;
  };

  // Busca ocorrências do backend e remove as deletadas
  const fetchOcorrencias = async () => {
    try {
      setLoading(true);
      setError(null);
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setError("Token não encontrado. Faça login novamente.");
        return;
      }
      let token = storedToken.replace(/^"|"$/g, "").trim();
      if (token.startsWith("Bearer ")) token = token.slice(7);

      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API_BASE_URL}/ocorrencias`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filtra ocorrências deletadas
      const deletados = getDeletados();
      const filtradas = response.data.filter(
        (oc: Ocorrencia) => !deletados.includes(oc.id)
      );

      setOcorrencias(filtradas);
      setOcorrenciasFiltradas(filtradas);
    } catch (error: any) {
      console.error("Erro ao buscar ocorrências:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
      } else if (error.response?.status === 404) {
        setError("Nenhuma ocorrência encontrada.");
      } else {
        setError(
          "Erro ao carregar ocorrências: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Aplica filtros
  const aplicarFiltros = () => {
    let filtered = [...ocorrencias];
    if (filtros.tipo) {
      filtered = filtered.filter((ocorrencia) =>
        ocorrencia.roles.some((role) =>
          role.toLowerCase().includes(filtros.tipo.toLowerCase())
        )
      );
    }
    if (filtros.regiao) {
      filtered = filtered.filter((ocorrencia) =>
        ocorrencia.regiao.toLowerCase().includes(filtros.regiao.toLowerCase())
      );
    }
    if (filtros.gravidade) {
      filtered = filtered.filter(
        (ocorrencia) => getGravidade(ocorrencia.roles) === filtros.gravidade
      );
    }
    setOcorrenciasFiltradas(filtered);
  };

  const limparFiltros = () => {
    setFiltros({
      tipo: "",
      regiao: "",
      gravidade: "",
    });
    setOcorrenciasFiltradas(ocorrencias);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, ocorrencias]);

  useEffect(() => {
    setIsAdmin(verificarSeUsuarioEhAdmin());
  }, []);

  const tiposUnicos = Array.from(
    new Set(ocorrencias.flatMap((oc) => oc.roles))
  );
  const regioesUnicas = Array.from(
    new Set(ocorrencias.map((oc) => oc.regiao))
  ).filter(Boolean);

  // DELETE apenas no front e "permanente"
  const handleDeleteFront = (id: number) => {
    if (
      !window.confirm(
        "Tem certeza que deseja remover esta ocorrência da lista?"
      )
    )
      return;

    // Salva no localStorage
    const deletados = getDeletados();
    localStorage.setItem(
      "ocorrenciasDeletadas",
      JSON.stringify([...deletados, id])
    );

    // Remove da tela
    setOcorrencias((prev) => prev.filter((oc) => oc.id !== id));
    setOcorrenciasFiltradas((prev) => prev.filter((oc) => oc.id !== id));
  };

  // Funções auxiliares
  const formatarData = (dataString: string) => {
    try {
      return new Date(dataString).toLocaleDateString("pt-BR");
    } catch {
      return dataString;
    }
  };

  const formatarHora = (dataString: string) => {
    try {
      return new Date(dataString).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dataString;
    }
  };

  const getGravidade = (roles: string[]) => {
    const tiposAltaGravidade = [
      "Incendio",
      "Deslizamento",
      "AcidenteRodoviario",
    ];
    const tiposMediaGravidade = ["Alagamento", "Tempestade"];
    if (roles.some((role) => tiposAltaGravidade.includes(role))) return "Alta";
    if (roles.some((role) => tiposMediaGravidade.includes(role)))
      return "Média";
    return "Baixa";
  };

  const getStatusTraduzido = (status: string) => {
    const statusMap: { [key: string]: string } = {
      PENDENTE: "Pendente",
      EM_ANDAMENTO: "Em Andamento",
      FINALIZADA: "Finalizada",
    };
    return statusMap[status] || status;
  };

  const getTipoTraduzido = (tipo: string) => {
    const tipoMap: { [key: string]: string } = {
      Incendio: "Incêndio",
      Alagamento: "Alagamento",
      Deslizamento: "Deslizamento",
      AcidenteRodoviario: "Acidente Rodoviário",
      QuedaArvore: "Queda de Árvore",
      Tempestade: "Tempestade",
    };
    return tipoMap[tipo] || tipo;
  };

  useEffect(() => {
    fetchOcorrencias();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <Sidebar />
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando ocorrências...</p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <Sidebar />
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchOcorrencias}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 w-full">
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="ml-12 md:-mt-1.5 lg:ml-0 lg:mt-0 text-2xl md:text-4xl font-bold text-gray-800 mb-3">
              Lista de Ocorrências
            </h1>
            <div className="flex gap-2 mb-3 sm:mb-0">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                <Filter className="h-4 w-4" />
                Filtros
                {Object.values(filtros).some((val) => val !== "") && (
                  <span className="bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
              <button
                onClick={fetchOcorrencias}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
              >
                Atualizar Lista
              </button>
            </div>
          </div>
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
            {isAdmin && (
              <NavLink
                to="/registeruser"
                className="font-medium text-xs md:text-sm lg:text-base py-3 hover:text-red-600 whitespace-nowrap"
              >
                Registrar Usuário
              </NavLink>
            )}
            <NavLink
              to="/list"
              className="font-medium text-sm md:text-base py-3 border-b-2 border-red-600 text-red-600 whitespace-nowrap"
            >
              Lista de ocorrências
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/list-users"
                className="font-medium text-sm md:text-base py-3 text-red-600 whitespace-nowrap"
              >
                Admin
              </NavLink>
            )}
          </nav>
        </div>

        {mostrarFiltros && (
          <div className="p-4 md:p-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
              <div className="flex gap-2">
                <button
                  onClick={limparFiltros}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Limpar Filtros
                </button>
                <button
                  onClick={() => setMostrarFiltros(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Ocorrência
                </label>
                <select
                  value={filtros.tipo}
                  onChange={(e) =>
                    setFiltros({ ...filtros, tipo: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Todos os tipos</option>
                  {tiposUnicos.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {getTipoTraduzido(tipo)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Região
                </label>
                <select
                  value={filtros.regiao}
                  onChange={(e) =>
                    setFiltros({ ...filtros, regiao: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Todas as regiões</option>
                  {regioesUnicas.map((regiao) => (
                    <option key={regiao} value={regiao}>
                      {regiao}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gravidade
                </label>
                <select
                  value={filtros.gravidade}
                  onChange={(e) =>
                    setFiltros({ ...filtros, gravidade: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Todas as gravidades</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {ocorrenciasFiltradas.length} de {ocorrencias.length} ocorrências
              {Object.values(filtros).some((val) => val !== "") &&
                " (filtradas)"}
            </div>
          </div>
        )}

        <div className="p-4 md:p-6">
          {ocorrenciasFiltradas.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500 text-lg">
                {ocorrencias.length === 0
                  ? "Nenhuma ocorrência registrada ainda."
                  : "Nenhuma ocorrência encontrada com os filtros aplicados."}
              </p>
              {ocorrencias.length === 0 ? (
                <NavLink
                  to="/new-occurrence"
                  className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Registrar Primeira Ocorrência
                </NavLink>
              ) : (
                <button
                  onClick={limparFiltros}
                  className="inline-block mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div
                className={`hidden md:flex bg-red-600 text-white text-sm font-semibold px-6 py-3 ${
                  isAdmin ? "pr-16" : "pr-6"
                }`}
              >
                <span className="flex-1">Solicitante</span>
                <span className="flex-1">Data</span>
                <span className="flex-1">Hora</span>
                <span className="flex-1">Região</span>
                <span className="flex-1">Tipo</span>
                <span className="flex-1">Gravidade</span>
                <span className="flex-1">Situação</span>
                {isAdmin && <span className="w-10 text-center">Ações</span>}
              </div>
              <div className="divide-y divide-gray-200">
                {ocorrenciasFiltradas.map((ocorrencia) => (
                  <div key={ocorrencia.id} className="p-4 hover:bg-gray-50">
                    {/* Desktop */}
                    <div className="hidden md:flex gap-4 items-center">
                      <span className="flex-1">
                        <p className="font-medium text-gray-900">
                          {ocorrencia.nome}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {ocorrencia.codigoIdentificacao}
                        </p>
                      </span>
                      <span className="flex-1 text-gray-800">
                        {formatarData(ocorrencia.dataHoraOcorrido)}
                      </span>
                      <span className="flex-1 text-gray-800">
                        {formatarHora(ocorrencia.dataHoraOcorrido)}
                      </span>
                      <span className="flex-1 text-gray-800">
                        {ocorrencia.regiao}
                      </span>
                      <span className="flex-1 text-gray-800">
                        {ocorrencia.roles.map(getTipoTraduzido).join(", ")}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            getGravidade(ocorrencia.roles) === "Alta"
                              ? "bg-red-100 text-red-800"
                              : getGravidade(ocorrencia.roles) === "Média"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {getGravidade(ocorrencia.roles)}
                        </span>
                      </span>
                      <span className="flex-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            ocorrencia.status === "PENDENTE"
                              ? "bg-yellow-100 text-yellow-800"
                              : ocorrencia.status === "EM_ANDAMENTO"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {getStatusTraduzido(ocorrencia.status)}
                        </span>
                      </span>
                      {isAdmin && (
                        <div className="w-10 flex justify-center">
                          {/* Botão de deletar só no front */}
                          <Trash2
                            className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                            onClick={() => handleDeleteFront(ocorrencia.id)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {ocorrencia.nome}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {ocorrencia.codigoIdentificacao}
                          </p>
                        </div>
                        {isAdmin && (
                          // Botão de deletar só no front mobile
                          <Trash2
                            className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                            onClick={() => handleDeleteFront(ocorrencia.id)}
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                        <div>
                          <span className="text-gray-500">Data:</span>{" "}
                          {formatarData(ocorrencia.dataHoraOcorrido)}
                        </div>
                        <div>
                          <span className="text-gray-500">Hora:</span>{" "}
                          {formatarHora(ocorrencia.dataHoraOcorrido)}
                        </div>
                        <div>
                          <span className="text-gray-500">Região:</span>{" "}
                          {ocorrencia.regiao}
                        </div>
                        <div>
                          <span className="text-gray-500">Tipo:</span>{" "}
                          {ocorrencia.roles.map(getTipoTraduzido).join(", ")}
                        </div>
                        <div>
                          <span className="text-gray-500">Gravidade:</span>{" "}
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              getGravidade(ocorrencia.roles) === "Alta"
                                ? "bg-red-100 text-red-800"
                                : getGravidade(ocorrencia.roles) === "Média"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {getGravidade(ocorrencia.roles)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Vítimas:</span>{" "}
                          {ocorrencia.numeroVitimas}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Situação:</span>{" "}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            ocorrencia.status === "PENDENTE"
                              ? "bg-yellow-100 text-yellow-800"
                              : ocorrencia.status === "EM_ANDAMENTO"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {getStatusTraduzido(ocorrencia.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
