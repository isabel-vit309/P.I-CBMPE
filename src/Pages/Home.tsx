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

const data = [
  { name: "Urbana", value: 67 },
  { name: "Rural", value: 33 },
];

const COLORS = ["#E10643", "#FFA500"];

const lineData = [
  { mes: "Jan", ocorrencias: 45 },
  { mes: "Fev", ocorrencias: 52 },
  { mes: "Mar", ocorrencias: 68 },
  { mes: "Abr", ocorrencias: 79 },
  { mes: "Mai", ocorrencias: 86 },
  { mes: "Jun", ocorrencias: 94 },
  { mes: "Jul", ocorrencias: 112 },
  { mes: "Ago", ocorrencias: 98 },
  { mes: "Set", ocorrencias: 105 },
  { mes: "Out", ocorrencias: 120 },
  { mes: "Nov", ocorrencias: 135 },
  { mes: "Dez", ocorrencias: 128 },
];

const barData = [
  { incidente: "Incêndio Florestal", ocorrencias: 89 },
  { incidente: "Alagamento", ocorrencias: 67 },
  { incidente: "Deslizamento", ocorrencias: 54 },
  { incidente: "Acidente Rodoviário", ocorrencias: 42 },
  { incidente: "Queda de Árvore", ocorrencias: 38 },
  { incidente: "Tempestade", ocorrencias: 31 },
];

const bairrosData = [
  { bairro: "Vila Torres Galvão", probabilidade: 27.5 },
  { bairro: "Águas Compridas", probabilidade: 11.2 },
  { bairro: "Centro", probabilidade: 9.4 },
  { bairro: "Jardim Paulista", probabilidade: 8.0 },
  { bairro: "Rio Doce", probabilidade: 7.9 },
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
        <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}%`}</p>
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
        <p className="font-semibold">{`Incidente: ${label}`}</p>
        <p className="text-red-600">{`Ocorrências: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function Home() {
  return (
    <div className="min-h-screen grid grid-cols-sidebar">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="pt-6 pb-2 px-6 text-4xl font-bold text-gray-800">
            Registrar Usuário
          </h1>
          <nav className="border-b border-zinc-200 pt-3 flex space-x-6 px-6 text-gray-500">
            <NavLink
              to="/home"
              className="font-medium text-base py-3 text-gray-900  border-b border-red-600"
            >
              Início
            </NavLink>
            <NavLink
              to="/new-occurrence"
              className="font-medium text-base py-3 hover:text-red-600"
            >
              Registrar ocorrência
            </NavLink>
            <NavLink
              to="/registeruser"
              className="font-medium text-base py-3 border-b hover:text-red-600"
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-base py-3 hover:text-red-600"
            >
              Lista de ocorrências
            </NavLink>
            <NavLink to="#" className="font-medium text-red-600 py-3">
              Admin
            </NavLink>
          </nav>
        </div>

        <div className="grid grid-cols-2 gap-6 px-6 py-4 w-full">
          <Card className="h-[410px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl mt-4 mb-2">
                Taxa de danos
              </CardTitle>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#E10643]" />
                  <span className="text-sm font-medium">Urbana</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#FFA500]" />
                  <span className="text-sm font-medium">Rural</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center">
              <PieChart width={500} height={320}>
                <Pie
                  data={data}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={90}
                  outerRadius={160}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieCustomTooltip />} />
              </PieChart>

              <div className="-mt-24 text-2xl font-bold text-gray-700">67%</div>
            </CardContent>
          </Card>

          <Card className="h-[410px]">
            <CardHeader>
              <CardTitle className="text-2xl">Ocorrências Mensais</CardTitle>
              <p className="text-sm text-gray-500">
                Evolução do número de ocorrências no ano
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<LineCustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="ocorrencias"
                    stroke="#E10643"
                    strokeWidth={3}
                    dot={{ fill: "#E10643", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#E10643" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6 px-6 py-4 w-full">
          <Card className="h-[450px]">
            <CardHeader>
              <CardTitle className="text-2xl">Maiores Incidentes</CardTitle>
              <p className="text-sm text-gray-500">
                Tipos de incidentes com maior número de ocorrências
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="incidente"
                    width={150}
                    tick={{ fontSize: 12 }}
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

          <Card className="h-[450px]">
            <CardHeader>
              <CardTitle className="text-2xl mb-2 mt-4">
                Bairros com Mais Incidentes Registrados
              </CardTitle>
              <p className="text-sm text-gray-500">
                Áreas de maior risco na região
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bairrosData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0
                            ? "bg-red-500"
                            : index === 1
                            ? "bg-orange-500"
                            : index === 2
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="font-medium text-gray-800">
                        {item.bairro}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-red-600">
                        {item.probabilidade}%
                      </span>
                    </div>
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
