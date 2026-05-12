import { useState } from 'react';
import type { CepData } from './TitularidadeCEP';

interface TitularidadeEnderecoComplementoProps {
  cepData: CepData;
  onBack: () => void;
  onHome: () => void;
  onContinue: (linha1: string, linha2: string) => void;
}

const TIPO_NUMERO_OPTIONS = ['Número', 'S/N', 'Km'];

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">{label}</span>
      <span className="text-[16px] font-medium leading-[1.4] text-[#38404a] truncate">{value || '—'}</span>
    </div>
  );
}

function LabeledField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <span className="text-[12px] font-normal leading-[1.1] text-[#687384]">{label}</span>
      {children}
    </div>
  );
}

export default function TitularidadeEnderecoComplemento({
  cepData, onBack, onHome, onContinue,
}: TitularidadeEnderecoComplementoProps) {
  const [tipoNumero, setTipoNumero] = useState('Número');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  const semNumero = tipoNumero === 'S/N';
  const isValid = semNumero || numero.trim().length > 0;

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
            Complete o endereço para correspondências
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            {/* CEP data card */}
            <div className="flex flex-col gap-4 w-full border border-[#c8d0da] rounded-2xl p-6">
              <div className="flex gap-6">
                <div className="flex-1 min-w-0"><InfoRow label="CEP" value={cepData.cep} /></div>
                <div className="flex-1 min-w-0"><InfoRow label="Bairro" value={cepData.bairro} /></div>
              </div>
              <div className="flex gap-6">
                <div className="flex-1 min-w-0"><InfoRow label="Endereço" value={cepData.logradouro} /></div>
                <div className="flex-1 min-w-0"><InfoRow label="Município" value={cepData.localidade} /></div>
              </div>
            </div>

            {/* Tipo de número + Número */}
            <div className="flex gap-4 w-full items-end">
              <LabeledField label="Tipo de número">
                <div className="relative flex-1">
                  <select
                    value={tipoNumero}
                    onChange={e => {
                      setTipoNumero(e.target.value);
                      if (e.target.value === 'S/N') setNumero('');
                    }}
                    className="w-full h-14 px-4 pr-10 border border-[#c8d0da] rounded-2xl text-[16px] text-[#161a20] bg-white focus:outline-none focus:border-[#0165bd] focus:ring-1 focus:ring-[#0165bd] transition-colors appearance-none cursor-pointer"
                  >
                    {TIPO_NUMERO_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </LabeledField>

              <LabeledField label="Número">
                <input
                  type="text"
                  inputMode="numeric"
                  value={numero}
                  onChange={e => setNumero(e.target.value)}
                  placeholder="Digite o nº"
                  disabled={semNumero}
                  className={`w-[120px] h-14 px-4 border rounded-2xl text-[16px] text-[#161a20] placeholder-[#8695a7] focus:outline-none focus:border-[#0165bd] focus:ring-1 focus:ring-[#0165bd] transition-colors ${
                    semNumero ? 'bg-[#f0f3f7] text-[#8695a7] border-[#c8d0da] cursor-default' : 'border-[#c8d0da]'
                  }`}
                />
              </LabeledField>
            </div>

            {/* Complemento */}
            <LabeledField label="Complemento (opcional)">
              <input
                type="text"
                value={complemento}
                onChange={e => setComplemento(e.target.value)}
                placeholder="Apto, bloco, sala, etc."
                className="w-full h-14 px-4 border border-[#c8d0da] rounded-2xl text-[16px] text-[#161a20] placeholder-[#8695a7] focus:outline-none focus:border-[#0165bd] focus:ring-1 focus:ring-[#0165bd] transition-colors"
              />
            </LabeledField>

            {/* Button */}
            <button
              onClick={isValid ? () => {
                const numStr = semNumero ? 'S/N' : numero.trim();
                const linha1 = [cepData.logradouro, numStr, complemento.trim()].filter(Boolean).join(', ');
                const linha2 = `${cepData.localidade}/${cepData.uf}`;
                onContinue(linha1, linha2);
              } : undefined}
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
