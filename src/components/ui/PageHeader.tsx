import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt?: string;
  children?: ReactNode;
}

export const PageHeader = ({ eyebrow, title, description, image, children }: Props) => (
  <header className="relative isolate overflow-hidden py-20 text-center sm:py-28">
    <div
      className="absolute inset-0 -z-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${image}), linear-gradient(135deg,#f6b2c0,#e3c887)` }}
      aria-hidden="true"
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cocoa-900/80 via-cocoa-900/70 to-cocoa-900/85" aria-hidden="true" />
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-3xl px-4 sm:px-6"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold-300">{eyebrow}</p>
      <h1 className="font-serif text-4xl font-semibold text-ivory sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-ivory/80">{description}</p>
      {children && <div className="mt-8">{children}</div>}
    </motion.div>
  </header>
);
