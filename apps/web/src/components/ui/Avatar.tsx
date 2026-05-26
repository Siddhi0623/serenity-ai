import { useMemo } from 'react';
import { cn } from '@/lib/cn';

type AvatarProps = {
  name?: string | null;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZES: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = useMemo(() => {
    if (!name) return '·';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join('') || '·';
  }, [name]);

  return (
    <span
      className={cn(
        'from-lavender-400 ring-border inline-flex select-none items-center justify-center overflow-hidden rounded-full bg-gradient-to-br to-sky-400 font-semibold text-white ring-1',
        SIZES[size],
        className,
      )}
      aria-hidden
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}
