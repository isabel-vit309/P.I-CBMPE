export interface RegisterFieldProps {
    title: string;
    description: string;
    stepNumber: number;
}

export function RegisterField({title, description, stepNumber}: RegisterFieldProps){
    return(
        <div className="flex items-start ml-10 gap-4">
                    <div className="flex flex-col items-center">
                        <div className="bg-white rounded-lg w-8 h-8 flex items-center justify-center">
                            <h3 className="font-roboto font-bold text-black">{stepNumber}</h3>
                        </div>
                        <div className="w-1 h-16 bg-white mt-1"></div>
                    </div>
                    <div className="w-[220px] flex flex-col whitespace-normal">
                        <h3 className="font-roboto font-bold text-white">{title}</h3>
                        <p className="text-white text-sm">{description}</p>
                    </div>
                </div>)
    }