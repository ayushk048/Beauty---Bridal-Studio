import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

export const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="italic text-blush-600">answered</span>
            </>
          }
          description="Everything you need to know before you book."
        />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const btnId = `${baseId}-btn-${i}`;
            return (
              <div key={f.question} className={`rounded-2xl border bg-white transition-colors ${isOpen ? 'border-gold-300 shadow-soft' : 'border-beige-200'}`}>
                <h3 className="font-sans text-base">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-cocoa-900 sm:px-6"
                  >
                    {f.question}
                    <Plus className={`h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-cocoa-600 sm:px-6">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
