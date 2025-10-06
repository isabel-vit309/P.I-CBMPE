import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from 'react-router-dom';

// Define the form interface for TypeScript
interface StepThreeForm {
  name: string;
  identificationCode: string;
  cpf: string;
  phone: string;
}

export function StepThree() {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<StepThreeForm>();

  const onSubmit = (data: StepThreeForm) => {
    console.log("Step Three data:", data);
    navigate('/stepfour');
  };

  return (
    <div className="min-h-screen grid grid-cols-register ml-4 gap-6">
      <div className="bg-primary h-[880px] w-[348px] mt-20 rounded-lg">
        <Whitelogo className="w-32 h-32 ml-28" />
        <div className="border-b border-white -m-5" />
        <div className="mt-20">
          <RegisterField 
            stepNumber={1} 
            title="Dados principais" 
            description="Informações essenciais sobre a ocorrência." 
          />
          <RegisterField 
            stepNumber={2} 
            title="Dados Complementares" 
            description="Informações que vão ajudar a entender o caso em geral." 
          />
          <RegisterField 
            stepNumber={3} 
            title="Identificação" 
            description="Momento para registrarmos quem está passando as informações." 
          />
          <RegisterField 
            stepNumber={4} 
            title="Revisão" 
            description="Hora de olhar todas as informações e ter certeza que está tudo correto antes do envio." 
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center">
        <div className="w-[1391px] h-[704px] shadow-lg bg-white rounded-3xl">
          <h1 className="font-bold font-roboto pl-10 pt-10 text-3xl">Identificação</h1>
          
          <div className="flex flex-col-2">
            <div className="mt-4 ml-10">
              <label htmlFor="name" className="flex flex-col font-semibold">
                Nome
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Digite seu nome completo"
                {...register("name", { 
                  required: "Nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Nome deve ter pelo menos 2 caracteres"
                  }
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>
            
            <div className="mt-4 ml-10">
              <label htmlFor="identificationCode" className="flex flex-col font-semibold">
                Código de identificação*
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Digite seu código"
                {...register("identificationCode", { 
                  required: "Código de identificação é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Código deve ter pelo menos 3 caracteres"
                  }
                })}
              />
              {errors.identificationCode && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.identificationCode.message}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col-2">
            <div className="mt-4 ml-10">
              <label htmlFor="cpf" className="flex flex-col font-semibold">
                CPF
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="000.000.000-00"
                {...register("cpf", { 
                  required: "CPF é obrigatório",
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: "Digite um CPF válido (000.000.000-00)"
                  }
                })}
              />
              {errors.cpf && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.cpf.message}
                </span>
              )}
            </div>
            
            <div className="mt-4 ml-10">
              <label htmlFor="phone" className="flex flex-col font-semibold">
                Telefone
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="(00) 00000-0000"
                {...register("phone", { 
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /^\(\d{2}\) \d{5}-\d{4}$/,
                    message: "Digite um telefone válido (00) 00000-0000"
                  }
                })}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
          
          <div className="relative">
            <button 
              type="submit" 
              className="bg-primary w-[150px] h-10 text-white rounded-xl mt-10 absolute right-3 top-1/2 mr-16"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}