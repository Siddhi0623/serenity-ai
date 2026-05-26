import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonStyles = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-full font-medium',
    'duration-base transition-[transform,box-shadow,background-color,color] ease-out',
    'focus-visible:ring-ring focus-visible:ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-fg shadow-md hover:-translate-y-px hover:shadow-lg',
        secondary:
          'bg-surface text-fg border-border hover:bg-surface-2 border shadow-sm hover:-translate-y-px hover:shadow-md',
        ghost: 'text-fg hover:bg-surface-2 bg-transparent',
        glass: 'glass text-fg hover:bg-surface/70',
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
