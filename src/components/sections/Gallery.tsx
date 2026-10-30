import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { galleryItems } from '../../data/content';
import type { GalleryItem } from '../../types';
import { SmoothImage } from '../ui/SmoothImage';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

type Filter = 'All' | GalleryItem['category'];
const filters: Filter[] = ['All', 'Bridal', 'Makeup', 'Skincare', 'Hair', 'Nails'];

const Lightbox = ({ items, index, onClose, onIndex }: { items: GalleryItem[]; index: number; onClose: () => void; onIndex: (i: number) => void }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const prev = useCallback(() => onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  const item = items[index];
  const btn = 'absolute rounded-full bg-ivory/10 p-3 text-ivory backdrop-blur transition hover:bg-ivory/25';

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${items.length}: ${item.alt}`}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-cocoa-900/95 p-4 outline-none"
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="Close image viewer" className={`${btn} right-4 top-4`}>
        <X className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous image"
        className={`${btn} left-3 top-1/2 -translate-y-1/2 sm:left-6`}
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next image"
        className={`${btn} right-3 top-1/2 -translate-y-1/2 sm:right-6`}
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>
      <motion.figure
        key={item.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-h-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.src} alt={item.alt} className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-lift" />
        <figcaption className="mt-3 text-center text-sm text-ivory/80">
          {item.alt} <span className="text-ivory/50">&middot; {index + 1}/{items.length}</span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
};

export const Gallery = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const [active, setActive] = useState<number | null>(null);
  const items = filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title={
            <>
              Looks we&rsquo;re <span className="italic text-blush-600">proud of</span>
            </>
          }
          description="Bridal looks, glam makeup, skincare rituals and hair artistry from our studio."
        />

        <div role="group" aria-label="Filter gallery" className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                filter === f ? 'bg-cocoa-800 text-ivory shadow-soft' : 'bg-white text-cocoa-700 hover:bg-blush-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <Reveal className="mt-10">
          <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((g, i) => (
                <motion.li
                  key={g.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={i % 5 === 0 ? 'row-span-2' : ''}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View larger: ${g.alt}`}
                    className="group relative block h-full w-full overflow-hidden rounded-2xl"
                  >
                    <SmoothImage
                      src={g.src}
                      alt={g.alt}
                      wrapperClassName={`w-full ${i % 5 === 0 ? 'h-full min-h-[320px]' : 'aspect-square'}`}
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-cocoa-900/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="rounded-full bg-ivory/90 px-3 py-1 text-xs font-medium text-cocoa-800">{g.category}</span>
                      <Expand className="h-5 w-5 text-ivory" aria-hidden="true" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </Reveal>
      </div>

      <AnimatePresence>
        {active !== null && items[active] && (
          <Lightbox items={items} index={active} onClose={() => setActive(null)} onIndex={setActive} />
        )}
      </AnimatePresence>
    </section>
  );
};
