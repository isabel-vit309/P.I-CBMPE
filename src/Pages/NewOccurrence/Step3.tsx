import { useEffect } from "react";
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="p-0">
          <h1 className="ml-12 -mt-1.5 lg:mt-0 lg:ml-0 pt-6 pb-2 px-4 md:px-6 text-xl md:text-2xl lg:text-4xl font-bold text-gray-800">
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
            <RegisterField stepNumber={3} status="active" />
            <div className="border-b border-2 border-black flex-1 max-w-[100px] md:max-w-[150px] lg:max-w-[200px]" />
            <RegisterField stepNumber={4} status="inactive" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-h-[400px] md:min-h-[500px] mt-4 flex justify-center px-4 md:px-6 lg:px-8"
          >
            <div className="w-full mt-4 md:mt-8 lg:bg-white lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8 max-w-2xl lg:max-w-4xl lg:shadow-lg">
              <h1 className="font-semibold font-roboto text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Identificação
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6">
                <div className="pb-3 md:pb-0">
                  <Input
                    title="Nome"
                    inputClassName="rounded-2xl"
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
                    inputClassName="rounded-2xl"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                <div className="pb-3 md:pb-0 mt-3 md:mt-0">
                  <Input
                    title="CPF"
                    placeholder="Digite seu CPF"
                    inputClassName="rounded-2xl"
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

                <div className="pb-3 mt-2 md:pb-0 md:mt-0">
                  <Input
                    title="Telefone"
                    inputClassName="rounded-2xl"
                    placeholder="Digite seu telefone"
                    {...register("phone", {
                      required: "Telefone é obrigatório",
                    })}
                    error={errors.phone?.message}
                  />
                </div>
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
