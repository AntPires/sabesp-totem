const base = import.meta.env.BASE_URL;

interface TitularidadeEnderecoProps {
  address: string;
  onBack: () => void;
  onHome: () => void;
  onSelect: (option: 'mesmo' | 'outro') => void;
}

export default function TitularidadeEndereco({ address, onBack, onHome, onSelect }: TitularidadeEnderecoProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f0f4fa] to-[#d4e3f9]">
      <div className="absolute inset-4 bg-white rounded-[28px] flex flex-col gap-16 items-center px-[72px] py-8 overflow-hidden">

        {/* Nav */}
        <div className="flex items-center justify-between w-full shrink-0">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-16 h-16 bg-[#f0f3f7] rounded-full hover:bg-[#e4e8ef] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

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
          <h2
            className="text-[24px] font-semibold leading-[1.2] text-[#161a20] text-center"
            style={{ fontFamily: "'Inter Display', sans-serif" }}
          >
            Escolha um endereço de correspondências
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            {/* Info banner */}
            <div className="flex gap-4 items-center bg-[#f6f9fc] rounded-2xl p-4 w-full">
              <img src={`${base}assets/info.svg`} alt="" className="shrink-0 w-6 h-6" />
              <p className="text-[14px] font-normal leading-[1.4] text-[#01529b]">
                Usaremos este endereço para envio de comunicações oficiais. A fatura, por sua vez, será emitida e entregue por um técnico diretamente no imóvel.
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-4 w-full">
              {/* Same address */}
              <button
                onClick={() => onSelect('mesmo')}
                className="flex items-center justify-between w-full border border-[#c8d0da] rounded-2xl p-6 hover:bg-[#f6f9fc] transition-colors text-left"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">
                    Mesmo endereço do fornecimento
                  </span>
                  <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">
                    {address}
                  </span>
                </div>
                <svg className="shrink-0 ml-3" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Other address */}
              <button
                onClick={() => onSelect('outro')}
                className="flex items-center justify-between w-full border border-[#c8d0da] rounded-2xl p-6 hover:bg-[#f6f9fc] transition-colors text-left"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">
                    Outro endereço
                  </span>
                  <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">
                    Escolha um novo endereço
                  </span>
                </div>
                <svg className="shrink-0 ml-3" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
