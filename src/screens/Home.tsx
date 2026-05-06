type Screen = 'home' | 'pagamento' | 'segunda-via' | 'titularidade';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

const services = [
  {
    id: 'pagamento' as Screen,
    icon: '/assets/icon-pagamento.svg',
    label: 'Pagar Faturas',
    description: 'Pague direto pelo totem',
  },
  {
    id: 'segunda-via' as Screen,
    icon: '/assets/icon-segunda-via.svg',
    label: 'Segunda Via',
    description: 'Imprima suas faturas',
  },
  {
    id: 'titularidade' as Screen,
    icon: '/assets/icon-titularidade.svg',
    label: 'Mudança de titularidade',
    description: 'Transferência do fornecimento',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="flex w-full h-full bg-white">
      {/* Left panel */}
      <div className="flex flex-col items-center justify-between w-[695px] h-full px-[80px] py-[56px]">
        <div className="flex flex-col items-center gap-8 w-full max-w-[352px]">
          {/* Logo */}
          <img src="/assets/logosabesp.svg" alt="Sabesp" className="h-9 object-contain" />

          {/* Heading */}
          <div className="flex flex-col gap-2 text-center w-full">
            <h1
              className="text-[32px] font-semibold leading-[36px] text-[#161a20]"
              style={{ fontFamily: "'Inter Display', sans-serif" }}
            >
              Boas-vindas à Sabesp
            </h1>
            <p className="text-[16px] font-normal leading-[1.4] text-[#38404a]">
              Escolha seu serviço abaixo
            </p>
          </div>
        </div>

        {/* Service list */}
        <div className="flex flex-col gap-4 w-full max-w-[352px]">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onNavigate(service.id)}
              className="content-center flex flex-wrap items-center gap-y-3 p-6 w-full bg-white border border-[#c8d0da] rounded-2xl cursor-pointer text-left hover:bg-[#f8f9fa] transition-colors"
            >
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <img src={service.icon} alt="" className="shrink-0 w-6 h-6" />
                <div className="flex flex-col gap-1 flex-1 min-w-0 justify-center">
                  <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">
                    {service.label}
                  </span>
                  <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">
                    {service.description}
                  </span>
                </div>
                <img src="/assets/icon-chevron.svg" alt="" className="shrink-0 w-6 h-6" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#38404a]">
          <span>Loja Morumbi</span>
          <span className="w-1 h-1 rounded-full bg-[#38404a]" />
          <span>Termo de uso</span>
        </div>
      </div>

      {/* Right panel — illustration */}
      <div className="flex-1 h-full overflow-hidden">
        <img
          src="/assets/illustration-home.png"
          alt=""
          className="w-full h-full object-cover object-left"
        />
      </div>
    </div>
  );
}
