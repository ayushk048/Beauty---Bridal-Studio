import { CalendarCheck, Check, Crown, Repeat, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BridalPackage } from '../../types';
import { formatPrice } from '../../utils/format';
import { buttonStyles } from '../ui/buttonStyles';
import { SmoothImage } from '../ui/SmoothImage';
import { useBooking } from '../../context/BookingContext';

export const PackageCard = ({ pkg }: { pkg: BridalPackage }) => {
  const { openBooking } = useBooking();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift ${
        pkg.popular ? 'border-2 border-gold-400' : 'border border-beige-200'
      }`}
    >
      {pkg.popular && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-3.5 py-1.5 text-xs font-semibold text-cocoa-900 shadow-soft">
          <Crown className="h-3.5 w-3.5" aria-hidden="true" /> Most Popular
        </span>
      )}
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmoothImage src={pkg.image} alt={`${pkg.name} – bridal look`} wrapperClassName="h-full w-full" className="object-top" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa-900/70 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-5 bottom-4 text-ivory">
          <h3 className="font-serif text-2xl text-ivory">{pkg.name}</h3>
          <p className="text-sm text-ivory/85">{pkg.tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            {pkg.originalPrice ? (
              <p className="text-sm text-cocoa-500 line-through">
                <span className="sr-only">Original price </span>
                {formatPrice(pkg.originalPrice)}
              </p>
            ) : (
              <p className="text-sm text-cocoa-500">All-inclusive</p>
            )}
            <p className="font-serif text-3xl text-cocoa-900">{formatPrice(pkg.price)}</p>
          </div>
          {pkg.originalPrice && (
            <span className="rounded-full bg-blush-100 px-3 py-1 text-xs font-medium text-blush-600">
              Save {formatPrice(pkg.originalPrice - pkg.price)}
            </span>
          )}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2 rounded-2xl bg-beige-100 p-3">
            <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            <div>
              <dt className="text-xs text-cocoa-500">Validity</dt>
              <dd className="font-medium text-cocoa-800">{pkg.validity}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-beige-100 p-3">
            <Repeat className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            <div>
              <dt className="text-xs text-cocoa-500">Sessions</dt>
              <dd className="font-medium text-cocoa-800">
                {pkg.sessions} {pkg.sessions === 1 ? 'session' : 'sessions'}
              </dd>
            </div>
          </div>
        </dl>

        <p className="mt-4 flex items-start gap-2 text-sm text-cocoa-600">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-blush-500" aria-hidden="true" />
          <span>
            <span className="font-medium text-cocoa-800">Suitable for: </span>
            {pkg.suitableFor}
          </span>
        </p>

        <ul className="mt-5 flex-1 space-y-2">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-cocoa-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => openBooking(`package:${pkg.id}`)}
          aria-label={`Select ${pkg.name}`}
          className={buttonStyles(pkg.popular ? 'gold' : 'primary', 'md', 'mt-6 w-full')}
        >
          Select Package
        </button>
      </div>
    </motion.article>
  );
};
