interface TitularidadeConfirmacaoProps {
  nome: string;
  cpf: string;
  dataNascimento: string;
  onBack: () => void;
  onHome: () => void;
  onConfirmar: () => void;
}

function formatCpf(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.length !== 11) return digits;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">{label}</span>
      <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">{value}</span>
    </div>
  );
}

export default function TitularidadeConfirmacao({
  nome, cpf, dataNascimento, onBack, onHome, onConfirmar,
}: TitularidadeConfirmacaoProps) {
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
            Confirme seus dados para ser o novo titular
          </h2>

          <div className="flex flex-col gap-6 items-end w-full">
            {/* Data card */}
            <div className="flex flex-col gap-4 w-full border border-[#c8d0da] rounded-2xl p-6">
              <DataRow label="Nome completo" value={nome} />
              <DataRow label="CPF" value={formatCpf(cpf)} />
              <DataRow label="Data de nascimento" value={dataNascimento} />
            </div>

            {/* Terms */}
            <p className="text-[14px] font-normal leading-[1.4] text-[#687384] w-full">
              Ao confirmar, declaro que serei o novo titular responsável pelas faturas deste fornecimento. Caso seja comprovada a falsidade das informações, serei responsabilizado civil e criminalmente. Se deixar de ser responsável pelas faturas deste fornecimento, estou ciente de que devo solicitar o encerramento contratual à Sabesp. Caso contrário, continuarei responsável pelos débitos deste fornecimento.
            </p>

            <button
              onClick={onConfirmar}
              className="flex items-center justify-center px-8 py-4 bg-[#0165bd] text-white text-[20px] font-semibold rounded-full hover:bg-[#0058a8] transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
