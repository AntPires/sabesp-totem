import PagamentoCPF from './PagamentoCPF';

interface TitularidadeCPFNovoProps {
  onBack: () => void;
  onContinue: (cpf: string) => void;
}

export default function TitularidadeCPFNovo({ onBack, onContinue }: TitularidadeCPFNovoProps) {
  return (
    <PagamentoCPF
      navTitle="Mudança de titularidade"
      heading="Digite o CPF do novo titular"
      onBack={onBack}
      onContinue={onContinue}
    />
  );
}
