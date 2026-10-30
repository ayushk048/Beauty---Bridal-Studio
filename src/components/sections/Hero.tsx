import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarHeart, ChevronDown, Star } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useBooking } from '../../context/BookingContext';
import { pexels } from '../../utils/image';
import { buttonStyles } from '../ui/buttonStyles';
import { SmoothImage } from '../ui/SmoothImage';

const stats = [
  { value: `${new Date().getFullYear() - siteConfig.foundedYear}+`, label: 'Years of artistry' },
  { value: '2,500+', label: 'Brides styled' },
  { value: '4.9/5', label: 'Client rating' },
];

export const Hero = () => {
  const { openBooking } = useBooking();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-br from-blush-50 via-ivory to-gold-100/60"
    >
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-blush-200/50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-gold-200/60 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-12 sm:px-6 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-gold-600">
            <span className="h-px w-10 bg-gold-400" aria-hidden="true" /> Beauty &amp; Bridal Studio
          </p>
          <h1 id="hero-title" className="font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            {siteConfig.shortName}
            <span className="mt-3 block text-3xl font-medium italic text-blush-600 sm:text-4xl lg:text-5xl">{siteConfig.tagline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa-600">
            Luxury bridal makeup, glowing skincare and expert hair artistry, crafted by certified artists in a serene,
            boutique studio.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/services" className={buttonStyles('primary', 'lg')}>
              Explore Services
            </Link>
            <Link to="/bridal-packages" className={buttonStyles('gold', 'lg')}>
              View Bridal Packages
            </Link>
            <button type="button" onClick={() => openBooking()} className={buttonStyles('outline', 'lg')}>
              <CalendarHeart className="h-5 w-5" aria-hidden="true" /> Book an Appointment
            </button>
          </div>

          <ul className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-beige-300 pt-6">
            {stats.map((s) => (
              <li key={s.label}>
                <p className="font-serif text-2xl text-cocoa-900 sm:text-3xl">{s.value}</p>
                <p className="mt-0.5 text-xs text-cocoa-500">{s.label}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[2.5rem] border border-gold-300" aria-hidden="true" />
          <SmoothImage
            src={pexels(30825617, 1200)}
            alt="Bride with elegant makeup and traditional jewellery"
            loading="eager"
            fetchPriority="high"
            wrapperClassName="aspect-[4/5] rounded-t-[999px] rounded-b-[2.5rem] shadow-lift"
            className="object-top"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-2 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:-left-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-600">
              <Star className="h-5 w-5 fill-gold-400" aria-hidden="true" />
            </span>
            <p className="text-sm leading-tight">
              <span className="block font-medium text-cocoa-900">Bridal specialists</span>
              <span className="text-cocoa-500">Trials included</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About Us"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 animate-bounce text-cocoa-600 lg:block"
      >
        <ChevronDown className="h-7 w-7" aria-hidden="true" />
      </a>
    </section>
  );
};
