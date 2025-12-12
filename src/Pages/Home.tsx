import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
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

const COLORS = [
  "#E10643",
  "#FFA500",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const PieCustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold">{`${payload[0].name}: ${payload[0].value} ocorrências`}</p>
      </div>
    );
  }
  return null;
};

const LineCustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold">{`Mês: ${label}`}</p>
        <p className="text-red-600">{`Ocorrências: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BarCustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold">{`Tipo: ${label}`}</p>
        <p className="text-red-600">{`Ocorrências: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function Home() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      if (token.startsWith("Bearer ")) {
        token = token.slice(7);
      }
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API_BASE_URL}/ocorrencias`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOcorrencias(
        response.data.filter(
          (oc: Ocorrencia) => !!oc.status && oc.status !== "null"
        )
      );
    } catch (error: any) {
      console.error("Erro ao buscar ocorrências:", error);
      setError("Erro ao carregar dados do dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const processarDadosArea = () => {
    if (ocorrencias.length === 0) return [{ name: "Sem dados", value: 1 }];
    let urbana = 0;
    let rural = 0;
    ocorrencias.forEach((ocorrencia) => {
      if (ocorrencia.regiao === "Urbana") {
        urbana++;
      } else if (ocorrencia.regiao === "Rural") {
        rural++;
      }
    });
    return [
      { name: "Urbana", value: urbana },
      { name: "Rural", value: rural },
    ];
  };

  const processarDadosMensais = () => {
    if (ocorrencias.length === 0) {
      return Array.from({ length: 12 }, (_, i) => ({
        mes: new Date(2024, i).toLocaleString("pt-BR", { month: "short" }),
        ocorrencias: 0,
      }));
    }
    const meses = Array.from({ length: 12 }, (_, i) => ({
      mes: new Date(2024, i).toLocaleString("pt-BR", { month: "short" }),
      ocorrencias: 0,
    }));
    ocorrencias.forEach((ocorrencia) => {
      try {
        const data = new Date(ocorrencia.dataHoraOcorrido);
        const mes = data.getMonth();
        if (mes >= 0 && mes < 12) {
          meses[mes].ocorrencias++;
        }
      } catch (e) {
        console.warn("Data inválida:", ocorrencia.dataHoraOcorrido);
      }
    });
    return meses;
  };

  const processarDadosTipos = () => {
    if (ocorrencias.length === 0) {
      return [
        { incidente: "Incêndio", ocorrencias: 0 },
        { incidente: "Alagamento", ocorrencias: 0 },
        { incidente: "Deslizamento", ocorrencias: 0 },
        { incidente: "Acidente Rodoviário", ocorrencias: 0 },
        { incidente: "Queda de Árvore", ocorrencias: 0 },
        { incidente: "Tempestade", ocorrencias: 0 },
      ];
    }
    const contador: { [key: string]: number } = {};
    ocorrencias.forEach((ocorrencia) => {
      ocorrencia.roles.forEach((role) => {
        const tipo = traduzirTipoOcorrencia(role);
        contador[tipo] = (contador[tipo] || 0) + 1;
      });
    });
    return Object.entries(contador)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([incidente, ocorrencias]) => ({ incidente, ocorrencias }));
  };

  const processarDadosStatus = () => {
    if (ocorrencias.length === 0) {
      return [
        { status: "Pendente", quantidade: 0 },
        { status: "Em Andamento", quantidade: 0 },
        { status: "Finalizada", quantidade: 0 },
      ];
    }
    const contador: { [key: string]: number } = {
      PENDENTE: 0,
      EM_ANDAMENTO: 0,
      FINALIZADA: 0,
    };
    ocorrencias.forEach((ocorrencia) => {
      contador[ocorrencia.status] = (contador[ocorrencia.status] || 0) + 1;
    });
    return Object.entries(contador).map(([status, quantidade]) => ({
      status: traduzirStatus(status),
      quantidade,
    }));
  };

  const traduzirTipoOcorrencia = (tipo: string) => {
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

  const traduzirStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      PENDENTE: "Pendente",
      EM_ANDAMENTO: "Em Andamento",
      FINALIZADA: "Finalizada",
    };
    return statusMap[status] || status;
  };

  useEffect(() => {
    const adminStatus = verificarSeUsuarioEhAdmin();
    setIsAdmin(adminStatus);
    fetchOcorrencias();
  }, []);

  const dadosArea = processarDadosArea();
  const dadosMensais = processarDadosMensais();
  const dadosTipos = processarDadosTipos();
  const dadosStatus = processarDadosStatus();

  const totalOcorrencias = ocorrencias.length;
  const totalVitimas = ocorrencias.reduce(
    (total, oc) => total + (oc.numeroVitimas || 0),
    0
  );
  const ocorrenciasUrbanas = ocorrencias.filter(
    (oc) => oc.regiao === "Urbana"
  ).length;
  const ocorrenciasRurais = ocorrencias.filter(
    (oc) => oc.regiao === "Rural"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
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
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="ml-14 -mt-1.5 lg:mt-0 lg:ml-0 pt-6 pb-2 px-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Dashboard
          </h1>
          <nav className="border-b border-zinc-200 pt-3 flex gap-4 px-4 text-gray-500 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <NavLink
              to="/home"
              className="font-medium text-sm py-2 px-1 text-gray-900 border-b-2 border-red-600 whitespace-nowrap flex-shrink-0"
            >
              Início
            </NavLink>
            <NavLink
              to="/new-occurrence"
              className="font-medium text-sm py-2 px-1 hover:text-red-600 whitespace-nowrap flex-shrink-0"
            >
              Registrar ocorrência
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/registeruser"
                className="font-medium text-sm py-2 px-1 hover:text-red-600 whitespace-nowrap flex-shrink-0"
              >
                Registrar Usuário
              </NavLink>
            )}
            <NavLink
              to="/list"
              className="font-medium text-sm py-2 px-1 hover:text-red-600 whitespace-nowrap flex-shrink-0"
            >
              Lista de ocorrências
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/list-users"
                className="font-medium text-sm py-2 px-1 text-red-600 whitespace-nowrap flex-shrink-0"
              >
                Admin
              </NavLink>
            )}
          </nav>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-3 sm:px-4 py-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total de Ocorrências
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalOcorrencias}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg font-bold">📊</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Ocorrências Urbanas
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {ocorrenciasUrbanas}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg font-bold">🏙️</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Ocorrências Rurais
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {ocorrenciasRurais}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg font-bold">🌳</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total de Vítimas
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {totalVitimas}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg font-bold">👥</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 px-3 sm:px-4 py-4 w-full">
          {/* Área */}
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg sm:text-xl mt-4 mb-2">
                Distribuição por Área
              </CardTitle>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {dadosArea.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full max-w-[250px] sm:max-w-[300px]">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={dadosArea}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                    >
                      {dadosArea.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<PieCustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="-mt-12 sm:-mt-16 text-lg sm:text-xl font-bold text-gray-700">
                {dadosArea.length > 0 && dadosArea[0].value > 0
                  ? `${Math.round(
                      (dadosArea[0].value / totalOcorrencias) * 100
                    )}%`
                  : "0%"}
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Ocorrências Mensais
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-500">
                Evolução do número de ocorrências no ano
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dadosMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<LineCustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="ocorrencias"
                    stroke="#E10643"
                    strokeWidth={3}
                    dot={{ fill: "#E10643", strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: "#E10643" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Tipos de Ocorrência
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-500">
                Distribuição por tipo de incidente
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dadosTipos} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="incidente"
                    width={90}
                    tick={{ fontSize: 9 }}
                  />
                  <Tooltip content={<BarCustomTooltip />} />
                  <Bar
                    dataKey="ocorrencias"
                    fill="#E10643"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl mb-2 mt-4">
                Distribuição por Status
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-500">
                Situação atual das ocorrências
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {dadosStatus.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 text-sm sm:text-base"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === "Pendente"
                            ? "bg-yellow-500"
                            : item.status === "Em Andamento"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      />
                      <span className="font-medium text-gray-800">
                        {item.status}
                      </span>
                    </div>
                    <span className="font-bold text-gray-600">
                      {item.quantidade}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
