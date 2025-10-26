import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Input } from "../Components/Input";
import { useForm } from "react-hook-form";

interface RegisterUserData {
  name: string;
  cpf: string;
  email: string;
  codeAcesso: string;
  function: string;
}

export function RegisterUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserData>();

  const onSubmit = (data: RegisterUserData) => {
    console.log(data);
  };

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
              className="font-medium text-base py-3 text-gray-900 border-b-2 hover:text-red-600"
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
              className="font-medium text-base py-3 border-b border-red-600"
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[500px] 2xl:h-[800px] 2xl:mt-8 flex justify-center"
          >
            <div className="w-full mt-8 shadow-lg bg-white rounded-3xl p-6 xl:p-8 2xl:p-10 max-w-[calc(100vw-360px)] xl:max-w-[calc(100vw-500px)] 2xl:max-w-[1391px]">
              <h1 className="font-semibold font-roboto text-3xl ml-4">Dados</h1>
              <div className="grid grid-cols-2 md:flex-row gap-6 mt-6">
                <Input
                  title="Nome Completo"
                  className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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
                  className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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

              <div className="grid grid-cols-2 md:flex-row gap-6 mt-8">
                <Input
                  title="Email de acesso"
                  className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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
                  className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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

              <div className="grid grid-cols-1 mt-10">
                <Input
                  title="Função"
                  className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                  placeholder="Digite a função"
                  {...register("function", {
                    required: "Função é obrigatória",
                    minLength: {
                      value: 2,
                      message: "Função deve ter pelo menos 2 caracteres",
                    },
                  })}
                  error={errors.function?.message}
                />
              </div>

              <div className="flex justify-center xl:justify-end mt-10">
                <button
                  type="submit"
                  className="bg-primary text-white rounded-xl w-full ml-auto max-w-xs xl:w-[150px] h-10 transition-transform hover:scale-[1.02]"
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
