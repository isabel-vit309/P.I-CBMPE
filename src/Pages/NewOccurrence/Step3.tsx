// src/pages/StepThree.tsx

import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from 'react-router-dom';
import { useFormContext } from "../../Context/ContextRevisao";

interface StepThreeForm {
  name: string;
  identificationCode: string;
  cpf: string;
  phone: string;
}

export function StepThree() {
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormContext();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<StepThreeForm>();

  useEffect(() => {
    if (formData.step3) {
      reset(formData.step3);
    }
  }, [formData.step3, reset]); 

  const onSubmit = (data: StepThreeForm) => {
    updateFormData('step3', data);
    navigate('/stepfour');
  };

  const handleBack = () => {
    navigate('/steptwo');
  };

  // 🔹 Tornamos o input flexível e fluido em todas as telas
  const inputWidthClass =
    "w-full sm:w-full md:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] 2xl:max-w-[620px]";

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
            p-4 sm:p-6 xl:p-8 2xl:p-10
            max-w-full sm:max-w-[calc(100vw-60px)]
            xl:max-w-[calc(100vw-400px)] 2xl:max-w-[1391px]
            transition-all duration-200 ease-in-out
          "
        >
          <h1 className="font-bold font-roboto text-2xl md:text-3xl mb-6">
            Identificação
          </h1>

          {/* GRUPO 1 */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-x-10">
            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">Nome</label>
              <input
                type="text"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                placeholder="Digite seu nome completo"
                {...register("name", {
                  required: "Nome é obrigatório",
                  minLength: { value: 2, message: "Nome deve ter pelo menos 2 caracteres" },
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">Código de identificação*</label>
              <input
                type="text"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                placeholder="Digite seu código"
                {...register("identificationCode", {
                  required: "Código de identificação é obrigatório",
                  minLength: { value: 3, message: "Código deve ter pelo menos 3 caracteres" },
                })}
              />
              {errors.identificationCode && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.identificationCode.message}
                </span>
              )}
            </div>
          </div>

          {/* GRUPO 2 */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-x-10">
            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">CPF</label>
              <input
                type="text"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                placeholder="000.000.000-00"
                {...register("cpf", {
                  required: "CPF é obrigatório",
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: "Digite um CPF válido (000.000.000-00)",
                  },
                })}
              />
              {errors.cpf && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.cpf.message}
                </span>
              )}
            </div>

            <div className="mt-4 flex-1 min-w-[250px]">
              <label className="font-semibold">Telefone</label>
              <input
                type="tel"
                className={`border border-zinc-300 h-10 rounded-xl pl-3 mt-2 ${inputWidthClass}`}
                placeholder="(81) 98844-3569 ou 81988443569"
                {...register("phone", {
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /^(\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
                    message: "Digite um telefone válido (Ex: (81) 98844-3569 ou 81988443569)",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col xl:flex-row justify-between mt-10 gap-4 xl:gap-0">
            <button
              type="button"
              onClick={handleBack}
              className="
                bg-gray-500 text-white rounded-xl
                w-full max-w-xs xl:w-[150px] h-10
                transition-transform hover:scale-[1.02]
              "
            >
              Voltar
            </button>

            <button
              type="submit"
              className="
                bg-primary text-white rounded-xl
                w-full max-w-xs xl:w-[150px] h-10
                transition-transform hover:scale-[1.02]
              "
            >
              Continuar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
