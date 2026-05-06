import { useState } from 'react';

interface SegundaViaFinalidadeProps {
  onBack: () => void;
  onHome: () => void;
  onSelect: (finalidade: 'pagamento' | 'comprovante') => void;
}

const options = [
  {
    id: 'pagamento' as const,
    title: 'Apenas para pagamento',
    description: 'Fatura com todos os dados para pagamento em Pix, cartão e código de barras.',
  },
  {
    id: 'comprovante' as const,
    title: 'Comprovante de residência',
    description: 'Fatura completa com todos os dados de cadastro, servindo como comprovante de endereço.',
  },
];

export default function SegundaViaFinalidade({ onBack, onHome, onSelect }: SegundaViaFinalidadeProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  function handleSelect(id: 'pagamento' | 'comprovante') {
    if (id === 'comprovante') {
      setShowConfirm(true);
    } else {
      onSelect(id);
    }
  }

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
            Para que você vai usar esta fatura?
          </h2>

          <div className="flex flex-col gap-4 w-full">
            {options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className="flex items-center gap-3 w-full px-6 py-6 bg-white border border-[#c8d0da] rounded-2xl text-left hover:bg-[#fafbfc] transition-colors"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">{opt.title}</span>
                  <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">{opt.description}</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M9 18l6-6-6-6" stroke="#687384" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-[28px]">
          <div className="bg-white rounded-2xl p-8 w-[440px] flex flex-col gap-6 shadow-lg">

            {/* Header */}
            <div className="flex gap-6 items-start">
              <div className="flex flex-col gap-4 flex-1 min-w-0">
                <h3
                  className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
                  style={{ fontFamily: "'Inter Display', sans-serif" }}
                >
                  Antes de continuar
                </h3>
                <p className="text-[16px] font-normal leading-[1.4] text-[#38404a]">
                  Para imprimir o comprovante de residência, vamos pedir alguns dados para confirmar a titularidade.
                </p>
                <p className="text-[16px] font-normal leading-[1.4] text-[#38404a]">
                  Se você precisa apenas pagar, pode usar a opção Apenas para pagamento.
                </p>
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex items-center justify-center w-9 h-9 bg-[#f6f8fa] rounded-full hover:bg-[#eceef1] transition-colors shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-[#f6f9fc] text-[#01529b] text-[16px] font-semibold rounded-full hover:bg-[#eaf1fb] transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={() => { setShowConfirm(false); onSelect('comprovante'); }}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-[#0165bd] text-white text-[16px] font-semibold rounded-full hover:bg-[#0058a8] transition-colors"
              >
                Continuar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
