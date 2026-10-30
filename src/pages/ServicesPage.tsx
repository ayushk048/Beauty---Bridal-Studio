import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SearchX } from 'lucide-react';
import { ServiceCard } from '../components/cards/ServiceCard';
import { buttonStyles } from '../components/ui/buttonStyles';
import { PageHeader } from '../components/ui/PageHeader';
import { siteConfig } from '../config/site';
import { serviceCategories, services } from '../data/services';
import { useBooking } from '../context/BookingContext';
import { usePageMeta } from '../hooks/usePageMeta';
import type { ServiceCategoryId } from '../types';
import { generalWhatsAppUrl } from '../utils/whatsapp';
import { pexels } from '../utils/image';

type CategoryFilter = 'all' | ServiceCategoryId;

export const ServicesPage = () => {
  usePageMeta(
    `Beauty Services & Plans | ${siteConfig.name}`,
    'Browse facials, hair care, hair spa, waxing, threading, manicure & pedicure, party makeup, engagement makeup and pre-bridal services with prices and durations.',
  );
  const { openBooking } = useBooking();
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter(
      (s) =>
        (category === 'all' || s.category === category) &&
        (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)),
    );
  }, [category, query]);

  const activeLabel = category === 'all' ? 'All services' : serviceCategories.find((c) => c.id === category)?.label;

  const chip = (active: boolean) =>
    `inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
      active
        ? 'border-cocoa-800 bg-cocoa-800 text-ivory shadow-soft'
        : 'border-beige-300 bg-white text-cocoa-700 hover:border-gold-400 hover:bg-gold-100/50'
    }`;

  return (
    <>
      <PageHeader
        eyebrow="Beauty Services & Plans"
        title={
          <>
            Treatments designed to make you <span className="italic text-gradient-gold">glow</span>
          </>
        }
        description="Choose a category, compare prices and durations, and book your favourite treatment in a minute."
        image={pexels(29908196, 1600)}
      />

      <section aria-labelledby="services-list-title" className="bg-ivory py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="services-list-title" className="sr-only">
            Service list
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter services by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
              <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')} className={chip(category === 'all')}>
                All
              </button>
              {serviceCategories.map((c) => (
                <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)} className={chip(category === c.id)}>
                  <c.icon className="h-4 w-4" aria-hidden="true" />
                  {c.label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:max-w-xs">
              <label htmlFor="service-search" className="sr-only">
                Search services
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-500" aria-hidden="true" />
              <input
                id="service-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services…"
                className="w-full rounded-full border border-beige-300 bg-white py-2.5 pl-10 pr-4 text-sm transition placeholder:text-cocoa-500/70 hover:border-gold-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200"
              />
            </div>
          </div>

          <p className="mt-8 text-sm text-cocoa-500" aria-live="polite">
            Showing {filtered.length} {filtered.length === 1 ? 'service' : 'services'} &middot; {activeLabel}
          </p>

          {filtered.length > 0 ? (
            <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-dashed border-beige-300 bg-white px-6 py-16 text-center">
              <SearchX className="mx-auto h-12 w-12 text-gold-400" aria-hidden="true" />
              <h3 className="mt-4 text-2xl">No services found</h3>
              <p className="mx-auto mt-2 max-w-md text-cocoa-600">
                We couldn&rsquo;t find a match. Try another category or search term &mdash; or message us and we&rsquo;ll help you pick.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setCategory('all');
                    setQuery('');
                  }}
                  className={buttonStyles('primary', 'md')}
                >
                  Clear filters
                </button>
                <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonStyles('whatsapp', 'md')}>
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          )}

          <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-br from-blush-100 to-gold-100 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl">Not sure what suits you?</h3>
              <p className="mt-2 max-w-xl text-cocoa-700">Share your skin type or occasion and our team will suggest the right plan on WhatsApp.</p>
            </div>
            <button type="button" onClick={() => openBooking()} className={buttonStyles('primary', 'lg')}>
              Book a Consultation
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
