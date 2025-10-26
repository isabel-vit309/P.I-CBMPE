export interface RegisterFieldProps {
  stepNumber: number;
  status?: "active" | "inactive";
}

export function RegisterField({
  stepNumber,
  status = "inactive",
}: RegisterFieldProps) {
  const getStepClass = () => {
    if (status === "active") {
      return "bg-red-600 text-white";
    }
    return "bg-white text-black border border-gray-300";
  };

  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`rounded-lg w-10 h-10 flex items-center justify-center  ${getStepClass()}`}
        >
          <h3 className="font-roboto font-bold">{stepNumber}</h3>
        </div>
      </div>
    </div>
  );
}
