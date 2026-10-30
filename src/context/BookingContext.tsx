import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { BookingWizard } from '../components/booking/BookingWizard';

interface BookingContextValue {
  /** Opens the booking wizard. Pass a catalog key such as "service:fs-glow" or "package:bridal-premium". */
  openBooking: (itemKey?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{ open: boolean; itemKey?: string }>({ open: false });

  const openBooking = useCallback((itemKey?: string) => setState({ open: true, itemKey }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingWizard open={state.open} initialItemKey={state.itemKey} onClose={close} />
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextValue => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
};
