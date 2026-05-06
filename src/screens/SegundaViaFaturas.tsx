import { useState } from 'react';

interface Invoice {
  id: number;
  month: string;
  year: string;
  dueDate: string;
  status: 'em-aberto' | 'em-atraso' | 'paga';
  amount: number;
}

interface SegundaViaFaturasProps {
  address: string;
  supply: string;
  onBack: () => void;
  onHome: () => void;
  onContinue: () => void;
}

const currentYear: Invoice[] = [
  { id: 1, month: 'Abril',     year: '2026', dueDate: '05/04/2026', status: 'em-aberto', amount: 121.11 },
  { id: 2, month: 'Março',     year: '2026', dueDate: '05/03/2026', status: 'em-atraso', amount: 115.42 },
  { id: 3, month: 'Fevereiro', year: '2026', dueDate: '05/02/2026', status: 'em-atraso', amount: 142.92 },
  { id: 4, month: 'Janeiro',   year: '2026', dueDate: '05/01/2026', status: 'paga',      amount: 142.92 },
];

const previousYear: Invoice[] = [
  { id: 5, month: 'Dezembro',  year: '2025', dueDate: '05/12/2025', status: 'paga', amount: 132.10 },
  { id: 6, month: 'Novembro',  year: '2025', dueDate: '05/11/2025', status: 'paga', amount: 118.75 },
];

const chipStyles = {
  'em-aberto': { bg: 'bg-[#fdf8ef]', dot: 'bg-[#d49500]', text: 'text-[#855e00]', label: 'Em aberto' },
  'em-atraso': { bg: 'bg-[#fcf7f6]', dot: 'bg-[#d32222]', text: 'text-[#d32222]', label: 'Em atraso' },
  'paga':      { bg: 'bg-[#f0fdef]', dot: 'bg-[#22c55e]', text: 'text-[#15803d]', label: 'Paga' },
};

function InvoiceRow({ inv, selected, onToggle }: { inv: Invoice; selected: boolean; onToggle: () => void }) {
  const chip = chipStyles[inv.status];
  return (
    <div
      onClick={onToggle}
      className={`flex items-center gap-5 w-full pl-5 pr-8 py-5 rounded-2xl cursor-pointer transition-colors border ${
        selected ? 'bg-[#f6f9fc] border-[#86b8f3]' : 'bg-white border-[#e0e5eb] hover:bg-[#fafbfc]'
      }`}
    >
      {/* Checkbox */}
      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
        {selected ? (
          <div className="w-5 h-5 bg-[#0165bd] rounded-[8px] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 border border-[#c8d0da] rounded-[8px]" />
        )}
      </div>

      {/* Month + due date */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex gap-1 items-baseline">
          <span className="text-[16px] font-semibold leading-[1.4] text-[#161a20]">{inv.month},</span>
          <span className="text-[16px] font-normal leading-[1.4] text-[#161a20]">{inv.year}</span>
        </div>
        <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">Vencimento: {inv.dueDate}</span>
      </div>

      {/* Status chip */}
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium shrink-0 ${chip.bg} ${chip.text}`}>
        <span className={`w-[6px] h-[6px] rounded-full shrink-0 ${chip.dot}`} />
        {chip.label}
      </span>

      {/* Amount */}
      <div className="flex items-baseline gap-1 shrink-0 text-[#161a20]">
        <span className="text-[20px] font-semibold leading-[1.2]">R$</span>
        <span className="text-[20px] font-semibold leading-[1.2]">
          {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>

    </div>
  );
}

export default function SegundaViaFaturas({ address, supply, onBack, onHome, onContinue }: SegundaViaFaturasProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const count = selected.size;

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f0f4fa] to-[#d4e3f9]">
      <div className="absolute inset-4 bg-white rounded-[28px] flex flex-col overflow-hidden">

        {/* Nav — fixed, não scrolla */}
        <div className="flex items-center justify-between w-full shrink-0 px-[72px] pt-8 pb-6">
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto min-h-0 px-[72px]">
          <div className="flex flex-col gap-10 items-center w-full max-w-[960px] mx-auto pb-6">

            {/* Header */}
            <div className="flex items-center justify-between w-full shrink-0">
              <div className="flex flex-col gap-2">
                <h2
                  className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
                  style={{ fontFamily: "'Inter Display', sans-serif" }}
                >
                  Faturas disponíveis para impressão
                </h2>
                <p className="text-[16px] font-normal leading-[1.4] text-[#687384]">
                  Selecione as faturas que deseja imprimir
                </p>
              </div>

              {/* Address card */}
              <div className="flex items-center gap-4 px-6 py-4 bg-white border border-[#e0e5eb] rounded-2xl shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}assets/icon-home.svg`}
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
                <div className="flex flex-col gap-[2px] max-w-[224px]">
                  <span className="text-[14px] font-medium leading-[1.4] text-[#38404a] truncate">{address}</span>
                  <span className="text-[14px] font-normal leading-[1.4] text-[#687384] truncate">{supply}</span>
                </div>
              </div>
            </div>

            {/* Invoice list */}
            <div className="flex flex-col gap-4 w-full">
              {/* Current year */}
              {currentYear.map(inv => (
                <InvoiceRow key={inv.id} inv={inv} selected={selected.has(inv.id)} onToggle={() => toggle(inv.id)} />
              ))}

              {/* Section label */}
              <div className="flex items-center px-4 py-2">
                <span className="text-[16px] font-semibold leading-[1.4] text-[#687384]">Ano anterior</span>
              </div>

              {/* Previous year */}
              {previousYear.map(inv => (
                <InvoiceRow key={inv.id} inv={inv} selected={selected.has(inv.id)} onToggle={() => toggle(inv.id)} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        {count > 0 && (
          <div className="shrink-0 bg-white border-t-2 border-[#e0e5eb] flex items-center justify-between px-16 py-6 h-[103px]">
            <span className="text-[16px] font-medium leading-[1.1] text-[#687384]">
              {count} {count === 1 ? 'fatura selecionada' : 'faturas selecionadas'}
            </span>
            <button
              onClick={onContinue}
              className="flex items-center justify-center px-8 py-4 bg-[#0165bd] text-white text-[20px] font-semibold rounded-full hover:bg-[#0058a8] transition-colors"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
