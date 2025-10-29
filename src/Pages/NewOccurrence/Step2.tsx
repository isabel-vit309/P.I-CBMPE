import { useForm } from "react-hook-form";
import { RegisterField } from "../../Components/RegisterField";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/ContextRevisao";
import { useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar";
import { NavLink } from "react-router-dom";
import { Input } from "../../Components/Input";
import { Select } from "../../Components/Select";

type StepTwoForm = {
  caseDescription?: string;
  resourcesUsed?: string;
  victimsNumber?: string;
  occurrenceAddress?: string;
  finalSituation?: string;
};

export function StepTwo() {
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormContext();

  // Opções para o select de situação final
  const situationOptions = [
    { value: "PENDENTE", label: "Pendente" },
    { value: "EM_ANDAMENTO", label: "Em Andamento" },
    { value: "FINALIZADA", label: "Finalizada" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StepTwoForm>();

  useEffect(() => {
    const step2Data: StepTwoForm = {
      caseDescription: formData.step2?.caseDescription || "",
      resourcesUsed: formData.step2?.resourcesUsed || "",
      victimsNumber: formData.step2?.victimsNumber || "",
      occurrenceAddress: formData.step2?.occurrenceAddress || "",
      finalSituation: formData.step2?.finalSituation || "",
    };
    reset(step2Data);
  }, [formData.step2, reset]);

  const onSubmit = (data: StepTwoForm) => {
    updateFormData("step2", data);
    navigate("/stepthree");
  };

  const handleBack = () => {
    navigate("/new-occurrence");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
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
            <div className="border-b border-2 border-black flex-1 max-w-[100px] md:max-w-[150px] lg:max-w-[200px]" />
            <RegisterField stepNumber={2} status="active" />
            <div className="border-b border-2 border-black flex-1 max-w-[100px] md:max-w-[150px] lg:max-w-[200px]" />
            <RegisterField stepNumber={3} status="inactive" />
            <div className="border-b border-2 border-black flex-1 max-w-[100px] md:max-w-[150px] lg:max-w-[200px]" />
            <RegisterField stepNumber={4} status="inactive" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[400px] md:min-h-[500px] mt-4 flex justify-center px-4 md:px-6 lg:px-8"
          >
            <div className="w-full mt-4 md:mt-8 lg:bg-white lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8 max-w-2xl lg:max-w-4xl lg:shadow-lg">
              <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Dados Complementares
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6">
                <div className="pb-3 md:pb-0">
                  <Input
                    title="Descrição do Caso"
                    inputClassName="rounded-2xl"
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

                <div className="pb-3 md:pb-0">
                  <Input
                    title="Recursos Utilizados"
                    inputClassName="rounded-2xl"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                <div className="pb-3 md:pb-0">
                  <Input
                    title="Número de Vítimas"
                    placeholder="Digite a quantidade de vítimas"
                    inputClassName="rounded-2xl"
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

                <div className="pb-2 md:pb-0">
                  <Input
                    title="Endereço de Ocorrência"
                    inputClassName="rounded-2xl"
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

              <div className="pb-3 mt-7 md:mt-10 lg:mt-10">
                <Select
                  title="Situação Final"
                  inputClassName="rounded-2xl"
                  placeholder="Selecione a situação"
                  options={situationOptions}
                  {...register("finalSituation", {
                    required: "Situação final é obrigatória",
                    validate: {
                      required: (value) =>
                        value !== "" || "Selecione uma situação",
                    },
                  })}
                  error={errors.finalSituation?.message}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 mt-4 md:mt-6 lg:mt-10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white rounded-xl w-full md:w-[130px] lg:w-[150px] h-10 transition-transform hover:scale-[1.02] text-sm md:text-base order-2 md:order-1"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white rounded-xl w-full md:w-[130px] lg:w-[150px] h-10 transition-transform hover:scale-[1.02] text-sm md:text-base order-1 md:order-2"
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
