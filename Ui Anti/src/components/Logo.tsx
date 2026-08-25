import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-[11px] tracking-widest'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Friendly Campus AI Robot / Graduation Emblem Icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} flex-shrink-0 group`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Ring & Shield */}
          <circle cx="24" cy="24" r="22" className="fill-blue-50 stroke-blue-600" strokeWidth="2.5" />
          
          {/* Subtle Outer Accent Dots */}
          <circle cx="24" cy="4" r="2.5" className="fill-amber-500" />
          <circle cx="44" cy="24" r="2.5" className="fill-red-500" />
          <circle cx="4" cy="24" r="2.5" className="fill-blue-600" />
          
          {/* Graduation Cap / Modern Shield Crown */}
          <path
            d="M24 10L36 16L24 22L12 16L24 10Z"
            className="fill-blue-600 stroke-blue-700"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Tassel */}
          <path d="M33 17.5V23C33 24 34.5 25 35.5 25" className="stroke-amber-500" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="35.5" cy="25.5" r="1.5" className="fill-amber-500" />

          {/* AI Robot Face / Screen */}
          <rect x="14" y="22" width="20" height="15" rx="6" className="fill-white stroke-slate-200" strokeWidth="1.5" />
          
          {/* Glowing Eyes */}
          <circle cx="19.5" cy="28.5" r="2.5" className="fill-blue-600" />
          <circle cx="28.5" cy="28.5" r="2.5" className="fill-blue-600" />
          <circle cx="20.5" cy="27.5" r="0.8" className="fill-white" />
          <circle cx="29.5" cy="27.5" r="0.8" className="fill-white" />

          {/* Friendly Smile */}
          <path
            d="M21 32.5C22 34 26 34 27 32.5"
            className="stroke-amber-500"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Red Smart AI Core Sparkle */}
          <path
            d="M24 39L25.2 41.5L27.5 42L25.2 42.5L24 45L22.8 42.5L20.5 42L22.8 41.5L24 39Z"
            className="fill-red-500"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className={`font-extrabold leading-tight tracking-tight flex items-center gap-1 ${textSizes[size]}`}>
          <span className="text-[#0F172A] font-extrabold tracking-tight">COLLEGE</span>
          <span className="bg-gradient-to-r from-blue-600 via-amber-500 to-red-500 bg-clip-text text-transparent font-black">
            AI
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-semibold text-slate-500 uppercase ${subtitleSizes[size]} font-mono`}>
            Smart Campus Assistant
          </span>
        )}
      </div>
    </div>
  );
};
