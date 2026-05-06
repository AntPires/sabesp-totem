interface StatusChip {
  label: string;
  variant: 'ativo' | 'cortado' | 'encerrado' | 'sem-faturas';
}

interface ListItem {
  address: string;
  supply: string;
  status: StatusChip;
  info?: string;
  clickable?: boolean;
  onSelect?: () => void;
}

interface ServiceScreenProps {
  title: string;
  heading: string;
  subtitle: string;
  items: ListItem[];
  onBack: () => void;
  onClose?: () => void;
}

const chipStyles: Record<StatusChip['variant'], { bg: string; dot: string; text: string }> = {
  ativo:         { bg: 'bg-[#f0fdef]', dot: 'bg-[#22c55e]', text: 'text-[#15803d]' },
  cortado:       { bg: 'bg-[#fcf7f6]', dot: 'bg-[#d32222]', text: 'text-[#d32222]' },
  encerrado:     { bg: 'bg-[#f6f8fa]', dot: 'bg-[#8695a7]', text: 'text-[#38404a]' },
  'sem-faturas': { bg: 'bg-[#f0fdef]', dot: 'bg-[#22c55e]', text: 'text-[#15803d]' },
};

function Chip({ label, variant }: StatusChip) {
  const s = chipStyles[variant];
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium shrink-0 ${s.bg} ${s.text}`}>
      <span className={`w-[6px] h-[6px] rounded-full shrink-0 ${s.dot}`} />
      {label}
    </span>
  );
}

export default function ServiceScreen({ title, heading, subtitle, items, onBack, onClose }: ServiceScreenProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f0f4fa] to-[#d4e3f9]">
      <div className="absolute inset-4 bg-white rounded-[28px] flex flex-col gap-16 items-center px-[72px] py-8 overflow-hidden">

        {/* Nav */}
        <div className="flex items-center justify-between w-full shrink-0">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-16 h-16 bg-[#f0f3f7] rounded-full cursor-pointer hover:bg-[#e4e8ef] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-[16px] font-semibold text-[#687384]">{title}</span>

          <button
            onClick={onClose ?? onBack}
            className="flex items-center justify-center w-16 h-16 bg-[#f0f3f7] rounded-full cursor-pointer hover:bg-[#e4e8ef] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 items-center w-full max-w-[960px]">
          <div className="text-center flex flex-col gap-2">
            <h2
              className="text-[24px] font-semibold leading-[1.2] text-[#161a20]"
              style={{ fontFamily: "'Inter Display', sans-serif" }}
            >
              {heading}
            </h2>
            <p className="text-[16px] font-normal leading-[1.4] text-[#687384]">{subtitle}</p>
          </div>

          {/* List */}
          <div className="flex flex-col gap-4 w-full">
            {items.map((item, i) => {
              const isClickable = item.clickable ?? false;
              return (
                <div
                  key={i}
                  onClick={isClickable ? item.onSelect : undefined}
                  className={`flex items-center gap-5 w-full px-6 py-5 bg-white border border-[#e0e5eb] rounded-2xl transition-colors ${
                    isClickable
                      ? 'cursor-pointer hover:bg-[#fafbfc]'
                      : 'cursor-default'
                  }`}
                >
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <span className={`text-[16px] font-semibold leading-[1.4] ${
                      !isClickable && (item.status.variant === 'encerrado' || item.status.variant === 'cortado')
                        ? 'text-[#8695a7]'
                        : 'text-[#161a20]'
                    }`}>
                      {item.address}
                    </span>
                    <span className="text-[14px] font-normal leading-[1.4] text-[#687384]">
                      {item.supply}
                    </span>
                  </div>

                  <Chip label={item.status.label} variant={item.status.variant} />

                  {item.info && (
                    <span className="text-[20px] font-semibold leading-[1.2] text-[#161a20] shrink-0">
                      {item.info}
                    </span>
                  )}

                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke={isClickable ? '#161a20' : '#c8d0da'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
