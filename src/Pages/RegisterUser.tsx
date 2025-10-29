import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Input } from "../Components/Input";
import { useForm } from "react-hook-form";
import { Select } from "../Components/Select";
import axios from "axios";
import { useState } from "react";

interface RegisterUserData {
  name: string;
  email: string;
  codeAcesso: string;
  function: string;
}

export function RegisterUser() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterUserData>();

  const Functions = [
    { value: "BOMBEIRO", label: "Bombeiro" },
    { value: "ADMIN", label: "ADMIN" },
  ];

  const onSubmit = async (data: RegisterUserData) => {
    try {
      setLoading(true);

      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        alert("Token não encontrado. Faça login novamente.");
        return;
      }

      let token = storedToken.replace(/^"|"$/g, "").trim();
      if (token.startsWith("Bearer ")) {
        token = token.slice(7);
      }
      const payload = {
        nome: data.name,
        email: data.email,
        senha: data.codeAcesso,
        roles: [data.function],
      };

      console.log("Enviando payload:", payload);

      const API_BASE_URL = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${API_BASE_URL}/usuarios`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Usuário cadastrado com sucesso:", response.data);
      alert("Usuário cadastrado com sucesso!");
      reset();
    } catch (error: any) {
      console.error("Erro detalhado:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);

        if (error.response.status === 401 || error.response.status === 403) {
          alert("Sessão expirada ou sem permissão. Faça login novamente.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else if (error.response.status === 400) {
          if (error.response.data?.message?.includes("Email")) {
            alert("Erro: Este email já está em uso.");
          } else {
            alert(
              "Dados inválidos: " +
                (error.response.data?.message || "Verifique os campos")
            );
          }
        } else if (error.response.status === 409) {
          alert("Erro: Este email já está cadastrado no sistema.");
        } else {
          alert(
            "Erro ao cadastrar usuário: " +
              (error.response.data?.message || error.response.statusText)
          );
        }
      } else if (error.request) {
        alert("Erro de conexão: Não foi possível contactar o servidor.");
      } else {
        alert("Erro: " + error.message);
      }
    } finally {
      setLoading(false);
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
          className="w-full min-h-[400px] md:min-h-[500px] mt-4 flex justify-center px-2 md:px-4"
        >
          <div className="w-full mt-4 md:mt-8 lg:bg-white lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8 max-w-2xl lg:max-w-4xl lg:shadow-lg">
            <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Dados do Usuário
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6">
              <div className="pb-3 md:pb-0">
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

              <div className="pb-3 md:pb-0">
                <Input
                  title="Email de acesso"
                  inputClassName="rounded-2xl"
                  placeholder="Digite o email"
                  type="email"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
              <div className="pb-3 md:pb-0">
                <Input
                  title="Código de Acesso"
                  inputClassName="rounded-2xl"
                  placeholder="Digite o código de acesso"
                  type="password"
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

              <div className="pb-3 md:pb-0">
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
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6 lg:mt-10">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white rounded-xl w-full md:w-[130px] lg:w-[150px] h-10 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {loading ? "Registrando..." : "Registrar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
