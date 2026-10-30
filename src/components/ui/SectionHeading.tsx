import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'center' | 'left';
  id?: string;
}

export const SectionHeading = ({ eyebrow, title, description, align = 'center', id }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
  >
    {eyebrow && (
      <p className="mb-3 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
        <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
        {eyebrow}
        <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
      </p>
    )}
    <h2 id={id} className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    {description && <p className="mt-4 text-base leading-relaxed text-cocoa-600 sm:text-lg">{description}</p>}
  </motion.div>
);
