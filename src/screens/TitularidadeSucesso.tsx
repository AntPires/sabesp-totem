const base = import.meta.env.BASE_URL;

interface TitularidadeSucessoProps {
  novoTitular: { nome: string; cpf: string };
  onHome: () => void;
}

function formatCpf(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.length !== 11) return digits;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export default function TitularidadeSucesso({ novoTitular, onHome }: TitularidadeSucessoProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f0f4fa] to-[#d4e3f9]">
      <div className="absolute inset-4 bg-white rounded-[28px] flex flex-col gap-16 items-center px-[72px] py-8 overflow-hidden">

        {/* Nav */}
        <div className="flex items-center justify-between w-full shrink-0">
          <div className="w-16 h-16" />
          <span className="text-[16px] font-semibold text-[#687384]">Mudança de titularidade</span>
          <button
            onClick={onHome}
            className="flex items-center justify-center w-16 h-16 bg-[#f0f3f7] rounded-full hover:bg-[#e4e8ef] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 items-center w-full max-w-[420px]">

          {/* Illustration + texts */}
          <div className="flex flex-col gap-6 items-center text-center w-full">
            <img
              src={`${base}assets/calendario.png`}
              alt="Calendário"
              className="w-[120px] h-[120px] object-contain"
            />
            <div className="flex flex-col gap-2 items-center">
              <h2
                className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
                style={{ fontFamily: "'Inter Display', sans-serif" }}
              >
                Serviço solicitado!
              </h2>
              <p className="text-[16px] font-normal leading-[1.4] text-[#687384]">
                Sua solicitação está sendo avaliada. Não esqueça do comprovante do serviço.
              </p>
            </div>
          </div>

          {/* Info card */}
          <div className="flex flex-col gap-5 w-full border border-[#c8d0da] rounded-2xl p-6">
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">Número da solicitação</span>
              <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">1234567891</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">Titular</span>
              <p className="text-[16px] font-medium leading-[1.4] text-[#38404a]">{novoTitular.nome}</p>
              <p className="text-[14px] font-normal leading-[1.4] text-[#687384]">{formatCpf(novoTitular.cpf)}</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onHome}
            className="flex items-center justify-center px-8 py-4 bg-[#0165bd] text-white text-[20px] font-semibold rounded-full hover:bg-[#0058a8] transition-colors"
          >
            Finalizar sessão
          </button>

        </div>
      </div>
    </div>
  );
}
