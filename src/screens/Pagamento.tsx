import ServiceScreen from '../components/ServiceScreen';

interface PagamentoProps {
  onBack: () => void;
}

const items = [
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00981247', status: { label: 'Ativo', variant: 'ativo' as const }, info: '2 faturas em aberto' },
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00654312', status: { label: 'Ativo', variant: 'ativo' as const }, info: 'Sem faturas em aberto' },
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00741258', status: { label: 'Cortado', variant: 'cortado' as const } },
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 00321654', status: { label: 'Encerrado', variant: 'encerrado' as const } },
];

export default function Pagamento({ onBack }: PagamentoProps) {
  return (
    <ServiceScreen
      title="Pagamento de Faturas"
      heading="Escolha um fornecimento ativo"
      subtitle="E efetue o pagamento de faturas em aberto"
      items={items}
      onBack={onBack}
    />
  );
}
