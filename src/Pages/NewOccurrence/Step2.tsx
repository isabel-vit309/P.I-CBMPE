import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/ContextRevisao";
import { useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar";
import { NavLink } from "react-router-dom";
import { Input } from "../../Components/Input";

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
    reset,
  } = useForm<StepTwoForm>();

  useEffect(() => {
    if (formData.step2) {
      reset(formData.step2);
    }
  }, [formData.step2, reset]);

  const onSubmit = (data: StepTwoForm) => {
    updateFormData("step2", data);
    navigate("/stepthree");
  };

  const handleBack = () => {
    navigate("/new-occurrence");
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
            <RegisterField stepNumber={3} status="inactive" />
            <div className="border-b border-2 border-black w-96" />
            <RegisterField stepNumber={4} status="inactive" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[500px] 2xl:h-[800px] mt-4 flex justify-center"
          >
            <div className="w-full max-h-[450px] mt-8 shadow-lg bg-white rounded-3xl p-6 xl:p-8 2xl:p-10 max-w-[calc(100vw-360px)] xl:max-w-[calc(100vw-500px)] 2xl:max-w-[1391px]">
              <h1 className="font-semibold font-roboto text-3xl ml-4">
                Dados Complementares
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="mb-4">
                  <Input
                    title="Descrição do Caso"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Descreva o caso ocorrido"
                    {...register("caseDescription", {
                      required: "Descrição do caso é obrigatória",
                      minLength: {
                        value: 10,
                        message: "Descrição deve ter pelo menos 10 caracteres",
                      },
                      maxLength: {
                        value: 500,
                        message: "Descrição deve ter no máximo 500 caracteres",
                      },
                    })}
                    error={errors.caseDescription?.message}
                  />
                </div>

                <div>
                  <Input
                    title="Recursos Utilizados"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Ex: Viaturas, Equipamentos"
                    {...register("resourcesUsed", {
                      required: "Recursos utilizados são obrigatórios",
                      minLength: {
                        value: 3,
                        message: "Recursos devem ter pelo menos 3 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ0-9\s.,-]+$/,
                        message: "Recursos contém caracteres inválidos",
                      },
                    })}
                    error={errors.resourcesUsed?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="mb-4">
                  <Input
                    title="Número de Vítimas"
                    placeholder="Digite a quantidade de vítimas"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    type="number"
                    {...register("victimsNumber", {
                      required: "Número de vítimas é obrigatório",
                      min: {
                        value: 0,
                        message: "Número de vítimas não pode ser negativo",
                      },
                      max: {
                        value: 1000,
                        message:
                          "Número de vítimas não pode ser maior que 1000",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Apenas números são permitidos",
                      },
                    })}
                    error={errors.victimsNumber?.message}
                  />
                </div>

                <div>
                  <Input
                    title="Endereço de Ocorrência"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Ex: Rua, Avenida, Praça"
                    {...register("occurrenceAddress", {
                      required: "Endereço de ocorrência é obrigatório",
                      minLength: {
                        value: 5,
                        message: "Endereço deve ter pelo menos 5 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ0-9\s.,-º°]+$/,
                        message: "Endereço contém caracteres inválidos",
                      },
                    })}
                    error={errors.occurrenceAddress?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 mt-10">
                <div>
                  <Input
                    title="Situação Final"
                    className="w-full border border-zinc-300 h-10 rounded-xl bg-white"
                    placeholder="Informe a situação final"
                    {...register("finalSituation", {
                      required: "Situação final é obrigatória",
                      minLength: {
                        value: 5,
                        message:
                          "Situação final deve ter pelo menos 5 caracteres",
                      },
                      maxLength: {
                        value: 300,
                        message:
                          "Situação final deve ter no máximo 300 caracteres",
                      },
                    })}
                    error={errors.finalSituation?.message}
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
