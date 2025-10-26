import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/ContextRevisao";
import { Sidebar } from "../../Components/Sidebar";
import { NavLink } from "react-router-dom";
import { Input } from "../../Components/Input";
import { RegisterField } from "../../Components/RegisterField";

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
    reset,
  } = useForm<StepOneForm>();

  useEffect(() => {
    if (formData.step1) {
      reset(formData.step1);
    }
  }, [formData.step1, reset]);

  const onSubmit = (data: StepOneForm) => {
    updateFormData("step1", data);
    navigate("/steptwo");
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
            <RegisterField stepNumber={2} status="inactive" />
            <div className="border-b border-2 border-black w-32 xl:w-96" />
            <RegisterField stepNumber={3} status="inactive" />
            <div className="border-b border-2 border-black w-32 xl:w-96" />
            <RegisterField stepNumber={4} status="inactive" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[400px] md:min-h-[500px] mt-4 flex justify-center px-2 md:px-4"
          >
            <div className="w-full mt-4 md:mt-8 lg:bg-white lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8 max-w-2xl lg:max-w-4xl lg:shadow-lg">
              <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Dados Principais
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6">
                <div>
                  <Input
                    title="Tipo de Ocorrência"
                    inputClassName="rounded-2xl"
                    placeholder="Ex: Acidente, Incêndio"
                    {...register("occurrenceType", {
                      required: "Tipo de ocorrência é obrigatório",
                      minLength: {
                        value: 2,
                        message:
                          "Tipo de ocorrência deve ter pelo menos 2 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ\s]+$/,
                        message: "Tipo de ocorrência deve conter apenas letras",
                      },
                    })}
                    error={errors.occurrenceType?.message}
                  />
                </div>

                <div>
                  <Input
                    title="Viatura Responsável"
                    inputClassName="rounded-2xl"
                    placeholder="Digite o número da viatura"
                    {...register("responsibleVehicle", {
                      required: "Viatura responsável é obrigatória",
                      pattern: {
                        value: /^[A-Z0-9-]+$/,
                        message:
                          "Código deve conter apenas letras maiúsculas, números e hífens",
                      },
                      minLength: {
                        value: 3,
                        message: "Código deve ter pelo menos 3 caracteres",
                      },
                    })}
                    error={errors.responsibleVehicle?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                <div>
                  <Input
                    title="Data"
                    type="date"
                    placeholder="Selecione a Data"
                    inputClassName="rounded-2xl"
                    {...register("dateTime", {
                      required: "Data é obrigatória",
                      validate: {
                        futureDate: (value) => {
                          if (!value) return true;
                          const selectedDate = new Date(value);
                          const now = new Date();
                          return (
                            selectedDate <= now || "Data não pode ser futura"
                          );
                        },
                        validDate: (value) => {
                          if (!value) return true;
                          const selectedDate = new Date(value);
                          return (
                            !isNaN(selectedDate.getTime()) || "Data inválida"
                          );
                        },
                      },
                    })}
                    error={errors.dateTime?.message}
                  />
                </div>

                <div>
                  <Input
                    title="Grupamentos"
                    inputClassName="rounded-2xl"
                    placeholder="Ex: 6ºBBM, 1ºGB"
                    {...register("groupings", {
                      required: "Grupamentos são obrigatórios",
                      minLength: {
                        value: 2,
                        message:
                          "Grupamentos devem ter pelo menos 2 caracteres",
                      },
                    })}
                    error={errors.groupings?.message}
                  />
                </div>
              </div>

              <div className="mt-4 md:mt-6 lg:mt-10">
                <Input
                  title="Tipo de Local"
                  inputClassName="rounded-2xl"
                  placeholder="Informe onde ocorreu o incidente"
                  {...register("locationType", {
                    required: "Tipo de local é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Tipo de local deve ter pelo menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ0-9\s.,-]+$/,
                      message: "Tipo de local contém caracteres inválidos",
                    },
                  })}
                  error={errors.locationType?.message}
                />
              </div>

              <div className="flex justify-center md:justify-end mt-4 md:mt-6 lg:mt-10">
                <button
                  type="submit"
                  className="bg-primary text-white rounded-xl w-full md:w-[130px] lg:w-[150px] h-10 transition-transform hover:scale-[1.02] text-sm md:text-base"
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
