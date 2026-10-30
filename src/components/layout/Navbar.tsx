import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useBooking } from '../../context/BookingContext';
import { buttonStyles } from '../ui/buttonStyles';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services & Plans', end: false },
  { to: '/bridal-packages', label: 'Bridal Packages', end: false },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
    isActive ? 'bg-blush-100 text-cocoa-900' : 'text-cocoa-700 hover:bg-blush-50 hover:text-cocoa-900'
  }`;

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'border-b border-beige-200 bg-ivory/90 shadow-soft backdrop-blur-lg' : 'bg-ivory/70 backdrop-blur-md'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-full focus:bg-cocoa-800 focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} – home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blush-200 to-gold-200 text-cocoa-800">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-xl font-semibold text-cocoa-900">{siteConfig.shortName}</span>
            <span className="block whitespace-nowrap text-[10px] uppercase tracking-[0.28em] text-gold-600">Beauty &amp; Bridal</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link to={{ pathname: '/', hash: '#contact' }} className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-cocoa-700 hover:bg-blush-50 hover:text-cocoa-900">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => openBooking()} className={buttonStyles('gold', 'sm', 'hidden sm:inline-flex')}>
            Book Appointment
          </button>
          <button
            type="button"
            className="rounded-full p-2.5 text-cocoa-800 hover:bg-blush-100 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-beige-200 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-base font-medium ${isActive ? 'bg-blush-100 text-cocoa-900' : 'text-cocoa-700 hover:bg-blush-50'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to={{ pathname: '/', hash: '#contact' }} className="rounded-2xl px-4 py-3 text-base font-medium text-cocoa-700 hover:bg-blush-50">
                Contact
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openBooking();
                }}
                className={buttonStyles('gold', 'md', 'mt-2')}
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
