interface NavBarProps {
  title: string;
  onBack: () => void;
}

export default function NavBar({ title, onBack }: NavBarProps) {
  return (
    <div className="flex items-center h-[64px] px-6 border-b border-[#c8d0da] shrink-0">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#38404a] font-medium text-[14px] cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#38404a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Voltar
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 font-semibold text-[16px] text-[#161a20]">
        {title}
      </span>
    </div>
  );
}
