import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { ContactSection } from './ContactSection';
import { WhatsAppFloat } from './WhatsAppFloat';

/** Scrolls to the hash target (if present) or to the top on every navigation. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    let tries = 0;
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el || tries > 20) {
        window.clearInterval(timer);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
};

export const Layout = () => (
  <>
    <ScrollManager />
    <Navbar />
    <main id="main" className="pt-[72px]">
      <Outlet />
      <ContactSection />
    </main>
    <Footer />
    <WhatsAppFloat />
  </>
);
