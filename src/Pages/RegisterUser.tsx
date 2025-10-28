import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Input } from "../Components/Input";
import { useForm } from "react-hook-form";
import { Select } from "../Components/Select";

interface RegisterUserData {
  name: string;
  cpf: string;
  email: string;
  codeAcesso: string;
  function: string; // ⚠️ CUIDADO: "function" é palavra reservada!
}

export function RegisterUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserData>();

  const Functions = [
    { value: "Bombeiro", label: "Bombeiro" },
    { value: "ADMIN", label: "ADMIN" },
  ];

  const onSubmit = (data: RegisterUserData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="ml-12 -mt-1.5 lg:ml-0 lg:mt-0 pt-6 pb-2 px-4 md:px-6 text-2xl md:text-4xl font-bold text-gray-800">
            Registrar Usuário
          </h1>
          <nav className="border-b border-zinc-200 pt-3 flex space-x-4 md:space-x-6 px-4 md:px-6 text-gray-500 overflow-x-auto">
            <NavLink
              to="/home"
              className="font-medium text-sm md:text-base py-3 text-gray-900 border-b-2 hover:text-red-600 whitespace-nowrap"
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
              className="font-medium text-sm md:text-base py-3 border-b border-red-600 whitespace-nowrap"
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-sm md:text-base py-3 hover:text-red-600 whitespace-nowrap"
            >
              Lista de ocorrências
            </NavLink>
            <NavLink
              to="#"
              className="font-medium text-sm md:text-base text-red-600 py-3 whitespace-nowrap"
            >
              Admin
            </NavLink>
          </nav>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[400px] md:min-h-[500px] mt-4 flex justify-center px-2 md:px-4"
          >
            <div className="w-full mt-4 md:mt-8 lg:bg-white lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8 max-w-2xl lg:max-w-4xl lg:shadow-lg">
              <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Dados
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
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

              {/* ✅ SELECT PARA FUNÇÃO ADICIONADO AQUI */}
              <div className="mt-4 md:mt-6 lg:mt-10">
                <Select
                  title="Função"
                  inputClassName="rounded-2xl"
                  placeholder="Selecione a função"
                  options={Functions}
                  {...register("function", {
                    required: "Função é obrigatória",
                    validate: {
                      required: (value) =>
                        value !== "" || "Selecione uma função",
                    },
                  })}
                  error={errors.function?.message}
                />
              </div>

              <div className="flex justify-center md:justify-end mt-4 md:mt-6 lg:mt-10">
                <button
                  type="submit"
                  className="bg-primary text-white rounded-xl w-full md:w-[130px] lg:w-[150px] h-10 transition-transform hover:scale-[1.02] text-sm md:text-base"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
