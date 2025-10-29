import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { Input } from "../Components/Input";
import { Whitelogo } from "../Components/WhiteLogo";
import { authService } from "../Service/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface LoginForm {
  email: string;
  senha: string;
}

interface TokenPayload {
  sub: string;
  role?: string | string[];
  roles?: string | string[];
  nome?: string;
  email?: string;
}

interface LoginRequest {
  email: string;
  senha: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");

    try {
      const credentials: LoginRequest = {
        email: data.email.trim().toLowerCase(),
        senha: data.senha,
      };

      const response = await authService.login(credentials);
      const token = response.token;
      const decoded: TokenPayload = jwtDecode(token);
      let roleValue =
        (Array.isArray(decoded.role) ? decoded.role[0] : decoded.role) ||
        (Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles) ||
        "";

      if (roleValue.startsWith("ROLE_")) {
        roleValue = roleValue.replace("ROLE_", "");
      }

      const usuarioCompleto = {
        ...response.usuario,
        id: decoded.sub || response.usuario.id.toString(),
        nome: decoded.nome || response.usuario.nome,
        roles: Array.isArray(decoded.roles) ? decoded.roles : [roleValue],
      };

      localStorage.setItem("token", token);
      localStorage.setItem("role", roleValue);
      localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));

      navigate("/home");
    } catch (err: any) {
      console.error("❌ Erro no login:", err);
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="bg-primary hidden lg:flex items-center justify-center flex-1">
        <Whitelogo />
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-3xl md:text-4xl mb-8">Login</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-medium text-zinc-800">
                Email
              </label>
              <Input
                placeholder="Email"
                className="w-full"
                inputClassName="pl-2"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um email válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="senha" className="font-medium text-zinc-800">
                Código de Acesso
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Código de Acesso"
                icon={
                  showPassword ? MdOutlineVisibilityOff : MdOutlineRemoveRedEye
                }
                onIconClick={togglePasswordVisibility}
                iconClassName="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 w-6 h-6 cursor-pointer hover:text-zinc-700"
                className="w-full"
                inputClassName="pl-2 pr-10"
                {...register("senha", {
                  required: "O Código é obrigatório",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              {errors.senha && (
                <span className="text-red-500 text-sm">
                  {errors.senha.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white rounded mt-4 font-medium disabled:bg-primary/70 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Acessar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
