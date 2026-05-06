interface PagamentoCheckoutProps {
  onBack: () => void;
  onHome: () => void;
}

export default function PagamentoCheckout({ onBack, onHome }: PagamentoCheckoutProps) {
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

          <span className="text-[16px] font-semibold text-[#687384]">Pagamento de Faturas</span>

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
          <div className="flex flex-col gap-6 items-center w-full">
            <img
              src={`${import.meta.env.BASE_URL}assets/obra.png`}
              alt=""
              className="w-40 h-40 object-contain"
            />
            <div className="flex flex-col gap-2 items-center text-center w-full">
              <h2
                className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
                style={{ fontFamily: "'Inter Display', sans-serif" }}
              >
                Checkout em construção
              </h2>
              <p className="text-[16px] font-normal leading-[1.4] text-[#687384]">
                Se você está vendo esta tela, chegou cedo demais. O checkout ainda está sendo desenhado e desenvolvido. Volte mais tarde para mais novidades :)
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
