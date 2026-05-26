import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonStyles = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-full font-medium',
    'transition-[transform,box-shadow,background-color,color] duration-base ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-fg shadow-md hover:shadow-lg hover:-translate-y-px',
        secondary:
          'bg-surface text-fg border border-border hover:bg-surface-2 shadow-sm hover:shadow-md hover:-translate-y-px',
        ghost: 'bg-transparent text-fg hover:bg-surface-2',
        glass:
          'glass text-fg hover:bg-surface/70',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = 'Button';
