import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'glass duration-base rounded-3xl p-6 transition-shadow ease-out hover:shadow-lg',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';
