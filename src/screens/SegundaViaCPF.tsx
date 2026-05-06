import PagamentoCPF from './PagamentoCPF';

interface SegundaViaCPFProps {
  onBack: () => void;
  onContinue: (cpf: string) => void;
}

export default function SegundaViaCPF({ onBack, onContinue }: SegundaViaCPFProps) {
  return (
    <PagamentoCPF
      navTitle="Segunda via de Faturas"
      onBack={onBack}
      onContinue={onContinue}
    />
  );
}
