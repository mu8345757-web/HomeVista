import React, { useState } from 'react';
import { Home } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
  variant?: 'property' | 'avatar';
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  variant = 'property',
  ...props
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    if (variant === 'avatar') {
      const initials = (fallbackLabel || alt || 'HV')
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();
      return (
        <div
          className={`flex items-center justify-center bg-[#E7F2EC] text-[#1B7A4B] font-display font-bold select-none ${className}`}
          aria-label={alt}
        >
          {initials}
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAF2ED] via-[#F4F8F6] to-[#DCE9E1] text-[#1B7A4B] p-4 text-center select-none ${className}`}
        aria-label={alt}
      >
        <Home className="w-8 h-8 mb-2 opacity-60" strokeWidth={1.6} />
        <span className="text-xs font-medium text-[#3B5246] line-clamp-2 max-w-[180px]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...props}
    />
  );
};
