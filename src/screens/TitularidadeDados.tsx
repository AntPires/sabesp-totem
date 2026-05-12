import { useState } from 'react';

interface TitularidadeDadosProps {
  onBack: () => void;
  onHome: () => void;
  onContinue: (nome: string, data: string) => void;
}

function hasNameAndSurname(value: string): boolean {
  const parts = value.trim().split(/\s+/);
  return parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0;
}

function maskDate(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function isDateValid(value: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

  const [dayStr, monthStr, yearStr] = value.split('/');
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // Mês 1–12
  if (month < 1 || month > 12) return false;

  // Ano mínimo
  if (year < 1900) return false;

  // Dia válido para o mês/ano (Jan Date overflow trick)
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return false;

  // Mínimo 18 anos
  const today = new Date();
  const cutoff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return date <= cutoff;
}

function LabeledField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <span className="text-[12px] font-normal leading-[1.1] text-[#687384]">{label}</span>
      {children}
    </div>
  );
}

export default function TitularidadeDados({ onBack, onHome, onContinue }: TitularidadeDadosProps) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

  const isValid = hasNameAndSurname(nome) && isDateValid(data);

  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    const prev = data;
    const next = e.target.value;
    // Allow backspace through the slash characters
    if (next.length < prev.length) {
      const digits = prev.replace(/\D/g, '');
      setData(maskDate(digits.slice(0, -1)));
    } else {
      setData(maskDate(next));
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
            Preencha os dados do novo titular
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            <LabeledField label="Nome completo">
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="João da Silva"
                className="w-full h-14 px-4 border border-[#c8d0da] rounded-2xl text-[16px] text-[#161a20] placeholder-[#687384] focus:outline-none focus:border-[#0165bd] focus:ring-1 focus:ring-[#0165bd] transition-colors"
              />
            </LabeledField>

            <LabeledField label="Data de Nascimento">
              <input
                type="text"
                inputMode="numeric"
                value={data}
                onChange={handleDataChange}
                placeholder="00/00/0000"
                className="w-full h-14 px-4 border border-[#c8d0da] rounded-2xl text-[16px] text-[#161a20] placeholder-[#687384] focus:outline-none focus:border-[#0165bd] focus:ring-1 focus:ring-[#0165bd] transition-colors"
              />
            </LabeledField>

            <button
              onClick={isValid ? () => onContinue(nome, data) : undefined}
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
