import ServiceScreen from '../components/ServiceScreen';

interface PagamentoProps {
  onBack: () => void;
  onSelectSupply: (address: string, supply: string) => void;
}

export default function Pagamento({ onBack, onSelectSupply }: PagamentoProps) {
  const items = [
    {
      address: 'Rua Estevão Pedroso, 390 - Sacomã',
      supply: 'Fornecimento nº 00981247',
      status: { label: 'Ativo', variant: 'ativo' as const },
      info: '2 faturas em aberto',
      clickable: true,
      onSelect: () => onSelectSupply('Rua Estevão Pedroso, 390 - Sacomã', 'Fornecimento nº 00981247'),
    },
    {
      address: 'Avenida Ayrton Senna, 44.140 - Vila Olímpia',
      supply: 'Fornecimento nº 00498122',
      status: { label: 'Ativo', variant: 'ativo' as const },
      info: '1 fatura em aberto',
      clickable: true,
      onSelect: () => onSelectSupply('Avenida Ayrton Senna, 44.140 - Vila Olímpia', 'Fornecimento nº 00498122'),
    },
    {
      address: 'Rua João Alencar, 22 - Vila Mariana',
      supply: 'Fornecimento nº 00876512',
      status: { label: 'Ativo', variant: 'ativo' as const },
      info: 'Sem faturas em aberto',
      clickable: false,
    },
    {
      address: 'Vila Paulo Augusto, 2 - Morumbi',
      supply: 'Fornecimento nº 00194538',
      status: { label: 'Encerrado', variant: 'encerrado' as const },
      clickable: false,
    },
  ];

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
