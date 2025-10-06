import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from 'react-router-dom';

// Define the form interface for TypeScript
interface StepOneForm {
  occurrenceType: string;
  responsibleVehicle: string;
  dateTime: string;
  groupings: string;
  locationType: string;
}

export function StepOne() {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<StepOneForm>();

  const onSubmit = (data: StepOneForm) => {
    console.log("Form data:", data);
    navigate('/steptwo');
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
          <h1 className="font-bold font-roboto pl-10 pt-10 text-3xl">Dados Principais</h1>
          
          <div className="flex flex-col-2">
            <div className="mt-4 ml-10">
              <label htmlFor="occurrenceType" className="flex flex-col font-semibold">
                Tipo de Ocorrência
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Tipo de Ocorrência"
                {...register("occurrenceType", { 
                  required: "Tipo de ocorrência é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Tipo de ocorrência deve ter pelo menos 2 caracteres"
                  }
                })}
              />
              {errors.occurrenceType && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.occurrenceType.message}
                </span>
              )}
            </div>
            
            <div className="mt-4 ml-10">
              <label htmlFor="responsibleVehicle" className="flex flex-col font-semibold">
                Viatura Responsável
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Código da Viatura"
                {...register("responsibleVehicle", { 
                  required: "Viatura responsável é obrigatória",
                  pattern: {
                    value: /^[A-Z0-9-]+$/,
                    message: "Código deve conter apenas letras maiúsculas, números e hífens"
                  }
                })}
              />
              {errors.responsibleVehicle && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.responsibleVehicle.message}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col-2">
            <div className="mt-4 ml-10">
              <label htmlFor="date" className="flex flex-col font-semibold">
                Data 
              </label>
              <input 
                type="date-local" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                {...register("dateTime", { 
                  required: "Data é obrigatória",
                  validate: {
                    futureDate: (value) => {
                      const selectedDate = new Date(value);
                      const now = new Date();
                      return selectedDate <= now || "Data não pode ser futura";
                    }
                  }
                })}
              />
              {errors.dateTime && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.dateTime.message}
                </span>
              )}
            </div>
            
            <div className="mt-4 ml-10">
              <label htmlFor="groupings" className="flex flex-col font-semibold">
                Grupamentos
              </label>
              <input 
                type="text" 
                className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                placeholder="Grupamentos"
                {...register("groupings", { 
                  required: "Grupamentos são obrigatórios"
                })}
              />
              {errors.groupings && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.groupings.message}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 ml-10">
            <label htmlFor="locationType" className="flex flex-col font-semibold">
              Tipo de Local
            </label>
            <input 
              type="text" 
              className="border border-zinc-300 w-[1275px] h-10 rounded-xl pl-3 mt-2"
              placeholder="Ex. San Francisco, CA"
              {...register("locationType", { 
                required: "Tipo de local é obrigatório",
                minLength: {
                  value: 3,
                  message: "Tipo de local deve ter pelo menos 3 caracteres"
                }
              })}
            />
            {errors.locationType && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.locationType.message}
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