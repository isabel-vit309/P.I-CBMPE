import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from 'react-router-dom';

// Define the form interface for TypeScript
interface StepTwoForm {
  caseDescription: string;
  resourcesUsed: string;
  victimsNumber: string;
  occurrenceAddress: string;
  finalSituation: string;
}

export function StepTwo() {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<StepTwoForm>();

  const onSubmit = (data: StepTwoForm) => {
    console.log("Step Two data:", data);
    navigate('/stepthree');
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
          <h1 className="font-bold font-roboto pl-10 pt-10 text-3xl">Dados Complementares</h1>
          
          <div className="flex flex-col-2">
            <div className="mt-4 ml-10">
              <label htmlFor="caseDescription" className="flex flex-col font-semibold">
                Descrição do caso
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Descreva o caso"
                {...register("caseDescription", { 
                  required: "Descrição do caso é obrigatória",
                  minLength: {
                    value: 10,
                    message: "Descrição deve ter pelo menos 10 caracteres"
                  },
                  maxLength: {
                    value: 500,
                    message: "Descrição não pode ter mais de 500 caracteres"
                  }
                })}
              />
              {errors.caseDescription && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.caseDescription.message}
                </span>
              )}
            </div>
            
            <div className="mt-4 ml-10">
              <label htmlFor="resourcesUsed" className="flex flex-col font-semibold">
                Recursos utilizados
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Recursos utilizados"
                {...register("resourcesUsed", { 
                  required: "Recursos utilizados é obrigatório"
                })}
              />
              {errors.resourcesUsed && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.resourcesUsed.message}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col-2">
            <div className="mt-4 ml-10">
              <label htmlFor="victimsNumber" className="flex flex-col font-semibold">
                Número de vítimas*
              </label>
              <input 
                type="number" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Número de vítimas"
                min="0"
                max="100"
                {...register("victimsNumber", { 
                  required: "Número de vítimas é obrigatório",
                  min: {
                    value: 0,
                    message: "Número de vítimas não pode ser negativo"
                  },
                  max: {
                    value: 100,
                    message: "Número de vítimas não pode ser maior que 100"
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Apenas números são permitidos"
                  }
                })}
              />
              {errors.victimsNumber && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.victimsNumber.message}
                </span>
              )}
            </div>
            
            <div className="mt-4 ml-10">
              <label htmlFor="occurrenceAddress" className="flex flex-col font-semibold">
                Endereço da ocorrência
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Endereço completo"
                {...register("occurrenceAddress", { 
                  required: "Endereço da ocorrência é obrigatório",
                  minLength: {
                    value: 5,
                    message: "Endereço deve ter pelo menos 5 caracteres"
                  }
                })}
              />
              {errors.occurrenceAddress && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.occurrenceAddress.message}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 ml-10">
            <label htmlFor="finalSituation" className="flex flex-col font-semibold">
              Situação final*
            </label>
            <input 
              type="text" 
              className="border border-zinc-300 w-[1275px] h-10 rounded-xl pl-3 mt-2"
              placeholder="Descreva a situação final"
              {...register("finalSituation", { 
                required: "Situação final é obrigatória",
                minLength: {
                  value: 10,
                  message: "Situação final deve ter pelo menos 10 caracteres"
                },
                maxLength: {
                  value: 300,
                  message: "Situação final não pode ter mais de 300 caracteres"
                }
              })}
            />
            {errors.finalSituation && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.finalSituation.message}
              </span>
            )}
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