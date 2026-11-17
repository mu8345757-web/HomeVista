import React from 'react';
import { PropertyCategory } from '../types/property';

export const HomeVistaLogo: React.FC<{ dark?: boolean; compact?: boolean }> = ({
  dark = false,
  compact = false,
}) => (
  <div className="flex items-center gap-2.5 shrink-0 select-none">
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 4L4 15.5V30.5C4 31.3284 4.67157 32 5.5 32H14.5V22.5H21.5V32H30.5C31.3284 32 32 31.3284 32 30.5V15.5L18 4Z"
        stroke={dark ? '#25A063' : '#1B7A4B'}
        strokeWidth="3"
        strokeLinejoin="round"
        fill={dark ? 'rgba(37, 160, 99, 0.14)' : 'rgba(27, 122, 75, 0.08)'}
      />
      <path
        d="M13 18.5L16.8 22.3L23.5 14.5"
        stroke={dark ? '#25A063' : '#1B7A4B'}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div className="flex flex-col leading-none">
      <span
        className={`font-display text-[19px] font-bold tracking-tight whitespace-nowrap ${
          dark ? 'text-white' : 'text-[#14211A]'
        }`}
      >
        HomeVista
      </span>
      {!compact && (
        <span
          className={`text-[10px] font-medium tracking-wide whitespace-nowrap mt-0.5 ${
            dark ? 'text-emerald-200/75' : 'text-[#5A6B62]'
          }`}
        >
          Find. Buy. Live Better.
        </span>
      )}
    </div>
  </div>
);

export const PropertyTypeIllustration: React.FC<{
  type: PropertyCategory;
  className?: string;
}> = ({ type, className = 'w-11 h-11' }) => {
  switch (type) {
    case 'Apartments':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="13" y="8" width="22" height="33" rx="1.5" fill="#DCE8F5" stroke="#1E3A5F" strokeWidth="1.6" />
          <rect x="6" y="18" width="7" height="23" rx="1" fill="#B8CEE8" stroke="#1E3A5F" strokeWidth="1.5" />
          <rect x="35" y="21" width="7" height="20" rx="1" fill="#B8CEE8" stroke="#1E3A5F" strokeWidth="1.5" />
          <rect x="17" y="13" width="4" height="4" fill="#3B82F6" />
          <rect x="27" y="13" width="4" height="4" fill="#3B82F6" />
          <rect x="17" y="20" width="4" height="4" fill="#3B82F6" />
          <rect x="27" y="20" width="4" height="4" fill="#3B82F6" />
          <rect x="17" y="27" width="4" height="4" fill="#3B82F6" />
          <rect x="27" y="27" width="4" height="4" fill="#3B82F6" />
          <rect x="21" y="34" width="6" height="7" fill="#1B7A4B" />
          <path d="M4 41H44" stroke="#1E3A5F" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'Houses':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M9 22L24 10L39 22V40H9V22Z" fill="#FFF4E5" stroke="#2D3A34" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 23L24 8.5L42 23" stroke="#D97706" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="19" y="27" width="10" height="13" rx="1" fill="#B45309" />
          <rect x="13" y="25" width="4" height="5" fill="#93C5FD" stroke="#2D3A34" strokeWidth="1.2" />
          <rect x="31" y="25" width="4" height="5" fill="#93C5FD" stroke="#2D3A34" strokeWidth="1.2" />
          <circle cx="8" cy="36" r="4" fill="#22C55E" />
          <circle cx="40" cy="36" r="3.5" fill="#16A34A" />
          <path d="M4 40H44" stroke="#2D3A34" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'Villas':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="14" y="18" width="24" height="19" rx="1" fill="#F1F5F9" stroke="#1E293B" strokeWidth="1.6" />
          <path d="M12 18L26 11L40 18H12Z" fill="#0F766E" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="19" y="22" width="14" height="8" rx="1" fill="#7DD3FC" stroke="#1E293B" strokeWidth="1.3" />
          <path d="M10 38H42V42H10V38Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.3" />
          <path d="M9 38V26" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 26C5 23 4 25 4 25C7 26 9 26 9 26ZM9 26C13 23 15 25 15 25C12 26 9 26 9 26ZM9 26C7 21 9 19 9 19C10 22 9 26 9 26Z" fill="#16A34A" />
        </svg>
      );
    case 'Condos':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="14" y="7" width="16" height="34" rx="1" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="30" y="15" width="9" height="26" rx="1" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.6" />
          <path d="M18 12H26M18 17H26M18 22H26M18 27H26M18 32H26" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <path d="M33 20H36M33 25H36M33 30H36" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="36" r="4" fill="#22C55E" />
          <path d="M4 41H44" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'Townhouses':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M7 23L16 14L25 23V40H7V23Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M23 21L32 11L41 21V40H23V21Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="13" y="30" width="5" height="10" fill="#334155" />
          <rect x="29" y="29" width="6" height="11" fill="#1B7A4B" />
          <rect x="13" y="21" width="5" height="5" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.2" />
          <rect x="29" y="20" width="6" height="5" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.2" />
          <path d="M4 40H44" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'Land':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M8 38L14 24H34L40 38H8Z" fill="#BBF7D0" stroke="#166534" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18 38L21 24M30 38L27 24M11 31H37" stroke="#15803D" strokeWidth="1.3" strokeDasharray="2 2" />
          <path
            d="M24 9C19.58 9 16 12.58 16 17C16 22.8 24 31 24 31C24 31 32 22.8 32 17C32 12.58 28.42 9 24 9Z"
            fill="#EA580C"
            stroke="#7C2D12"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="17" r="3" fill="#FFF" />
        </svg>
      );
  }
};
