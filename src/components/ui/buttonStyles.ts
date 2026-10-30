export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'light' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ' +
  'focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-[0.98] whitespace-nowrap';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-cocoa-800 text-ivory shadow-soft hover:bg-cocoa-900 hover:shadow-lift disabled:hover:bg-cocoa-800',
  gold:
    'bg-gradient-to-r from-gold-400 to-gold-500 text-cocoa-900 shadow-soft hover:from-gold-300 hover:to-gold-400 hover:shadow-lift',
  outline: 'border border-cocoa-700/30 text-cocoa-800 hover:border-gold-500 hover:bg-gold-100/60',
  ghost: 'text-cocoa-700 hover:bg-blush-100',
  light: 'bg-ivory/95 text-cocoa-900 shadow-soft hover:bg-white',
  whatsapp: 'bg-[#25a35a] text-white shadow-soft hover:bg-[#1f8d4e] hover:shadow-lift',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-4 text-base',
};

export const buttonStyles = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = ''): string =>
  [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ');
