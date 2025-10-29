import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Input } from "../Components/Input";
import { useForm } from "react-hook-form";
import { Select } from "../Components/Select";
import axios from "axios";

interface RegisterUserData {
  name: string;
  cpf: string;
  email: string;
  codeAcesso: string;
  function: string;
}

export function RegisterUser() {
  const role = localStorage.getItem("role");
  console.log("Role no localStorage:", role);

  if (!role || role.toUpperCase() !== "ADMIN") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold text-red-600">
          Você não tem permissão para acessar esta página.
        </h1>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserData>();

  const Functions = [
    { value: "Bombeiro", label: "Bombeiro" },
    { value: "ADMIN", label: "ADMIN" },
  ];

  const onSubmit = async (data: RegisterUserData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "usuarios",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log("Usuário cadastrado:", response.data);
      alert("Usuário cadastrado com sucesso!");
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert(
        "Erro ao cadastrar usuário: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-50 flex flex-col">
        <div className="p-0">
          <h1 className="ml-12 -mt-1.5 lg:mt-0 lg:ml-0 text-2xl md:text-4xl font-bold text-gray-800 px-4 md:px-6 pt-6 pb-2">
            Registrar Usuário
          </h1>

          <nav className="border-b border-zinc-200 pt-3 flex space-x-4 md:space-x-6 px-4 md:px-6 text-gray-500 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <NavLink
              to="/home"
              className="font-medium text-sm md:text-base py-2 text-gray-900 hover:text-red-600 whitespace-nowrap"
            >
              Início
            </NavLink>
            <NavLink
              to="/new-occurrence"
              className="font-medium text-sm md:text-base py-2 hover:text-red-600 whitespace-nowrap"
            >
              Registrar ocorrência
            </NavLink>
            <NavLink
              to="/registeruser"
              className="font-medium text-sm md:text-base py-2 border-b-2 border-red-600 text-red-600 whitespace-nowrap"
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-sm md:text-base py-2 hover:text-red-600 whitespace-nowrap"
            >
              Lista de ocorrências
            </NavLink>
            <NavLink
              to="#"
              className="font-medium text-sm md:text-base py-2 text-red-600 whitespace-nowrap"
            >
              Admin
            </NavLink>
          </nav>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center p-4 md:p-8 overflow-y-auto"
        >
          <div className="w-full bg-white lg:rounded-3xl p-4 md:p-6 lg:p-8 max-w-3xl md:shadow-none lg:shadow-lg">
            <h1 className="font-semibold font-roboto text-xl md:text-2xl lg:text-3xl">
              Dados
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
              <div className="pb-3 lg:pb-0">
                <Input
                  title="Nome Completo"
                  inputClassName="rounded-2xl"
                  placeholder="Nome Completo"
                  {...register("name", {
                    required: "Nome completo é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Nome deve ter pelo menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s]+$/,
                      message: "Nome deve conter apenas letras",
                    },
                  })}
                  error={errors.name?.message}
                />
              </div>

              <div className="pb-3 lg:pb-0">
                <Input
                  title="CPF"
                  inputClassName="rounded-2xl"
                  placeholder="Digite o CPF"
                  {...register("cpf", {
                    required: "CPF é obrigatório",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "CPF deve estar no formato 000.000.000-00",
                    },
                  })}
                  error={errors.cpf?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 pb-4">
              <div className="pb-3 lg:pb-0">
                <Input
                  title="Email de acesso"
                  inputClassName="rounded-2xl"
                  placeholder="Digite o email"
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email deve ser válido",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>

              <Input
                title="Código de Acesso"
                inputClassName="rounded-2xl"
                placeholder="Digite o código de acesso"
                {...register("codeAcesso", {
                  required: "Código de acesso é obrigatório",
                  minLength: {
                    value: 4,
                    message: "Código deve ter pelo menos 4 caracteres",
                  },
                })}
                error={errors.codeAcesso?.message}
              />
            </div>

            <div className="mt-4 md:mt-6">
              <Select
                title="Função"
                inputClassName="rounded-2xl"
                placeholder="Selecione a função"
                options={Functions}
                {...register("function", {
                  required: "Função é obrigatória",
                  validate: {
                    required: (value) => value !== "" || "Selecione uma função",
                  },
                })}
                error={errors.function?.message}
              />
            </div>

            <div className="flex justify-center md:justify-end mt-6">
              <button
                type="submit"
                className="bg-primary text-white rounded-xl w-full md:w-[150px] h-10 transition-transform hover:scale-[1.02] text-sm md:text-base"
              >
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
