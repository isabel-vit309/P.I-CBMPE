import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Input } from '../Components/Input';
import { NavLink } from 'react-router-dom';
import { Whitelogo } from '../Components/WhiteLogo';

interface LoginForm {
  email: string;
  codigo: string;
}

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
  console.log("Dados enviados:", data);
};

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="bg-primary flex items-center justify-center">
        <Whitelogo/>
      </div>

      <div className="pt-[328px] px-20">
        <h1 className='font-bold text-4xl mb-8'>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="font-medium text-zinc-800">Email</label>
            <Input
              placeholder="Email"
              className="w-[580px]"
              inputClassName='pl-2'
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Digite um email válido"
                }
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="codigo" className="font-medium text-zinc-800">Código de Acesso</label>
            <Input
              type="password"
              placeholder="Código de Acesso"
              icon={MdOutlineRemoveRedEye}
              iconClassName="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 w-6 h-6"
              className="w-[580px]"
              inputClassName='pl-2'
              {...register("codigo", {
                required: "O código é obrigatório",
                minLength: {
                  value: 6,
                  message: "O código deve ter pelo menos 6 caracteres"
                }
              })}
            />
            {errors.codigo && (
              <span className="text-red-500 text-sm">{errors.codigo.message}</span>
            )}
          </div>

          <button type='submit' className='w-[580px] h-12 bg-primary text-white rounded mt-4'>
            Acessar
          </button>
        </form>

        <div className='border-b border-zinc-200 mt-10 w-[580px]'/>
        <p className="mt-14">
          Não tem uma conta?
          <NavLink className="font-bold pl-1" to='/register'>Criar Conta</NavLink>
        </p>
      </div>
    </div>
  );
}
