import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/ContextRevisao";

export function StepFour() {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  const handleConfirm = () => {
    console.log("Dados completos para envio:", formData);
    alert("Dados confirmados! Prontos para envio.");
    navigate("/stepfive");
  };

  const handleBack = () => {
    navigate("/stepthree");
  };

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
          h-[800px] 2xl:h-[880px]
          shrink-0
        "
      >
        <div className="flex justify-center pt-8">
          <Whitelogo className="w-32 h-32" />
        </div>
        <div className="border-b border-white mx-auto w-3/4 my-4" />
        <div className="mt-8 2xl:mt-20 px-4">
          <RegisterField
            stepNumber={1}
            title="Dados principais"
            description="Informações essenciais sobre a ocorrência."
          />
          <RegisterField
            stepNumber={2}
            title="Dados Complementares"
            description="Informações que vão ajudar a entender o caso em geral."
          />
          <RegisterField
            stepNumber={3}
            title="Identificação"
            description="Momento para registrarmos quem está passando as informações."
          />
          <RegisterField
            stepNumber={4}
            title="Revisão"
            description="Hora de olhar todas as informações e ter certeza que está tudo correto antes do envio."
          />
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex justify-center w-full">
        <div
          className="
            w-full shadow-lg bg-white rounded-3xl
            p-4 sm:p-6 xl:p-8 2xl:p-10
            max-w-full sm:max-w-[calc(100vw-60px)]
            xl:max-w-[calc(100vw-400px)] 2xl:max-w-[1391px]
            h-[800px] 2xl:h-[880px]
            overflow-y-auto
            transition-all duration-200 ease-in-out
          "
        >
          <h1 className="font-bold font-roboto text-2xl md:text-3xl mb-8">
            Revisão Final
          </h1>

          {/* SEÇÃO 1 */}
          <section className="mb-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary">
              📋 Dados Principais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <strong className="text-gray-700">Tipo de Ocorrência:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step1?.occurrenceType || "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Viatura Responsável:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step1?.responsibleVehicle || "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Data e Hora:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step1?.dateTime
                    ? new Date(formData.step1.dateTime).toLocaleString("pt-BR")
                    : "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Grupamentos:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step1?.groupings || "Não informado"}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <strong className="text-gray-700">Local:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step1?.locationType || "Não informado"}
                </p>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2 */}
          <section className="mb-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary">
              📝 Dados Complementares
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="col-span-1 sm:col-span-2">
                <strong className="text-gray-700">Descrição do Caso:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step2?.caseDescription || "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Recursos Utilizados:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step2?.resourcesUsed || "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Número de Vítimas:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step2?.victimsNumber || "0"}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <strong className="text-gray-700">
                  Endereço da Ocorrência:
                </strong>
                <p className="text-gray-900 mt-1">
                  {formData.step2?.occurrenceAddress || "Não informado"}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <strong className="text-gray-700">Situação Final:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step2?.finalSituation || "Não informado"}
                </p>
              </div>
            </div>
          </section>

          {/* SEÇÃO 3 */}
          <section className="mb-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary">
              👤 Dados de Identificação
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <strong className="text-gray-700">Nome:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step3?.name || "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Código de Identificação:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step3?.identificationCode || "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">CPF:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step3?.cpf || "Não informado"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Telefone:</strong>
                <p className="text-gray-900 mt-1">
                  {formData.step3?.phone || "Não informado"}
                </p>
              </div>
            </div>
          </section>

          {/* BOTÕES */}
          <div className="flex flex-col xl:flex-row justify-between mt-10 gap-4 xl:gap-0">
            <button
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
              onClick={handleConfirm}
              className="
                bg-primary text-white rounded-xl
                w-full max-w-xs xl:w-[150px] h-10
                transition-transform hover:scale-[1.02]
              "
            >
              Confirmar e Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
