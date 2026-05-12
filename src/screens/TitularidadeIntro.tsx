interface TitularidadeIntroProps {
  onBack: () => void;
  onHome: () => void;
  onContinue: () => void;
}

const base = import.meta.env.BASE_URL;

const infoItems = [
  {
    icon: `${base}assets/person_add_alt_1.svg`,
    text: 'Com a transferência, o novo titular passa a responder pelo consumo e pelas próximas faturas do endereço.',
  },
  {
    icon: `${base}assets/update.svg`,
    text: 'A transferência só será concluída após a emissão da fatura atual, para evitar problemas de cobrança.',
  },
];

export default function TitularidadeIntro({ onBack, onHome, onContinue }: TitularidadeIntroProps) {
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
            Transferir titularidade de um imóvel
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            {/* Info card */}
            <div className="flex flex-col gap-5 w-full border border-[#c8d0da] rounded-2xl p-6">
              {infoItems.map((item, i) => (
                <div key={i}>
                  {i > 0 && <div className="border-t border-[#e0e5eb] mb-5" />}
                  <div className="flex gap-3 items-center">
                    <img src={item.icon} alt="" className="w-6 h-6 shrink-0" />
                    <p className="text-[16px] font-normal leading-[1.4] text-[#38404a]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onContinue}
              className="flex items-center justify-center px-8 py-4 bg-[#0165bd] text-white text-[20px] font-semibold rounded-full hover:bg-[#0058a8] transition-colors"
            >
              Continuar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
