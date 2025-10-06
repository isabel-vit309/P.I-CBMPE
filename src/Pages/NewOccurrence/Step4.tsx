import { RegisterField } from "../../Components/RegisterField";
import { Whitelogo } from "../../Components/WhiteLogo";
import { useNavigate } from 'react-router-dom';

export function StepFour() { // ✅ Exportação correta com "Four"
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate('/stepfive');
    };


    return (
        <div className="min-h-screen grid grid-cols-register ml-4 gap-6">
                            <div className="bg-primary h-[880px] w-[348px] mt-20 rounded-lg">
                                <Whitelogo className="w-32 h-32 ml-28" />
                                <div className="border-b border-white -m-5" />
                                <div className="mt-20">
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
                            <form className="flex items-center justify-center">
                                <div className="w-[1391px] h-[704px] shadow-lg bg-white rounded-3xl">
                                    <h1 className="font-bold font-roboto pl-10 pt-10 text-3xl">Identificação</h1>
                                        <div className=" flex flex-col-2">
                                        <div className="mt-4 ml-10">
                                    <label htmlFor="" className="flex flex-col font-semibold">Nome</label>
                                    <input type="text" className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                                     placeholder="Tipo de Ocorrência"
                                      />
                                    </div>
                                    <div className="mt-4 ml-10">
                                    <label htmlFor="" className="flex flex-col font-semibold">Código de identificação*</label>
                                    <input type="text" className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                                     placeholder="Código da Viatura"
                                      />
                                    </div>
                                    </div>
                                    <div className=" flex flex-col-2">
                                    <div className="mt-4 ml-10">
                                    <label htmlFor="" className="flex flex-col font-semibold">CPF</label>
                                    <input type="text" className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                                     placeholder="00:00"
                                      />
                                    </div>
                
                                    <div className="mt-4 ml-10">
                                    <label htmlFor="" className="flex flex-col font-semibold">Telefone</label>
                                    <input type="text" className="border border-zinc-300 w-[620px] h-10 rounded-xl pl-3 mt-2"
                                     placeholder="Grupamentos"
                                      />
                                    </div>
                                    </div>
                                    <div className="relative">
                                    <button onClick={handleClick} className="bg-primary w-[150px] h-10 text-white rounded-xl mt-10 absolute right-3 top-1/2 mr-16">Continue</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                            
                        
    )
}