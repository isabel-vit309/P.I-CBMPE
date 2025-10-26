import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { Input } from "../Components/Input";
import { Whitelogo } from "../Components/WhiteLogo";

interface LoginForm {
  email: string;
  codigo: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: LoginForm) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="min-h-screen flex">
      <div className="bg-primary hidden lg:flex items-center justify-center flex-1">
        <Whitelogo />
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-3xl md:text-4xl mb-8 ">Login</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="space-y-6">
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
                <label htmlFor="codigo" className="font-medium text-zinc-800">
                  Código de Acesso
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Código de Acesso"
                  icon={
                    showPassword
                      ? MdOutlineVisibilityOff
                      : MdOutlineRemoveRedEye
                  }
                  onIconClick={togglePasswordVisibility}
                  iconClassName="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 w-6 h-6 cursor-pointer hover:text-zinc-700"
                  className="w-full"
                  inputClassName="pl-2 pr-10"
                  {...register("codigo", {
                    required: "O código é obrigatório",
                    minLength: {
                      value: 6,
                      message: "O código deve ter pelo menos 6 caracteres",
                    },
                  })}
                />
                {errors.codigo && (
                  <span className="text-red-500 text-sm">
                    {errors.codigo.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-primary text-white rounded mt-4 font-medium"
              >
                Acessar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
