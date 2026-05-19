import { useState } from 'react';

type Screen = 'home' | 'pagamento' | 'segunda-via' | 'titularidade';
type Modal = 'whatsapp' | 'app' | null;
type AppTab = 'android' | 'iphone';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

const base = import.meta.env.BASE_URL;

const services = [
  {
    id: 'pagamento' as Screen,
    icon: `${base}assets/icon-pagamento.svg`,
    label: 'Pagar Faturas',
    description: 'Pague direto pelo totem',
  },
  {
    id: 'segunda-via' as Screen,
    icon: `${base}assets/icon-segunda-via.svg`,
    label: 'Segunda Via',
    description: 'Imprima suas faturas',
  },
  {
    id: 'titularidade' as Screen,
    icon: `${base}assets/icon-titularidade.svg`,
    label: 'Mudança de titularidade',
    description: 'Transferência do fornecimento',
  },
];

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#0165bd"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.312A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.054-1.107l-.291-.173-3.018.791.806-2.944-.19-.302A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" fill="#0165bd"/>
    </svg>
  );
}

function IconSmartphone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H7V4h10v12zm-5 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#0165bd"/>
    </svg>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#f0f3f7] transition-colors shrink-0"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default function Home({ onNavigate }: HomeProps) {
  const [modal, setModal] = useState<Modal>(null);
  const [appTab, setAppTab] = useState<AppTab>('android');

  return (
    <div className="flex w-full h-full bg-white relative">
      {/* Left panel */}
      <div className="flex flex-col items-center justify-between w-[695px] h-full px-[80px] py-[56px] shrink-0">
        <div className="flex flex-col items-center gap-8 w-full max-w-[352px]">
          <img src={`${base}assets/logosabesp.svg`} alt="Sabesp" className="h-9 object-contain" />
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
                  <span className="text-[16px] font-medium leading-[1.4] text-[#38404a]">{service.label}</span>
                  <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">{service.description}</span>
                </div>
                <img src={`${base}assets/icon-chevron.svg`} alt="" className="shrink-0 w-6 h-6" />
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#38404a]">
          <span>Loja Morumbi</span>
          <span className="w-1 h-1 rounded-full bg-[#38404a]" />
          <span>Termo de uso</span>
        </div>
      </div>

      {/* Right panel — illustration */}
      <div className="flex-1 h-full overflow-hidden relative">
        <img
          src={`${base}assets/illustration-home.png`}
          alt=""
          className="w-full h-full object-cover object-top"
        />

        {/* Links úteis card */}
        <div className="absolute bottom-14 left-[163px] w-[344px] bg-white rounded-2xl p-8 shadow-lg flex flex-col gap-6">
          <span
            className="text-[20px] font-semibold leading-[1.2] text-[#161a20]"
            style={{ fontFamily: "'Inter Display', sans-serif" }}
          >
            Links úteis
          </span>
          <div className="flex flex-col gap-2">
            {/* WhatsApp */}
            <button
              onClick={() => setModal('whatsapp')}
              className="flex items-center gap-3 p-4 border border-[#c8d0da] rounded-2xl hover:bg-[#f8f9fa] transition-colors text-left"
            >
              <IconWhatsApp />
              <span className="flex-1 text-[14px] font-medium leading-[1.4] text-[#38404a]">Sabesp no WhatsApp</span>
              <img src={`${base}assets/icon-chevron.svg`} alt="" className="w-6 h-6 shrink-0" />
            </button>
            {/* App */}
            <button
              onClick={() => setModal('app')}
              className="flex items-center gap-3 p-4 border border-[#c8d0da] rounded-2xl hover:bg-[#f8f9fa] transition-colors text-left"
            >
              <IconSmartphone />
              <span className="flex-1 text-[14px] font-medium leading-[1.4] text-[#38404a]">Baixe o app Sabesp</span>
              <img src={`${base}assets/icon-chevron.svg`} alt="" className="w-6 h-6 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {modal && (
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-[408px] flex flex-col gap-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* WhatsApp modal */}
            {modal === 'whatsapp' && (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-2 justify-between">
                    <h2
                      className="text-[24px] font-semibold leading-[1.2] text-[#161a20] flex-1"
                      style={{ fontFamily: "'Inter Display', sans-serif" }}
                    >
                      Fale com a Sabesp no seu WhatsApp
                    </h2>
                    <CloseButton onClick={() => setModal(null)} />
                  </div>
                  <p className="text-[16px] font-normal leading-[1.4] text-[#38404a]">
                    Leia o código QR com a camera do seu celular e fale conosco. Fácil, rápido e sempre com você
                  </p>
                </div>
                <div className="flex items-center justify-center bg-[#f6f8fa] rounded-2xl p-2">
                  <img
                    src={`${base}assets/qrcodes/qr-wpp.png`}
                    alt="QR Code WhatsApp"
                    className="w-[280px] h-[280px] object-contain"
                  />
                </div>
              </>
            )}

            {/* App modal */}
            {modal === 'app' && (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-2 justify-between">
                    <h2
                      className="text-[24px] font-semibold leading-[1.2] text-[#161a20] flex-1"
                      style={{ fontFamily: "'Inter Display', sans-serif" }}
                    >
                      Baixe o app Sabesp no seu celular e ganhe praticidade
                    </h2>
                    <CloseButton onClick={() => setModal(null)} />
                  </div>
                  <p className="text-[16px] font-normal leading-[1.4] text-[#38404a]">
                    Leia o código QR com a camera do seu celular e instale o app. Fácil, rápido e sempre com você
                  </p>
                  {/* Tabs */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAppTab('android')}
                      className={`px-3 py-2 text-[14px] font-semibold rounded-full transition-colors ${
                        appTab === 'android'
                          ? 'bg-[#0165bd] text-white'
                          : 'bg-[#f6f8fa] text-[#687384] rounded-lg'
                      }`}
                    >
                      Android
                    </button>
                    <button
                      onClick={() => setAppTab('iphone')}
                      className={`px-3 py-2 text-[14px] font-semibold rounded-full transition-colors ${
                        appTab === 'iphone'
                          ? 'bg-[#0165bd] text-white'
                          : 'bg-[#f6f8fa] text-[#687384] rounded-lg'
                      }`}
                    >
                      iPhone
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-[#f6f8fa] rounded-2xl p-2">
                  <img
                    src={`${base}assets/qrcodes/${appTab === 'android' ? 'qr-android.png' : 'qr-iphone.png'}`}
                    alt={`QR Code ${appTab === 'android' ? 'Android' : 'iPhone'}`}
                    className="w-[280px] h-[280px] object-contain"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
