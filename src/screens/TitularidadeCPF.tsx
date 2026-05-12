import PagamentoCPF from './PagamentoCPF';

interface TitularidadeCPFProps {
  onBack: () => void;
  onContinue: (cpf: string) => void;
}

export default function TitularidadeCPF({ onBack, onContinue }: TitularidadeCPFProps) {
  return (
    <PagamentoCPF
      navTitle="Mudança de titularidade"
      heading="Digite o CPF do titular atual do imóvel"
      onBack={onBack}
      onContinue={onContinue}
    />
  );
}
