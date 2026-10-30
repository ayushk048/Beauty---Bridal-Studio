import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useBooking } from '../../context/BookingContext';
import { generalWhatsAppUrl } from '../../utils/whatsapp';

export const Footer = () => {
  const { openBooking } = useBooking();
  const linkClass = 'text-ivory/70 transition hover:text-gold-300';

  return (
    <footer className="bg-cocoa-900 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blush-200 to-gold-200 text-cocoa-800">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-2xl text-ivory">{siteConfig.shortName}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-gold-300">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className={linkClass} to="/">Home</Link></li>
            <li><Link className={linkClass} to="/services">Services &amp; Plans</Link></li>
            <li><Link className={linkClass} to="/bridal-packages">Bridal Packages</Link></li>
            <li><Link className={linkClass} to={{ pathname: '/', hash: '#faq' }}>FAQ</Link></li>
            <li>
              <button type="button" className={linkClass} onClick={() => openBooking()}>
                Book an Appointment
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-gold-300">Visit us</h2>
          <address className="mt-4 space-y-1 text-sm not-italic text-ivory/70">
            <p>{siteConfig.address.line1}</p>
            <p>{siteConfig.address.line2}</p>
            <p>{siteConfig.address.city}</p>
          </address>
        </div>

        <div>
          <h2 className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-gold-300">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a className={linkClass} href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.phoneDisplay}</a></li>
            <li><a className={`${linkClass} break-all`} href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li>
              <a className={linkClass} href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                Message on WhatsApp
              </a>
            </li>
            <li className="pt-2 text-ivory/70">{siteConfig.openingHours[0].days}: {siteConfig.openingHours[0].time}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 text-center text-xs text-ivory/60">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Prices shown are indicative and may vary.
      </div>
    </footer>
  );
};
