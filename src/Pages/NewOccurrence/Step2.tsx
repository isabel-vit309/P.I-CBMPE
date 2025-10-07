import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from 'react-router-dom';
import { useFormContext } from "../../Context/ContextRevisao"; 
import { useEffect } from 'react'; 

interface StepTwoForm {
  caseDescription: string;
  resourcesUsed: string;
  victimsNumber: string;
  occurrenceAddress: string;
  finalSituation: string;
}

export function StepTwo() {
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormContext(); 
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<StepTwoForm>();

  useEffect(() => {
    if (formData.step2) {
      reset(formData.step2);
    }
  }, [formData.step2, reset]); 

  const onSubmit = (data: StepTwoForm) => {
    updateFormData('step2', data);
    navigate('/stepthree');
  };

  const handleBack = () => {
    navigate('/new-occurrence');
  };

  // Classes utilitárias para inputs (como no StepOne)
  const inputWidthClass = "w-full 2xl:w-[620px]";
  const fullWidthInputClass = "w-full 2xl:w-[1275px]";

  return (
    // Layout responsivo com prevenção de sobreposição
    <div className="min-h-screen flex flex-col items-center xl:grid xl:grid-cols-[minmax(280px,340px)_1fr] 2xl:grid-cols-register gap-6 px-4 py-8 xl:px-0 xl:ml-4">
      
      {/* SIDEBAR */}
      <div className="bg-primary h-auto 2xl:h-[880px] w-full xl:w-[340px] 2xl:w-[348px] mt-4 2xl:mt-20 rounded-lg hidden xl:block">
        <div className="flex justify-center pt-8">
          <Whitelogo className="w-32 h-32" />
        </div>
        <div className="border-b border-white mx-auto w-3/4 my-4" />
        <div className="mt-8 2xl:mt-20 px-4">
          <RegisterField stepNumber={1} title="Dados principais" description="Informações essenciais sobre a ocorrência." />
          <RegisterField stepNumber={2} title="Dados Complementares" description="Informações que vão ajudar a entender o caso em geral." />
          <RegisterField stepNumber={3} title="Identificação" description="Momento para registrarmos quem está passando as informações." />
          <RegisterField stepNumber={4} title="Revisão" description="Hora de olhar todas as informações e ter certeza que está tudo correto antes do envio." />
        </div>
      </div>

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-7xl xl:max-w-none flex justify-center">
        <div
          className="
            w-full h-auto shadow-lg bg-white rounded-3xl 
            p-6 xl:p-8 2xl:p-10 mx-auto 
            xl:max-w-[calc(100vw-400px)] 
            2xl:w-[1391px] 2xl:h-[704px]
          "
        >
          <h1 className="font-bold font-roboto text-2xl 2xl:text-3xl mb-6">Dados Complementares</h1>

          {/* GRUPO 1 */}
          <div className="flex flex-col xl:flex-row xl:space-x-10">
            <div className="mt-4 w-full xl:w-1/2">
              <label htmlFor="caseDescription" className="flex flex-col font-semibold">
                Descrição do caso
              </label>
              <input
                type="text"
                className={`border border-zinc-300 ${inputWidthClass} h-10 rounded-xl pl-3 mt-2`}
                placeholder="Descreva o caso"
                {...register("caseDescription", { 
                  required: "Descrição do caso é obrigatória",
                  minLength: { value: 10, message: "Descrição deve ter pelo menos 10 caracteres" },
                  maxLength: { value: 500, message: "Descrição não pode ter mais de 500 caracteres" }
                })}
              />
              {errors.caseDescription && (<span className="text-red-500 text-sm mt-1 block">{errors.caseDescription.message}</span>)}
            </div>

            <div className="mt-4 w-full xl:w-1/2">
              <label htmlFor="resourcesUsed" className="flex flex-col font-semibold">
                Recursos utilizados
              </label>
              <input
                type="text"
                className={`border border-zinc-300 ${inputWidthClass} h-10 rounded-xl pl-3 mt-2`}
                placeholder="Recursos utilizados"
                {...register("resourcesUsed", { required: "Recursos utilizados é obrigatório" })}
              />
              {errors.resourcesUsed && (<span className="text-red-500 text-sm mt-1 block">{errors.resourcesUsed.message}</span>)}
            </div>
          </div>

          {/* GRUPO 2 */}
          <div className="flex flex-col xl:flex-row xl:space-x-10">
            <div className="mt-4 w-full xl:w-1/2">
              <label htmlFor="victimsNumber" className="flex flex-col font-semibold">
                Número de vítimas*
              </label>
              <input
                type="number"
                className={`border border-zinc-300 ${inputWidthClass} h-10 rounded-xl pl-3 mt-2`}
                placeholder="Número de vítimas"
                min="0"
                max="100"
                {...register("victimsNumber", { 
                  required: "Número de vítimas é obrigatório",
                  min: { value: 0, message: "Número de vítimas não pode ser negativo" },
                  max: { value: 100, message: "Número de vítimas não pode ser maior que 100" },
                  pattern: { value: /^[0-9]+$/, message: "Apenas números são permitidos" }
                })}
              />
              {errors.victimsNumber && (<span className="text-red-500 text-sm mt-1 block">{errors.victimsNumber.message}</span>)}
            </div>

            <div className="mt-4 w-full xl:w-1/2">
              <label htmlFor="occurrenceAddress" className="flex flex-col font-semibold">
                Endereço da ocorrência
              </label>
              <input
                type="text"
                className={`border border-zinc-300 ${inputWidthClass} h-10 rounded-xl pl-3 mt-2`}
                placeholder="Endereço completo"
                {...register("occurrenceAddress", { 
                  required: "Endereço da ocorrência é obrigatório",
                  minLength: { value: 5, message: "Endereço deve ter pelo menos 5 caracteres" }
                })}
              />
              {errors.occurrenceAddress && (<span className="text-red-500 text-sm mt-1 block">{errors.occurrenceAddress.message}</span>)}
            </div>
          </div>

          {/* INPUT LARGO */}
          <div className="mt-4 w-full">
            <label htmlFor="finalSituation" className="flex flex-col font-semibold">
              Situação final*
            </label>
            <input
              type="text"
              className={`border border-zinc-300 ${fullWidthInputClass} h-10 rounded-xl pl-3 mt-2`}
              placeholder="Descreva a situação final"
              {...register("finalSituation", { 
                required: "Situação final é obrigatória",
                minLength: { value: 10, message: "Situação final deve ter pelo menos 10 caracteres" },
                maxLength: { value: 300, message: "Situação final não pode ter mais de 300 caracteres" }
              })}
            />
            {errors.finalSituation && (<span className="text-red-500 text-sm mt-1 block">{errors.finalSituation.message}</span>)}
          </div>

          {/* BOTÕES */}
          <div className="flex justify-between mt-10 2xl:mr-16">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 w-full max-w-xs xl:w-[150px] h-10 text-white rounded-xl hover:bg-gray-600 transition-colors"
            >
              Voltar
            </button>

            <button
              type="submit"
              className="bg-primary w-full max-w-xs xl:w-[150px] h-10 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
