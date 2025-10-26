import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/ContextRevisao";
import { Sidebar } from "../../Components/Sidebar";
import { NavLink } from "react-router-dom";
import { Input } from "../../Components/Input";

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

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("step4_form_data", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const savedData = localStorage.getItem("step4_form_data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
    }
  }, [reset]);

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
    updateFormData("step1", data.step1);
    updateFormData("step2", data.step2);
    updateFormData("step3", data.step3);

    localStorage.setItem("step4_form_data", JSON.stringify(data));
    localStorage.setItem("form_review_complete", JSON.stringify(data));

    console.log("Dados completos para envio:", data);
    navigate("/stepfive");
  };

  const handleBack = () => {
    navigate("/stepthree");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="ml-12 -mt-1.5 lg:ml-0 lg:mt-0 pt-6 pb-2 px-4 md:px-6 text-xl md:text-2xl lg:text-4xl font-bold text-gray-800">
            Registrar Ocorrência
          </h1>
          <nav className="border-b border-zinc-200 pt-3 flex space-x-3 md:space-x-4 lg:space-x-6 px-4 md:px-6 text-gray-500 overflow-x-auto">
            <NavLink
              to="/home"
              className="font-medium text-xs md:text-sm lg:text-base py-3 text-gray-900 border-b-2 hover:text-red-600 whitespace-nowrap"
            >
              Início
            </NavLink>
            <NavLink
              to="/new-occurrence"
              className="font-medium text-xs md:text-sm lg:text-base py-3 border-b border-red-600 whitespace-nowrap"
            >
              Registrar ocorrência
            </NavLink>
            <NavLink
              to="/registeruser"
              className="font-medium text-xs md:text-sm lg:text-base py-3 hover:text-red-600 whitespace-nowrap"
            >
              Registrar Usuário
            </NavLink>
            <NavLink
              to="/list"
              className="font-medium text-xs md:text-sm lg:text-base py-3 hover:text-red-600 whitespace-nowrap"
            >
              Lista de ocorrências
            </NavLink>
            <NavLink
              to="#"
              className="font-medium text-xs md:text-sm lg:text-base text-red-600 py-3 whitespace-nowrap"
            >
              Admin
            </NavLink>
          </nav>
          <div className="hidden lg:flex mt-9 items-center justify-center px-4">
            <RegisterField stepNumber={1} status="active" />
            <div className="border-b border-2 border-black w-32 xl:w-96" />
            <RegisterField stepNumber={2} status="active" />
            <div className="border-b border-2 border-black w-32 xl:w-96" />
            <RegisterField stepNumber={3} status="active" />
            <div className="border-b border-2 border-black w-32 xl:w-96" />
            <RegisterField stepNumber={4} status="active" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-4 flex justify-center px-2 md:px-4"
          >
            <div className="w-full mb-10 mt-4 md:mt-8 lg:bg-white lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8 max-w-2xl lg:max-w-4xl lg:shadow-lg">
              <div className="mb-6 md:mb-8 p-4 md:p-6 lg:bg-white lg:shadow-lg lg:rounded-2xl">
                <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                  Dados Principais
                </h1>

                <div className="space-y-6 md:space-y-8 lg:space-y-10 pt-2">
                  <div>
                    <Input
                      title="Tipo de Ocorrência"
                      inputClassName="rounded-2xl"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <Input
                        title="Viatura Responsável"
                        inputClassName="rounded-2xl"
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
                        inputClassName="rounded-2xl"
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
                      inputClassName="rounded-2xl"
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
                      inputClassName="rounded-2xl"
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
              <div className="mb-6 md:mb-8 p-4 md:p-6 lg:bg-white lg:shadow-lg lg:rounded-2xl">
                <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                  Dados Complementares
                </h1>

                <div className="space-y-6 md:space-y-8 lg:space-y-10 pt-2">
                  <div>
                    <Input
                      title="Descrição do Caso"
                      inputClassName="rounded-2xl"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <Input
                        title="Recursos Utilizados"
                        inputClassName="rounded-2xl"
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
                        inputClassName="rounded-2xl"
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
                      inputClassName="rounded-2xl"
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
                      inputClassName="rounded-2xl"
                      placeholder="Informe a situação final"
                      {...register("step2.finalSituation", {
                        required: "Situação final é obrigatória",
                      })}
                      error={errors.step2?.finalSituation?.message}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6 md:mb-8 p-4 md:p-6 lg:bg-white lg:shadow-lg lg:rounded-2xl">
                <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                  Identificação
                </h1>

                <div className="space-y-6 md:space-y-8 lg:space-y-10 pt-2">
                  <div>
                    <Input
                      title="Nome"
                      inputClassName="rounded-2xl"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <Input
                        title="CPF"
                        placeholder="Digite seu CPF"
                        inputClassName="rounded-2xl"
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
                        inputClassName="rounded-2xl"
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
                      inputClassName="rounded-2xl"
                      placeholder="Digite seu telefone"
                      {...register("step3.phone", {
                        required: "Telefone é obrigatório",
                      })}
                      error={errors.step3?.phone?.message}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 mt-6 md:mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-xl w-full md:w-[130px] lg:w-[150px] h-10 transition-all duration-200 hover:scale-[1.02] font-semibold text-sm md:text-base order-2 md:order-1"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white rounded-xl w-full md:w-[130px] lg:w-[150px] h-10 transition-all duration-200 hover:scale-[1.02] font-semibold text-sm md:text-base order-1 md:order-2"
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
