interface TitularidadeVencimentoProps {
  onBack: () => void;
  onHome: () => void;
  onSelect: (dia: number) => void;
}

const DIAS = [1, 5, 10, 15, 20, 25];

export default function TitularidadeVencimento({ onBack, onHome, onSelect }: TitularidadeVencimentoProps) {
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
        <div className="flex flex-col gap-10 items-center w-full max-w-[480px]">
          <h2
            className="text-[24px] font-semibold leading-[1.2] text-[#161a20] text-center"
            style={{ fontFamily: "'Inter Display', sans-serif" }}
          >
            Selecione o dia para o vencimento da fatura
          </h2>

          <div className="grid grid-cols-2 gap-6 w-full">
            {DIAS.map((dia) => (
              <button
                key={dia}
                onClick={() => onSelect(dia)}
                className="flex items-center justify-between border border-[#c8d0da] rounded-2xl p-6 hover:bg-[#f6f9fc] transition-colors text-left"
              >
                <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">
                  Todo dia {String(dia).padStart(2, '0')}
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
