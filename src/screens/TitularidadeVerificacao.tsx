import { useState } from 'react';

interface TitularidadeVerificacaoProps {
  onBack: () => void;
  onHome: () => void;
  onContinue: () => void;
}

const base = import.meta.env.BASE_URL;

const instructions = [
  {
    icon: `${base}assets/verified_user.svg`,
    text: 'Vamos verificar que é você para seguir com o processo.',
  },
  {
    icon: `${base}assets/person.svg`,
    text: 'Fique bem posicionado em frente ao totem para que o reconhecimento facial funcione corretamente.',
  },
  {
    icon: `${base}assets/person-1.svg`,
    text: 'Mantenha seu rosto centralizado quando a câmera for ligada para facilitar a captura.',
  },
];

export default function TitularidadeVerificacao({ onBack, onHome, onContinue }: TitularidadeVerificacaoProps) {
  const [showCamera, setShowCamera] = useState(false);

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
            Antes de continuar, precisamos confirmar sua identidade
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            {/* Instructions list */}
            <div className="flex flex-col gap-4 w-full">
              {instructions.map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <img src={item.icon} alt="" className="w-6 h-6 shrink-0" />
                  <p className="text-[16px] font-normal leading-[1.4] text-[#38404a]">{item.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCamera(true)}
              className="flex items-center justify-center px-8 py-4 bg-[#0165bd] text-white text-[20px] font-semibold rounded-full hover:bg-[#0058a8] transition-colors"
            >
              Ir para a verificação
            </button>
          </div>
        </div>

      </div>

      {/* Camera mock modal */}
      {showCamera && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-[28px]">
          <div className="bg-white rounded-2xl p-8 w-[600px] flex flex-col gap-6 shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h3
                className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
                style={{ fontFamily: "'Inter Display', sans-serif" }}
              >
                Verificação de identidade
              </h3>
              <button
                onClick={() => setShowCamera(false)}
                className="flex items-center justify-center w-9 h-9 bg-[#f6f8fa] rounded-full hover:bg-[#eceef1] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Camera placeholder */}
            <button
              onClick={onContinue}
              className="w-full rounded-[28px] border-2 border-dashed border-[#ff5cd4] flex items-center justify-center py-48 hover:bg-pink-50/30 transition-colors"
            >
              <span className="text-[40px] font-medium text-[rgba(255,92,212,0.25)] select-none">
                Captura de imagem
              </span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
