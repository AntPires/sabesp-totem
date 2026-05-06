import { useState } from 'react';

interface SegundaViaNomeMaeProps {
  onBack: () => void;
  onHome: () => void;
  onContinue: () => void;
}

function hasNameAndSurname(value: string): boolean {
  const parts = value.trim().split(/\s+/);
  return parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0;
}

export default function SegundaViaNomeMae({ onBack, onHome, onContinue }: SegundaViaNomeMaeProps) {
  const [value, setValue] = useState('');
  const isValid = hasNameAndSurname(value);

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

          <span className="text-[16px] font-semibold text-[#687384]">Segunda via de Faturas</span>

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
            Confirme o nome completo da sua mãe
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Nome da mãe"
              className="w-full h-14 px-4 border border-[#c8d0da] rounded-2xl text-[16px] text-[#161a20] placeholder-[#687384] focus:outline-none focus:border-[#0165bd] focus:ring-1 focus:ring-[#0165bd] transition-colors"
            />

            <button
              onClick={isValid ? onContinue : undefined}
              disabled={!isValid}
              className={`flex items-center justify-center px-8 py-4 text-[20px] font-semibold rounded-full transition-colors ${
                isValid
                  ? 'bg-[#0165bd] text-white hover:bg-[#0058a8] cursor-pointer'
                  : 'bg-[#f0f3f7] text-[#8695a7] cursor-default'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
