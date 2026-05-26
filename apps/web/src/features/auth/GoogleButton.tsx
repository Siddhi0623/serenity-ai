import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export function GoogleButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'border-border bg-surface text-fg hover:bg-surface-2 focus-visible:ring-ring focus-visible:ring-offset-bg inline-flex h-11 w-full items-center justify-center gap-3 rounded-full border text-sm font-medium shadow-sm transition-all hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60',
        className,
      )}
      {...props}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
        <path
          fill="#4285F4"
          d="M21.6 12.227c0-.823-.074-1.611-.21-2.36H12v4.466h5.385a4.602 4.602 0 0 1-1.997 3.018v2.51h3.232c1.89-1.74 2.98-4.302 2.98-7.634z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.962-.895 6.62-2.42l-3.232-2.51c-.897.6-2.043.957-3.388.957-2.604 0-4.81-1.756-5.598-4.122H3.067v2.59A9.997 9.997 0 0 0 12 22z"
        />
        <path
          fill="#FBBC05"
          d="M6.402 13.905A5.997 5.997 0 0 1 6.087 12c0-.664.114-1.31.315-1.905V7.505H3.067A9.997 9.997 0 0 0 2 12c0 1.614.385 3.14 1.067 4.495l3.335-2.59z"
        />
        <path
          fill="#EA4335"
          d="M12 5.997c1.47 0 2.787.505 3.823 1.494l2.867-2.867C16.957 2.99 14.695 2 12 2 8.107 2 4.74 4.235 3.067 7.505l3.335 2.59C7.19 7.728 9.396 5.997 12 5.997z"
        />
      </svg>
      {children ?? 'Continue with Google'}
    </button>
  );
}
