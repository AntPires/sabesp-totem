import ServiceScreen from '../components/ServiceScreen';

interface TitularidadeProps {
  onBack: () => void;
}

const items = [
  { address: 'Rua Estevão Pedroso, 390 - Sacomã', supply: 'Fornecimento nº 0091***', status: { label: 'Ativo', variant: 'ativo' as const } },
  { address: 'Rua João Meirelles Silva, 440 - Bela Vista', supply: 'Fornecimento nº 0042***', status: { label: 'Ativo', variant: 'ativo' as const } },
  { address: 'Rua Comendador Gabriel Calfat, 391 - Vila Sonia', supply: 'Fornecimento nº 0088***', status: { label: 'Cortado', variant: 'cortado' as const } },
  { address: 'Avenida Moraes Fragata, 2.400 - Sacomã', supply: 'Fornecimento nº 0040***', status: { label: 'Encerrado', variant: 'encerrado' as const } },
];

export default function Titularidade({ onBack }: TitularidadeProps) {
  return (
    <ServiceScreen
      title="Mudança de titularidade"
      heading="Escolha o fornecimento deste titular"
      subtitle="Apenas fornecimentos ativos podem ser transferidos"
      items={items}
      onBack={onBack}
    />
  );
}
