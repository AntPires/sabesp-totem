import { useState, useEffect } from 'react';

export interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface TitularidadeCEPProps {
  onBack: () => void;
  onHome: () => void;
  onContinue: (data: CepData) => void;
}

const base = import.meta.env.BASE_URL;

function maskCep(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function LabeledField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <span className="text-[12px] font-normal leading-[1.1] text-[#687384]">{label}</span>
      {children}
    </div>
  );
}

type Status = 'idle' | 'loading' | 'valid' | 'invalid';

export default function TitularidadeCEP({ onBack, onHome, onContinue }: TitularidadeCEPProps) {
  const [cep, setCep] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [cepData, setCepData] = useState<CepData | null>(null);

  const digits = cep.replace(/\D/g, '');

  useEffect(() => {
    if (digits.length !== 8) {
      setStatus('idle');
      setCepData(null);
      return;
    }

    let cancelled = false;
    setStatus('loading');

    fetch(`https://viacep.com.br/ws/${digits}/json/`)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;
        if (data.erro) {
          setStatus('invalid');
          setCepData(null);
        } else {
          const result: CepData = {
            cep: data.cep ?? cep,
            logradouro: data.logradouro ?? '',
            bairro: data.bairro ?? '',
            localidade: data.localidade ?? '',
            uf: data.uf ?? '',
          };
          setCepData(result);
          setStatus('valid');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('invalid');
      });

    return () => { cancelled = true; };
  }, [digits]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const prev = cep;
    const next = e.target.value;
    if (next.length < prev.length) {
      const d = prev.replace(/\D/g, '');
      setCep(maskCep(d.slice(0, -1)));
    } else {
      setCep(maskCep(next));
    }
  }

  const isValid = status === 'valid';
  const hasError = status === 'invalid';
  const isLoading = status === 'loading';

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
            Digite o CEP do novo endereço de correspondências
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            {/* Info banner */}
            <div className="flex gap-4 items-center bg-[#f6f9fc] rounded-2xl p-4 w-full">
              <img src={`${base}assets/info.svg`} alt="" className="shrink-0 w-6 h-6" />
              <p className="text-[14px] font-normal leading-[1.4] text-[#01529b]">
                Usaremos este endereço para envio de comunicações oficiais. A fatura, por sua vez, será emitida e entregue por um técnico diretamente no imóvel.
              </p>
            </div>

            {/* CEP field */}
            <LabeledField label="CEP">
              <div className="relative w-full">
                <input
                  type="text"
                  inputMode="numeric"
                  value={cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className={`w-full h-14 px-4 border rounded-2xl text-[16px] text-[#161a20] placeholder-[#687384] focus:outline-none transition-colors ${
                    hasError
                      ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]'
                      : isValid
                      ? 'border-[#16a34a] focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]'
                      : 'border-[#c8d0da] focus:border-[#0165bd] focus:ring-1 focus:ring-[#0165bd]'
                  }`}
                />
                {/* Status icon */}
                {isLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="animate-spin w-5 h-5 text-[#687384]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                  </div>
                )}
                {isValid && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {hasError && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
              {hasError && (
                <p className="text-[13px] text-[#dc2626] leading-[1.4] mt-1">
                  CEP não encontrado. Verifique e tente novamente.
                </p>
              )}
            </LabeledField>

            {/* Button */}
            <button
              onClick={isValid && cepData ? () => onContinue(cepData) : undefined}
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
