import type { ReactNode } from 'react';

interface AriaProps {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby'?: string;
  'aria-required': boolean;
}

interface Props {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  highlight?: boolean;
  children: (aria: AriaProps) => ReactNode;
}

export const fieldId = (name: string): string => `bk-${name}`;

export const inputClass = (hasError: boolean): string =>
  `w-full rounded-2xl border bg-white px-4 py-3 text-base text-cocoa-900 placeholder:text-cocoa-500/60 transition focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-blush-500 focus:ring-blush-300'
      : 'border-beige-300 hover:border-gold-400 focus:border-gold-500 focus:ring-gold-200'
  }`;

export const FormField = ({ name, label, required, error, hint, highlight, children }: Props) => {
  const id = fieldId(name);
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={
        highlight ? 'rounded-2xl border border-gold-300 bg-gold-100/60 p-4 shadow-[inset_0_0_0_1px_rgba(212,175,97,0.2)]' : ''
      }
    >
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-cocoa-800">
        {label}
        {required ? (
          <span className="text-blush-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-cocoa-500">(optional)</span>
        )}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy, 'aria-required': Boolean(required) })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-cocoa-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-blush-600">
          {error}
        </p>
      )}
    </div>
  );
};
