const base = import.meta.env.BASE_URL;

interface TitularidadeResumoProps {
  supply: string;
  novoTitular: { nome: string; cpf: string; data: string };
  correspondencia: { linha1: string; linha2: string };
  diaVencimento: number;
  onBack: () => void;
  onHome: () => void;
  onConfirmar: () => void;
}

function formatCpf(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.length !== 11) return digits;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function Divider() {
  return <hr className="border-t border-[#e5e9ef] w-full" />;
}

function DataItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">{label}</span>
      <div className="text-[16px] font-medium leading-[1.4] text-[#38404a]">{children}</div>
    </div>
  );
}

export default function TitularidadeResumo({
  supply, novoTitular, correspondencia, diaVencimento, onBack, onHome, onConfirmar,
}: TitularidadeResumoProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f0f4fa] to-[#d4e3f9]">
      <div className="absolute inset-4 bg-white rounded-[28px] flex flex-col items-center px-[72px] py-8 overflow-hidden">

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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto min-h-0 w-full flex flex-col items-center py-8 gap-6">
          <h2
            className="text-[24px] font-semibold leading-[1.2] text-[#161a20] text-center w-full max-w-[420px] shrink-0"
            style={{ fontFamily: "'Inter Display', sans-serif" }}
          >
            Agora é só confirmar os dados da sua solicitação
          </h2>

          {/* Summary card */}
          <div className="flex flex-col gap-5 w-full max-w-[420px] border border-[#c8d0da] rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center gap-2">
              <img src={`${base}assets/text_snippet.svg`} alt="" className="w-6 h-6 shrink-0" />
              <span className="text-[16px] font-semibold leading-[1.1] text-[#38404a]">
                Transferência de titularidade
              </span>
            </div>

            <Divider />

            <DataItem label="Fornecimento">
              {supply}
            </DataItem>

            <Divider />

            <DataItem label="Titular">
              <p>{novoTitular.nome}</p>
              <p>{formatCpf(novoTitular.cpf)}</p>
            </DataItem>

            <DataItem label="Data de nascimento">
              {novoTitular.data}
            </DataItem>

            <Divider />


            <DataItem label="Correspondências">
              <p>{correspondencia.linha1}</p>
              <p className="text-[14px] font-normal text-[#687384]">{correspondencia.linha2}</p>
            </DataItem>

            <Divider />

            <DataItem label="Dia de vencimento">
              Todo dia {String(diaVencimento).padStart(2, '0')}
            </DataItem>
          </div>

          {/* Terms */}
          <p className="text-[14px] font-normal leading-[1.4] text-[#687384] w-full max-w-[420px]">
            Ao confirmar, declaro que li e concordo com os termos descritos no{' '}
            <a
              href="https://www.sabesp.com.br/site/toq/sabesp-contrato-adesao.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2371e7] underline"
            >
              Contrato de Adesão
            </a>
            .
          </p>
        </div>

        {/* Fixed bottom button */}
        <div className="shrink-0 w-full flex justify-end pb-2 pt-4">
          <button
            onClick={onConfirmar}
            className="flex items-center justify-center px-8 py-4 bg-[#0165bd] text-white text-[20px] font-semibold rounded-full hover:bg-[#0058a8] transition-colors"
          >
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
}
