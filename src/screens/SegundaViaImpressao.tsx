interface SegundaViaImpressaoProps {
  onHome: () => void;
}

export default function SegundaViaImpressao({ onHome }: SegundaViaImpressaoProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f0f4fa] to-[#d4e3f9]">
      <div className="absolute inset-4 bg-white rounded-[28px] flex flex-col items-center justify-center px-[72px] py-8 overflow-hidden">

        {/* Content */}
        <div className="flex flex-col gap-10 items-center w-full max-w-[420px]">
          <div className="flex flex-col gap-6 items-center w-full">
            <img
              src={`${import.meta.env.BASE_URL}assets/ampulheta.png`}
              alt=""
              className="w-40 h-40 object-contain"
            />
            <div className="flex flex-col gap-2 items-center text-center w-full">
              <h2
                className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
                style={{ fontFamily: "'Inter Display', sans-serif" }}
              >
                Suas faturas estão sendo impressas
              </h2>
              <p className="text-[16px] font-normal leading-[1.4] text-[#687384]">
                Retire suas faturas da máquina e finalize a sessão do totem. Caso suas faturas não tenham sido corretamente impressas, peça ajuda.
              </p>
            </div>
          </div>

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
