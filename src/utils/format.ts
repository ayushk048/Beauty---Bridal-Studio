import { siteConfig } from '../config/site';

const pad = (n: number): string => String(n).padStart(2, '0');

/** Today's date in the user's local timezone as YYYY-MM-DD. */
export const todayISO = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const parseISO = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const isValidISODate = (iso: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(iso) && !Number.isNaN(parseISO(iso).getTime());

export const formatDate = (iso: string): string =>
  iso && isValidISODate(iso)
    ? parseISO(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : '';

export const formatPrice = (amount: number): string => `${siteConfig.currencySymbol}${amount.toLocaleString('en-IN')}`;
