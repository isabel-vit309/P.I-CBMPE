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
            <RegisterField stepNumber={2} status="inactive" />
            <div className="border-b border-2 border-black w-96" />
            <RegisterField stepNumber={3} status="inactive" />
            <div className="border-b border-2 border-black w-96" />
            <RegisterField stepNumber={4} status="inactive" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[500px] 2xl:h-[800px] mt-4 flex justify-center"
          >
            <div className="w-full max-h-[460px] mt-8 shadow-lg bg-white rounded-3xl p-6 xl:p-8 2xl:p-10 max-w-[calc(100vw-360px)] xl:max-w-[calc(100vw-500px)] 2xl:max-w-[1391px]">
              <h1 className="font-semibold font-roboto text-3xl ml-4">
                Dados Principais
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="mb-4">
                  <Input
                    title="Tipo de Ocorrência"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="mb-4">
                  <Input
                    title="Data"
                    type="date"
                    placeholder="Selecione a Data"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
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

              <div className="grid grid-cols-1 mt-10">
                <div>
                  <Input
                    title="Tipo de Local"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Informe onde ocorreu o incidente"
                    {...register("locationType", {
                      required: "Tipo de local é obrigatório",
                      minLength: {
                        value: 3,
                        message:
                          "Tipo de local deve ter pelo menos 3 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ0-9\s.,-]+$/,
                        message: "Tipo de local contém caracteres inválidos",
                      },
                    })}
                    error={errors.locationType?.message}
                  />
                </div>
              </div>

              <div className="flex justify-center xl:justify-end mt-10">
                <button
                  type="submit"
                  className="bg-primary text-white rounded-xl w-full ml-auto max-w-xs xl:w-[150px] h-10 transition-transform hover:scale-[1.02]"
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
