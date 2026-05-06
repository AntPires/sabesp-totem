import ServiceScreen from '../components/ServiceScreen';

interface SegundaViaProps {
  onBack: () => void;
}

const items = [
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00981247', status: { label: 'Ativo', variant: 'ativo' as const } },
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00654312', status: { label: 'Ativo', variant: 'ativo' as const } },
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00741258', status: { label: 'Cortado', variant: 'cortado' as const } },
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00321654', status: { label: 'Encerrado', variant: 'encerrado' as const } },
];

export default function SegundaVia({ onBack }: SegundaViaProps) {
  return (
    <ServiceScreen
      title="Segunda via de Faturas"
      heading="Escolha um fornecimento"
      subtitle="E faça a impressão da Segunda via de Faturas"
      items={items}
      onBack={onBack}
    />
  );
}
