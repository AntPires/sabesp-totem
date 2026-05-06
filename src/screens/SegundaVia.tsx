import ServiceScreen from '../components/ServiceScreen';

interface SegundaViaProps {
  onBack: () => void;
  onClose: () => void;
  onSelectSupply?: (address: string, supply: string) => void;
}

export default function SegundaVia({ onBack, onClose, onSelectSupply }: SegundaViaProps) {
  const items = [
    {
      address: 'Rua Estevão Pedroso, 390 - Sacomã',
      supply: 'Fornecimento nº 00981247',
      status: { label: 'Ativo', variant: 'ativo' as const },
      clickable: true,
      onSelect: () => onSelectSupply?.('Rua Estevão Pedroso, 390 - Sacomã', 'Fornecimento nº 00981247'),
    },
    {
      address: 'Avenida Ayrton Senna, 44.140 - Vila Olímpia',
      supply: 'Fornecimento nº 00498122',
      status: { label: 'Ativo', variant: 'ativo' as const },
      clickable: true,
      onSelect: () => onSelectSupply?.('Avenida Ayrton Senna, 44.140 - Vila Olímpia', 'Fornecimento nº 00498122'),
    },
    {
      address: 'Rua João Alencar, 22 - Vila Mariana',
      supply: 'Fornecimento nº 00876512',
      status: { label: 'Ativo', variant: 'ativo' as const },
      clickable: true,
      onSelect: () => onSelectSupply?.('Rua João Alencar, 22 - Vila Mariana', 'Fornecimento nº 00876512'),
    },
    {
      address: 'Vila Paulo Augusto, 2 - Morumbi',
      supply: 'Fornecimento nº 00194538',
      status: { label: 'Encerrado', variant: 'encerrado' as const },
      clickable: true,
      onSelect: () => onSelectSupply?.('Vila Paulo Augusto, 2 - Morumbi', 'Fornecimento nº 00194538'),
    },
  ];

  return (
    <ServiceScreen
      title="Segunda via de Faturas"
      heading="Escolha um fornecimento"
      subtitle="E faça a impressão da Segunda via de Faturas"
      items={items}
      onBack={onBack}
      onClose={onClose}
    />
  );
}
