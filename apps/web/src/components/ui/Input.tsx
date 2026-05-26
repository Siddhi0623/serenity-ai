import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/cn';

type BaseProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: string;
  leftIcon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, BaseProps>(
  ({ id, label, hint, error, leftIcon, className, type = 'text', ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const describedById = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-fg text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="text-fg-subtle pointer-events-none absolute inset-y-0 left-3 inline-flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            aria-invalid={Boolean(error)}
            aria-describedby={describedById}
            className={cn(
              'border-border bg-surface text-fg placeholder:text-fg-subtle h-11 w-full rounded-2xl border px-4 text-sm outline-none transition-shadow',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-0',
              leftIcon && 'pl-10',
              error && 'border-red-400/70 focus-visible:ring-red-300',
              className,
            )}
            {...rest}
          />
        </div>
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-fg-subtle text-xs">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

type PasswordProps = Omit<BaseProps, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn('pr-11', className)}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="text-fg-subtle hover:text-fg absolute right-3 top-[34px] inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors"
          tabIndex={-1}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';
