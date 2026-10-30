import { Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Service } from '../../types';
import { formatPrice } from '../../utils/format';
import { buttonStyles } from '../ui/buttonStyles';
import { SmoothImage } from '../ui/SmoothImage';
import { useBooking } from '../../context/BookingContext';

export const ServiceCard = ({ service }: { service: Service }) => {
  const { openBooking } = useBooking();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-beige-200 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmoothImage
          src={service.image}
          alt={service.name}
          wrapperClassName="h-full w-full"
          className="transition-transform duration-700 group-hover:scale-110"
        />
        {service.popular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ivory/95 px-3 py-1 text-xs font-medium text-gold-600 shadow-soft">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" aria-hidden="true" /> Popular
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa-600">{service.description}</p>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-beige-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-cocoa-500">Starting from</p>
            <p className="font-serif text-2xl text-cocoa-900">{formatPrice(service.price)}</p>
          </div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-beige-100 px-3 py-1 text-xs text-cocoa-700">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {service.duration}
          </p>
        </div>
        <button
          type="button"
          onClick={() => openBooking(`service:${service.id}`)}
          aria-label={`Book ${service.name}`}
          className={buttonStyles('primary', 'md', 'mt-4 w-full')}
        >
          Book Now
        </button>
      </div>
    </motion.article>
  );
};
