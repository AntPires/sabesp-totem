import { useEffect } from 'react';

interface TitularidadeLoadingProps {
  onHome: () => void;
  onContinue: () => void;
}

const dots = [
  { color: '#0165bd', delay: '0ms' },
  { color: '#0d9488', delay: '160ms' },
  { color: '#f59e0b', delay: '320ms' },
  { color: '#22c55e', delay: '480ms' },
];

export default function TitularidadeLoading({ onHome, onContinue }: TitularidadeLoadingProps) {
  useEffect(() => {
    const timer = setTimeout(onContinue, 3000);
    return () => clearTimeout(timer);
  }, [onContinue]);

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
        <div className="flex flex-col gap-10 items-center w-full max-w-[420px] flex-1 justify-between">
          <div className="flex flex-col gap-6 items-center text-center w-full">
            <div className="flex flex-col gap-2 items-center">
              <h2
                className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
                style={{ fontFamily: "'Inter Display', sans-serif" }}
              >
                Validando suas informações...
              </h2>
              <p className="text-[16px] font-normal leading-[1.4] text-[#687384]">
                Isso pode levar alguns segundos.
              </p>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {dots.map((dot, i) => (
                <span
                  key={i}
                  className="block w-3 h-3 rounded-full animate-bounce"
                  style={{
                    backgroundColor: dot.color,
                    animationDelay: dot.delay,
                    animationDuration: '800ms',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#1081eb"/>
            </svg>
            <span className="text-[14px] font-medium leading-[1.4] text-[#1081eb]">
              Dados protegidos pela Sabesp
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
