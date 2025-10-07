// src/pages/StepOne.tsx

import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from 'react-router-dom';
import { useFormContext } from "../../Context/ContextRevisao"; 

interface StepOneForm {
  occurrenceType: string;
  responsibleVehicle: string;
  dateTime: string;
  groupings: string;
  locationType: string;
}

export function StepOne() {
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormContext();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<StepOneForm>();

  useEffect(() => {
    if (formData.step1) {
      reset(formData.step1);
    }
  }, [formData.step1, reset]); 

  const onSubmit = (data: StepOneForm) => {
    updateFormData('step1', data);
    navigate('/steptwo');
  };

  const inputWidthClass =
    "w-full sm:max-w-full md:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] 2xl:max-w-[620px]";
  const fullWidthInputClass =
    "w-full sm:max-w-full xl:max-w-[1100px] 2xl:max-w-[1275px]";

  return (
    <div
      className="
        min-h-screen flex flex-col items-center
        xl:grid xl:grid-cols-[minmax(300px,340px)_minmax(0,1fr)]
        2xl:grid-cols-[348px_minmax(0,1fr)]
        gap-6 px-4 py-8 xl:px-8
        overflow-hidden
      "
    >
      {/* SIDEBAR */}
      <div
        className="
          bg-primary rounded-lg hidden xl:block
          w-full xl:w-[320px] 2xl:w-[348px]
          mt-4 2xl:mt-20
          min-h-[600px] 2xl:h-[880px]
          shrink-0
        "
      >
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center overflow-x-hidden"
      >
        <div
          className="
            w-full h-auto shadow-lg bg-white rounded-3xl
            p-6 xl:p-8 2xl:p-10
            max-w-[calc(100vw-360px)] xl:max-w-[calc(100vw-400px)] 2xl:max-w-[1391px]
            transition-all duration-200 ease-in-out
          "
        >
          <h1 className="font-bold font-roboto text-2xl md:text-3xl mb-6">
            Dados Principais
          </h1>

          {/* GRUPO 1 */}
          <div
            className="
              flex flex-col
              md:flex-row md:flex-wrap
              md:gap-x-10
            "
          >
            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">Tipo de Ocorrência</label>
              <input
                type="text"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                placeholder="Tipo de Ocorrência"
                {...register("occurrenceType", {
                  required: "Tipo de ocorrência é obrigatório",
                  minLength: { value: 2, message: "Tipo de ocorrência deve ter pelo menos 2 caracteres" },
                })}
              />
              {errors.occurrenceType && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.occurrenceType.message}
                </span>
              )}
            </div>

            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">Viatura Responsável</label>
              <input
                type="text"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                placeholder="Código da Viatura"
                {...register("responsibleVehicle", {
                  required: "Viatura responsável é obrigatória",
                  pattern: {
                    value: /^[A-Z0-9-]+$/,
                    message: "Código deve conter apenas letras maiúsculas, números e hífens",
                  },
                })}
              />
              {errors.responsibleVehicle && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.responsibleVehicle.message}
                </span>
              )}
            </div>
          </div>

          {/* GRUPO 2 */}
          <div
            className="
              flex flex-col
              md:flex-row md:flex-wrap
              md:gap-x-10
            "
          >
            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">Data</label>
              <input
                type="datetime-local"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                {...register("dateTime", {
                  required: "Data é obrigatória",
                  validate: {
                    futureDate: (value) => {
                      const selectedDate = new Date(value);
                      const now = new Date();
                      return selectedDate <= now || "Data não pode ser futura";
                    },
                  },
                })}
              />
              {errors.dateTime && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.dateTime.message}
                </span>
              )}
            </div>

            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">Grupamentos</label>
              <input
                type="text"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                placeholder="Grupamentos"
                {...register("groupings", { required: "Grupamentos são obrigatórios" })}
              />
              {errors.groupings && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.groupings.message}
                </span>
              )}
            </div>
          </div>

          {/* INPUT FULL WIDTH */}
          <div className="mt-4">
            <label className="font-semibold">Tipo de Local</label>
            <input
              type="text"
              className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${fullWidthInputClass}`}
              placeholder="Ex. San Francisco, CA"
              {...register("locationType", {
                required: "Tipo de local é obrigatório",
                minLength: { value: 3, message: "Tipo de local deve ter pelo menos 3 caracteres" },
              })}
            />
            {errors.locationType && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.locationType.message}
              </span>
            )}
          </div>

          {/* BOTÃO */}
          <div className="flex justify-center xl:justify-end mt-10">
            <button
              type="submit"
              className="
                bg-primary text-white rounded-xl
                w-full max-w-xs xl:w-[150px] h-10
                transition-transform hover:scale-[1.02]
              "
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
