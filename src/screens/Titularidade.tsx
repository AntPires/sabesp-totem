import ServiceScreen from '../components/ServiceScreen';

interface TitularidadeProps {
  onBack: () => void;
  onClose: () => void;
  onSelectSupply: (address: string, supply: string) => void;
}

export default function Titularidade({ onBack, onClose, onSelectSupply }: TitularidadeProps) {
  const items = [
    {
      address: 'Rua Estevão Pedroso, 390 - Sacomã',
      supply: '9734082001',
      status: { label: 'Ativo', variant: 'ativo' as const },
      clickable: true,
      onSelect: () => onSelectSupply('Rua Estevão Pedroso, 390 - Sacomã', '9734082001'),
    },
    {
      address: 'Rua João Meirelles Silva, 440 - Bela Vista',
      supply: '9734082002',
      status: { label: 'Ativo', variant: 'ativo' as const },
      clickable: true,
      onSelect: () => onSelectSupply('Rua João Meirelles Silva, 440 - Bela Vista', '9734082002'),
    },
    {
      address: 'Rua Comendador Gabriel Calfat, 391 - Vila Sonia',
      supply: '9734082003',
      status: { label: 'Cortado', variant: 'cortado' as const },
      clickable: false,
    },
    {
      address: 'Avenida Moraes Fragata, 2.400 - Sacomã',
      supply: '9734082004',
      status: { label: 'Encerrado', variant: 'encerrado' as const },
      clickable: false,
    },
  ];

  return (
    <ServiceScreen
      title="Mudança de titularidade"
      heading="Escolha o fornecimento deste titular"
      subtitle="Apenas fornecimentos ativos podem ser transferidos"
      items={items}
      onBack={onBack}
      onClose={onClose}
    />
  );
}
