import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Input } from '../Components/Input';
import whitelogo from '../Icons/white-logo.svg';
import { NavLink } from 'react-router-dom';

interface RegisterForm {
  FirstName: string;
  LastName: string;
  email: string;
  codigo: string;
}

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  
  const onSubmit = (data: RegisterForm) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - apenas em desktop */}
      <div className="bg-primary hidden lg:flex items-center justify-center flex-1">
        <img src={whitelogo} alt="Logo" />
      </div>

      {/* Lado direito - conteúdo principal */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className='font-bold text-3xl md:text-4xl mb-8'>Cadastre-se</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
            {/* Nome e Sobrenome */}
            <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
              <div className="flex flex-col space-y-2 flex-1">
                <label htmlFor="FirstName" className="font-medium text-zinc-800">Primeiro Nome</label>
                <Input
                  placeholder="Primeiro Nome"
                  className="w-full"
                  inputClassName='pl-2'
                  {...register("FirstName", {
                    required: "O primeiro nome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "O nome deve ter pelo menos 2 caracteres"
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s]+$/,
                      message: "O nome deve conter apenas letras"
                    }
                  })}
                />
                {errors.FirstName && (
                  <span className="text-red-500 text-sm">{errors.FirstName.message}</span>
                )}
              </div>

              <div className="flex flex-col space-y-2 flex-1">
                <label htmlFor="LastName" className="font-medium text-zinc-800">Último Nome</label>
                <Input
                  placeholder="Último Nome"
                  className="w-full"
                  inputClassName='pl-2'
                  {...register("LastName", {
                    required: "O último nome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "O sobrenome deve ter pelo menos 2 caracteres"
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s]+$/,
                      message: "O sobrenome deve conter apenas letras"
                    }
                  })}
                />
                {errors.LastName && (
                  <span className="text-red-500 text-sm">{errors.LastName.message}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-medium text-zinc-800">Email</label>
              <Input
                placeholder="Email"
                className="w-full"
                inputClassName='pl-2'
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Digite um email válido"
                  }
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Código de Acesso */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="codigo" className="font-medium text-zinc-800">Código de Acesso</label>
              <Input
                type="password"
                placeholder="Código de Acesso"
                icon={MdOutlineRemoveRedEye}
                iconClassName="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 w-6 h-6"
                className="w-full"
                inputClassName='pl-2'
                {...register("codigo", {
                  required: "O código de acesso é obrigatório",
                  minLength: {
                    value: 6,
                    message: "O código deve ter pelo menos 6 caracteres"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message: "Deve conter letras maiúsculas, minúsculas e números"
                  }
                })}
              />
              {errors.codigo && (
                <span className="text-red-500 text-sm">{errors.codigo.message}</span>
              )}
            </div>

            <button type='submit' className='w-full h-12 bg-primary text-white rounded mt-4'>
              Criar Conta
            </button>
          </form>

          <div className='border-b border-zinc-200 mt-10'/>
          <p className="mt-8 text-center">
            Já tem uma conta?
            <NavLink className="font-bold pl-1" to='/'>Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}