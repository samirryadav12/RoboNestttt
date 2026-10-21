import Link from "next/link";

interface RoboLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function RoboLogo({ size = 40, showText = true, className = "" }: RoboLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group transition-transform hover:scale-[1.02] ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-2xl bg-[#1E252B] shadow-sm group-hover:bg-[#2A333C] transition-colors"
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 48 48" 
          width={size} 
          height={size} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:rotate-12 duration-300"
        >
          <rect width="48" height="48" rx="12" fill="#1E252B" />
          <circle cx="24" cy="24" r="14" fill="#FFFFFF" />
          <circle cx="24" cy="24" r="10" fill="#1E252B" />
          <circle cx="20" cy="22" r="2.2" fill="#FFFFFF" />
          <circle cx="28" cy="22" r="2.2" fill="#FFFFFF" />
          <path d="M19 28C20.5 30 23.5 31 24 31C24.5 31 27.5 30 29 28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Gear cog teeth */}
          <rect x="22" y="6" width="4" height="4" rx="1" fill="#FFFFFF" />
          <rect x="22" y="38" width="4" height="4" rx="1" fill="#FFFFFF" />
          <rect x="6" y="22" width="4" height="4" rx="1" fill="#FFFFFF" />
          <rect x="38" y="22" width="4" height="4" rx="1" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-[#181A1C]">
              Robo<span className="text-brand-500">Nest</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700">Lab</span>
          </div>
          <span className="text-xs text-slate-500 font-medium tracking-tight">Educational Robotics</span>
        </div>
      )}
    </Link>
  );
}
