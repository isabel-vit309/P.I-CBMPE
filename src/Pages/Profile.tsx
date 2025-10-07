import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../Components/Sidebar";

export function Profile() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [tipoAcesso, setTipoAcesso] = useState("");
  const [foto, setFoto] = useState("");
  const inputArquivo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNome("Isabel Vitória");
    setEmail("bebel.vit@gmail.com");
    setNumero("+55 (081) 9 9875-0000");
    setTipoAcesso("Bombeiro Militar");

    const fotoSalva = localStorage.getItem("fotoPerfil");
    if (fotoSalva) {
      setFoto(fotoSalva);
    }
  }, []);

  function clicarUpload() {
    inputArquivo.current?.click();
  }

  function selecionarArquivo(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      const leitor = new FileReader();
      leitor.onload = (e) => {
        if (e.target?.result) {
          setFoto(e.target.result as string);
        }
      };
      leitor.readAsDataURL(arquivo);
    }
  }

  function salvar() {
    if (foto) {
      localStorage.setItem("fotoPerfil", foto);
    }
    alert("Dados salvos com sucesso!");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* SIDEBAR */}
      <aside className="hidden md:block w-64 bg-white shadow-lg">
        <Sidebar />
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <div className="h-48 bg-primary relative">
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex flex-col items-center md:items-start">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-300 rounded-full border-4 border-white shadow-md overflow-hidden">
              {foto ? (
                <img
                  src={foto}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-300"></div>
              )}
            </div>
            <span className="text-2xl font-bold mt-4 text-center md:text-left">
              {nome}
            </span>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="pt-32 md:pt-44 px-4 sm:px-6 md:px-10 lg:px-16 pb-12">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            
            {/* BLOCO DE INFORMAÇÕES — mais à esquerda */}
            <div className="w-full md:w-[35%] lg:w-[30%]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Informações do perfil
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Você pode visualizar e editar as informações do seu perfil.  
                Não esqueça de apertar no botão{" "}
                <span className="font-semibold">“Salvar”</span> para que os novos dados sejam implementados.
              </p>
            </div>

            {/* FORMULÁRIO */}
            <div className="flex-1 border border-zinc-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Nome
                    </label>
                    <input
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full p-3 border border-zinc-300 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-zinc-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Número
                    </label>
                    <input
                      type="tel"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      className="w-full p-3 border border-zinc-300 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Tipo de acesso
                    </label>
                    <input
                      value={tipoAcesso}
                      onChange={(e) => setTipoAcesso(e.target.value)}
                      className="w-full p-3 border border-zinc-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium text-gray-800 mb-4">
                    Foto de perfil
                  </h4>
                  <input
                    type="file"
                    ref={inputArquivo}
                    onChange={selecionarArquivo}
                    accept=".svg,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <div
                    onClick={clicarUpload}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-primary cursor-pointer"
                  >
                    <p className="font-medium mb-1 text-gray-600">
                      Clique aqui para escolher outra foto
                    </p>
                    <p className="text-xs text-gray-500">
                      Formatos suportados: SVG, JPG, PNG (até 10MB)
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={salvar}
                className="mt-8 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
