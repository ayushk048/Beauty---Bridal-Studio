import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const go = (delta: number) => setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section aria-labelledby="testimonials-title" className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title={
            <>
              Loved by our <span className="italic text-blush-600">clients</span>
            </>
          }
        />

        <div className="relative mt-12 rounded-[2rem] bg-white p-8 shadow-soft sm:p-12">
          <Quote className="absolute left-6 top-6 h-10 w-10 text-gold-200 sm:left-10 sm:top-8 sm:h-14 sm:w-14" aria-hidden="true" />
          <div aria-live="polite" className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="pt-6 text-center"
              >
                <div className="flex justify-center gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 font-serif text-lg italic leading-relaxed text-cocoa-800 sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-medium text-cocoa-900">{t.name}</p>
                  <p className="text-sm text-cocoa-500">
                    {t.city} &middot; {t.service}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-full border border-beige-300 p-2.5 text-cocoa-700 transition hover:border-gold-500 hover:bg-gold-100">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex gap-2" role="group" aria-label="Choose testimonial">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-gold-500' : 'w-2.5 bg-beige-300 hover:bg-gold-300'}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="rounded-full border border-beige-300 p-2.5 text-cocoa-700 transition hover:border-gold-500 hover:bg-gold-100">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
