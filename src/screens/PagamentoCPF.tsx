import { useState, useRef } from 'react';

type ErrorType = 'invalid' | 'not-found' | 'no-supply' | null;

interface PagamentoCPFProps {
  navTitle?: string;
  onBack: () => void;
  onContinue: (cpf: string) => void;
}

function buildMaskedDisplay(digits: string[]): string {
  const n = digits.length;
  if (n === 0) return '';
  const m = digits.map((d, i) => (i === n - 1 ? d : '*'));
  let r = m.slice(0, Math.min(3, n)).join('');
  if (n > 3) r += '.' + m.slice(3, Math.min(6, n)).join('');
  if (n > 6) r += '.' + m.slice(6, Math.min(9, n)).join('');
  if (n > 9) r += '-' + m.slice(9, 11).join('');
  return r;
}

const ERROR_MESSAGES: Record<NonNullable<ErrorType>, string> = {
  'invalid':    'Número de CPF inválido. Verifique e tente novamente',
  'not-found':  'O CPF informado não pôde ser verificado. Entre em contato com a Sabesp para obter mais informações.',
  'no-supply':  'Não há fornecimento ativo para este CPF. Verifique e tente novamente',
};

// Mock: 11111111111 → invalid | 22222222222 → not-found | 33333333333 → no-supply | resto → ok
function mockValidate(cpf: string): Promise<ErrorType> {
  return new Promise(resolve =>
    setTimeout(() => {
      if (cpf === '11111111111') resolve('invalid');
      else if (cpf === '22222222222') resolve('not-found');
      else if (cpf === '33333333333') resolve('no-supply');
      else resolve(null);
    }, 1200)
  );
}

export default function PagamentoCPF({ navTitle = 'Pagamento de Faturas', onBack, onContinue }: PagamentoCPFProps) {
  const [digits, setDigits] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isComplete = digits.length === 11;
  const maskedDisplay = buildMaskedDisplay(digits);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (/^[0-9]$/.test(e.key) && digits.length < 11) {
      setDigits(prev => [...prev, e.key]);
      setError(null);
    } else if (e.key === 'Backspace') {
      setDigits(prev => prev.slice(0, -1));
      setError(null);
    }
    // block all other keys so input value stays controlled
    e.preventDefault();
  }

  async function handleContinue() {
    if (!isComplete || loading) return;
    setLoading(true);
    const err = await mockValidate(digits.join(''));
    setLoading(false);
    if (err) {
      setError(err);
      setDigits([]);
    } else {
      onContinue(digits.join(''));
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
          <span className="text-[16px] font-semibold text-[#687384]">{navTitle}</span>
          <button
            onClick={onBack}
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
            className="text-[24px] font-semibold leading-[1.2] text-[#161a20] text-center w-full"
            style={{ fontFamily: "'Inter Display', sans-serif" }}
          >
            {error ? 'Digite o CPF do titular' : 'Para começar, digite o CPF do titular'}
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">

            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-4 w-full p-4 bg-[#fcf7f6] rounded-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 5a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2z" fill="#d32222"/>
                </svg>
                <p className="text-[14px] font-normal leading-[1.4] text-[#d32222] flex-1">
                  {ERROR_MESSAGES[error]}
                </p>
              </div>
            )}

            {/* CPF input */}
            <input
              ref={inputRef}
              type="tel"
              readOnly
              value={maskedDisplay}
              placeholder="000.000.000-00"
              onKeyDown={handleKeyDown}
              onClick={() => inputRef.current?.focus()}
              className={`w-full h-14 px-4 border rounded-2xl text-[16px] font-normal outline-none transition-colors cursor-text select-none ${
                error
                  ? 'border-[#d32222] text-[#161a20]'
                  : 'border-[#c8d0da] text-[#161a20] focus:border-[#0078c8]'
              }`}
            />

            {/* Continuar button */}
            <button
              onClick={handleContinue}
              disabled={!isComplete || loading}
              className={`flex items-center justify-center h-14 px-8 rounded-full text-[20px] font-semibold transition-colors ${
                isComplete && !loading
                  ? 'bg-[#0078c8] text-white hover:bg-[#006ab3] cursor-pointer'
                  : 'bg-[#f0f3f7] text-[#8695a7] cursor-not-allowed'
              }`}
            >
              {loading ? (
                <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
