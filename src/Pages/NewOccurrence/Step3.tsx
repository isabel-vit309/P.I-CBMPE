import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/ContextRevisao";
import { Sidebar } from "../../Components/Sidebar";
import { NavLink } from "react-router-dom";
import { Input } from "../../Components/Input";

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
    reset,
  } = useForm<StepThreeForm>();

  useEffect(() => {
    if (formData.step3) {
      reset(formData.step3);
    }
  }, [formData.step3, reset]);

  const onSubmit = (data: StepThreeForm) => {
    updateFormData("step3", data);
    navigate("/stepfour");
  };

  const handleBack = () => {
    navigate("/steptwo");
  };

  return (
    <div className="min-h-screen grid grid-cols-sidebar">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="pt-6 pb-2 px-6 text-4xl font-bold text-gray-800">
            Registrar Ocorrência
          </h1>
          <nav className="border-b border-zinc-200 pt-3 flex space-x-6 px-6 text-gray-500">
            <NavLink
              to="/home"
              className="font-medium text-base py-3 text-gray-900 border-b-2 hover:text-red-600"
            >
              Início
            </NavLink>
            <NavLink
              to="/new-occurrence"
              className="font-medium text-base py-3 border-b border-red-600"
            >
              Registrar ocorrência
            </NavLink>
            <NavLink
              to="/registeruser"
              className="font-medium text-base py-3 hover:text-red-600 "
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-base py-3 hover:text-red-600"
            >
              Lista de ocorrências
            </NavLink>
            <NavLink to="#" className="font-medium text-red-600 py-3">
              Admin
            </NavLink>
          </nav>
          <div className="mt-9 flex items-center justify-center">
            <RegisterField stepNumber={1} status="active" />
            <div className="border-b border-2 border-black w-96" />
            <RegisterField stepNumber={2} status="active" />
            <div className="border-b border-2 border-black w-96" />
            <RegisterField stepNumber={3} status="active" />
            <div className="border-b border-2 border-black w-96" />
            <RegisterField stepNumber={4} status="inactive" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[500px] 2xl:h-[800px] mt-4 flex justify-center"
          >
            <div className="w-full max-h-[460px] mt-8 shadow-lg bg-white rounded-3xl p-6 xl:p-8 2xl:p-10 max-w-[calc(100vw-360px)] xl:max-w-[calc(100vw-500px)] 2xl:max-w-[1391px]">
              <h1 className="font-semibold font-roboto text-3xl ml-4">
                Identificação
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="mb-4">
                  <Input
                    title="Nome"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Digite seu nome completo"
                    {...register("name", {
                      required: "Nome é obrigatório",
                      minLength: {
                        value: 3,
                        message: "Nome deve ter pelo menos 3 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ\s]+$/,
                        message: "Nome deve conter apenas letras",
                      },
                    })}
                    error={errors.name?.message}
                  />
                </div>

                <div>
                  <Input
                    title="Código de Identificação"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Digite seu código de identificação"
                    {...register("identificationCode", {
                      required: "Código de identificação é obrigatório",
                      minLength: {
                        value: 3,
                        message: "Código deve ter pelo menos 3 caracteres",
                      },
                      pattern: {
                        value: /^[A-Z0-9-]+$/,
                        message:
                          "Código deve conter apenas letras maiúsculas, números e hífens",
                      },
                    })}
                    error={errors.identificationCode?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <Input
                    title="CPF"
                    placeholder="Digite seu CPF"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    {...register("cpf", {
                      required: "CPF é obrigatório",
                      pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        message: "CPF deve estar no formato 000.000.000-00",
                      },
                      minLength: {
                        value: 14,
                        message: "CPF deve ter 14 caracteres",
                      },
                      maxLength: {
                        value: 14,
                        message: "CPF deve ter 14 caracteres",
                      },
                    })}
                    error={errors.cpf?.message}
                  />
                </div>

                <div>
                  <Input
                    title="Telefone"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Digite seu telefone"
                    {...register("phone", {
                      required: "Telefone é obrigatório",
                    })}
                    error={errors.phone?.message}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white rounded-xl w-full max-w-xs xl:w-[150px] h-10 transition-transform hover:scale-[1.02]"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white rounded-xl w-full max-w-xs xl:w-[150px] h-10 transition-transform hover:scale-[1.02]"
                >
                  Continuar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
