import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/ContextRevisao";
import { Sidebar } from "../../Components/Sidebar";
import { NavLink } from "react-router-dom";
import { Input } from "../../Components/Input";

// Interface para o formulário completo
interface CompleteForm {
  step1: {
    occurrenceType: string;
    responsibleVehicle: string;
    dateTime: string;
    groupings: string;
    locationType: string;
  };
  step2: {
    caseDescription: string;
    resourcesUsed: string;
    victimsNumber: string;
    occurrenceAddress: string;
    finalSituation: string;
  };
  step3: {
    name: string;
    identificationCode: string;
    cpf: string;
    phone: string;
  };
}

export function StepFour() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CompleteForm>({
    defaultValues: {
      step1: formData.step1 || {
        occurrenceType: "",
        responsibleVehicle: "",
        dateTime: "",
        groupings: "",
        locationType: "",
      },
      step2: formData.step2 || {
        caseDescription: "",
        resourcesUsed: "",
        victimsNumber: "",
        occurrenceAddress: "",
        finalSituation: "",
      },
      step3: formData.step3 || {
        name: "",
        identificationCode: "",
        cpf: "",
        phone: "",
      },
    },
  });

  // 1. Salvar automaticamente no localStorage quando os dados mudarem
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("step4_form_data", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // 2. Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedData = localStorage.getItem("step4_form_data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
    }
  }, [reset]);

  // 3. Atualizar o form quando os dados do contexto mudarem
  useEffect(() => {
    reset({
      step1: formData.step1 || {
        occurrenceType: "",
        responsibleVehicle: "",
        dateTime: "",
        groupings: "",
        locationType: "",
      },
      step2: formData.step2 || {
        caseDescription: "",
        resourcesUsed: "",
        victimsNumber: "",
        occurrenceAddress: "",
        finalSituation: "",
      },
      step3: formData.step3 || {
        name: "",
        identificationCode: "",
        cpf: "",
        phone: "",
      },
    });
  }, [formData, reset]);

  const onSubmit = (data: CompleteForm) => {
    // Atualizar todos os dados no contexto
    updateFormData("step1", data.step1);
    updateFormData("step2", data.step2);
    updateFormData("step3", data.step3);

    // Salvar também no localStorage
    localStorage.setItem("step4_form_data", JSON.stringify(data));
    localStorage.setItem("form_review_complete", JSON.stringify(data));

    console.log("Dados completos para envio:", data);
    alert("Dados confirmados! Prontos para envio.");
    navigate("/stepfive");
  };

  const handleBack = () => {
    navigate("/stepthree");
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
            <RegisterField stepNumber={4} status="active" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-4 flex justify-center"
          >
            <div className="w-full mb-10 max-w-[1391px] mt-8 shadow-lg bg-white rounded-3xl p-6 xl:p-8 2xl:p-10">
              <div className="mb-8 p-6 bg-white shadow-lg rounded-2xl borde">
                <h1 className="font-semibold font-roboto text-2xl mb-6">
                  Dados Principais
                </h1>

                <div className="space-y-10 pt-2">
                  <div>
                    <Input
                      title="Tipo de Ocorrência"
                      className="w-full border h-10 rounded-xl bg-white "
                      placeholder="Ex: Acidente, Incêndio"
                      {...register("step1.occurrenceType", {
                        required: "Tipo de ocorrência é obrigatório",
                        minLength: {
                          value: 2,
                          message:
                            "Tipo de ocorrência deve ter pelo menos 2 caracteres",
                        },
                      })}
                      error={errors.step1?.occurrenceType?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        title="Viatura Responsável"
                        className="w-full border  h-10 rounded-xl bg-white focus:ring-2"
                        placeholder="Digite o número da viatura"
                        {...register("step1.responsibleVehicle", {
                          required: "Viatura responsável é obrigatória",
                          pattern: {
                            value: /^[A-Z0-9-]+$/,
                            message:
                              "Código deve conter apenas letras maiúsculas, números e hífens",
                          },
                        })}
                        error={errors.step1?.responsibleVehicle?.message}
                      />
                    </div>
                    <div>
                      <Input
                        title="Data"
                        type="date"
                        placeholder="Data"
                        className="w-full border -300 h-10 rounded-xl bg-white  focus:ring-2"
                        {...register("step1.dateTime", {
                          required: "Data é obrigatória",
                        })}
                        error={errors.step1?.dateTime?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      title="Grupamentos"
                      className="w-full border -300 h-10 rounded-xl bg-white  focus:ring-2"
                      placeholder="Ex: 6ºBBM, 1ºGB"
                      {...register("step1.groupings", {
                        required: "Grupamentos são obrigatórios",
                      })}
                      error={errors.step1?.groupings?.message}
                    />
                  </div>

                  <div>
                    <Input
                      title="Tipo de Local"
                      className="w-full border -300 h-10 rounded-xl bg-white  focus:ring-2"
                      placeholder="Informe onde ocorreu o incidente"
                      {...register("step1.locationType", {
                        required: "Tipo de local é obrigatório",
                        minLength: {
                          value: 3,
                          message:
                            "Tipo de local deve ter pelo menos 3 caracteres",
                        },
                      })}
                      error={errors.step1?.locationType?.message}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-8 p-6 bg-white shadow-lg rounded-2xl ">
                <h1 className="font-semibold font-roboto text-2xl mb-6">
                  Dados Complementares
                </h1>

                <div className="space-y-10 pt-2">
                  <div>
                    <Input
                      title="Descrição do Caso"
                      className="w-full border  h-10 rounded-xl bg-white"
                      placeholder="Descreva o caso ocorrido"
                      {...register("step2.caseDescription", {
                        required: "Descrição do caso é obrigatória",
                        minLength: {
                          value: 10,
                          message:
                            "Descrição deve ter pelo menos 10 caracteres",
                        },
                      })}
                      error={errors.step2?.caseDescription?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        title="Recursos Utilizados"
                        className="w-full border  h-10 rounded-xl bg-white"
                        placeholder="Ex: Viaturas, Equipamentos"
                        {...register("step2.resourcesUsed", {
                          required: "Recursos utilizados são obrigatórios",
                        })}
                        error={errors.step2?.resourcesUsed?.message}
                      />
                    </div>
                    <div>
                      <Input
                        title="Número de Vítimas"
                        placeholder="Digite a quantidade de vítimas"
                        className="w-full border  h-10 rounded-xl bg-white"
                        type="number"
                        {...register("step2.victimsNumber", {
                          required: "Número de vítimas é obrigatório",
                          min: {
                            value: 0,
                            message: "Número de vítimas não pode ser negativo",
                          },
                        })}
                        error={errors.step2?.victimsNumber?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      title="Endereço de Ocorrência"
                      className="w-full border  h-10 rounded-xl bg-white"
                      placeholder="Ex: Rua, Avenida, Praça"
                      {...register("step2.occurrenceAddress", {
                        required: "Endereço de ocorrência é obrigatório",
                      })}
                      error={errors.step2?.occurrenceAddress?.message}
                    />
                  </div>

                  <div>
                    <Input
                      title="Situação Final"
                      className="w-full border  h-10 rounded-xl bg-white"
                      placeholder="Informe a situação final"
                      {...register("step2.finalSituation", {
                        required: "Situação final é obrigatória",
                      })}
                      error={errors.step2?.finalSituation?.message}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-white shadow-lg rounded-2xl border">
                <h1 className="font-semibold font-roboto text-2xl mb-6">
                  Identificação
                </h1>

                <div className="space-y-10 pt-2">
                  <div>
                    <Input
                      title="Nome"
                      className="w-full border  h-10 rounded-xl bg-white "
                      placeholder="Digite seu nome completo"
                      {...register("step3.name", {
                        required: "Nome é obrigatório",
                        minLength: {
                          value: 3,
                          message: "Nome deve ter pelo menos 3 caracteres",
                        },
                      })}
                      error={errors.step3?.name?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        title="CPF"
                        placeholder="Digite seu CPF"
                        className="w-full border  h-10 rounded-xl bg-white "
                        {...register("step3.cpf", {
                          required: "CPF é obrigatório",
                          pattern: {
                            value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                            message: "CPF deve estar no formato 000.000.000-00",
                          },
                        })}
                        error={errors.step3?.cpf?.message}
                      />
                    </div>
                    <div>
                      <Input
                        title="Código de Identificação"
                        className="w-full border  h-10 rounded-xl bg-white "
                        placeholder="Digite seu código de identificação"
                        {...register("step3.identificationCode", {
                          required: "Código de identificação é obrigatório",
                        })}
                        error={errors.step3?.identificationCode?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      title="Telefone"
                      className="w-full border  h-10 rounded-xl bg-white "
                      placeholder="Digite seu telefone"
                      {...register("step3.phone", {
                        required: "Telefone é obrigatório",
                      })}
                      error={errors.step3?.phone?.message}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-xl w-full max-w-xs xl:w-[150px] h-10 transition-all duration-200 hover:scale-[1.02] font-semibold"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white rounded-xl w-full max-w-xs xl:w-[150px] h-10 transition-all duration-200 hover:scale-[1.02] font-semibold"
                >
                  Finalizar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
