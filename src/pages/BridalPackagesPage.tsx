import type { ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { PackageCard } from '../components/cards/PackageCard';
import { buttonStyles } from '../components/ui/buttonStyles';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { siteConfig } from '../config/site';
import { useBooking } from '../context/BookingContext';
import { bridalPackages, packageGroups } from '../data/packages';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatPrice } from '../utils/format';
import { pexels } from '../utils/image';

const bridalOnly = bridalPackages.filter((p) => p.group === 'bridal');

const hasFeature = (features: string[], pattern: RegExp): boolean => features.some((f) => pattern.test(f));

const comparisonRows: { label: string; render: (p: (typeof bridalOnly)[number]) => ReactNode }[] = [
  { label: 'Price', render: (p) => <span className="font-serif text-xl text-cocoa-900">{formatPrice(p.price)}</span> },
  { label: 'Validity', render: (p) => p.validity },
  { label: 'Sessions', render: (p) => p.sessions },
  { label: 'Suitable for', render: (p) => p.suitableFor },
  { label: 'Trial session', render: (p) => <Tick on={hasFeature(p.features, /trial/i)} /> },
  { label: 'Airbrush makeup', render: (p) => <Tick on={hasFeature(p.features, /airbrush/i)} /> },
  { label: 'Pre-bridal care', render: (p) => <Tick on={hasFeature(p.features, /pre-bridal|facial|spa|polishing/i)} /> },
  { label: 'Multiple functions', render: (p) => <Tick on={hasFeature(p.features, /function|3 functions/i)} /> },
];

function Tick({ on }: { on: boolean }) {
  return on ? (
    <>
      <Check className="mx-auto h-5 w-5 text-gold-500" aria-hidden="true" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto h-5 w-5 text-beige-300" aria-hidden="true" />
      <span className="sr-only">Not included</span>
    </>
  );
}

export const BridalPackagesPage = () => {
  usePageMeta(
    `Bridal Packages & Wedding Makeup | ${siteConfig.name}`,
    'Compare Basic, Premium, Luxury and Complete Bridal Transformation packages, plus engagement, pre-bridal and wedding guest makeup packages.',
  );
  const { openBooking } = useBooking();

  return (
    <>
      <PageHeader
        eyebrow="Bridal Packages"
        title={
          <>
            Your most beautiful day, <span className="italic text-gradient-gold">perfected</span>
          </>
        }
        description="From classic bridal makeup to a complete head-to-toe transformation, choose the plan that fits your wedding."
        image={pexels(29133472, 1600)}
      >
        <nav aria-label="Package categories" className="flex flex-wrap justify-center gap-2">
          {packageGroups.map((g) => (
            <a
              key={g.id}
              href={`#group-${g.id}`}
              className="rounded-full border border-ivory/40 px-5 py-2 text-sm font-medium text-ivory transition hover:border-gold-300 hover:bg-ivory/10"
            >
              {g.label}
            </a>
          ))}
        </nav>
      </PageHeader>

      {packageGroups.map((g, idx) => (
        <section
          key={g.id}
          id={`group-${g.id}`}
          aria-labelledby={`title-${g.id}`}
          className={`py-20 sm:py-24 ${idx % 2 === 0 ? 'bg-ivory' : 'bg-beige-100'}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading id={`title-${g.id}`} eyebrow={g.label} title={g.label} description={g.description} />
            <div
              className={`mt-12 grid gap-8 ${
                g.id === 'bridal' ? 'md:grid-cols-2 xl:grid-cols-4' : 'mx-auto max-w-5xl md:grid-cols-2'
              }`}
            >
              {bridalPackages
                .filter((p) => p.group === g.id)
                .map((p) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
            </div>

            {g.id === 'bridal' && (
              <Reveal className="mt-16">
                <h3 className="text-center text-2xl sm:text-3xl">Compare bridal packages</h3>
                <div className="relative mt-8 overflow-x-auto rounded-[2rem] border border-beige-200 bg-white shadow-soft">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <caption className="sr-only">Comparison of bridal packages</caption>
                    <thead>
                      <tr className="bg-cocoa-800 text-ivory">
                        <th scope="col" className="p-4 font-medium">
                          Feature
                        </th>
                        {bridalOnly.map((p) => (
                          <th key={p.id} scope="col" className="p-4 text-center font-serif text-base font-medium">
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row.label} className="border-t border-beige-100 even:bg-beige-100/40">
                          <th scope="row" className="p-4 font-medium text-cocoa-800">
                            {row.label}
                          </th>
                          {bridalOnly.map((p) => (
                            <td key={p.id} className="p-4 text-center text-cocoa-700">
                              {row.render(p)}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="border-t border-beige-200">
                        <td className="p-4" />
                        {bridalOnly.map((p) => (
                          <td key={p.id} className="p-4 text-center">
                            <button
                              type="button"
                              onClick={() => openBooking(`package:${p.id}`)}
                              aria-label={`Select ${p.name}`}
                              className={buttonStyles(p.popular ? 'gold' : 'primary', 'sm')}
                            >
                              Select Plan
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      ))}

      <section className="bg-gradient-to-br from-blush-100 via-ivory to-gold-100 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl sm:text-4xl">Want a custom bridal plan?</h2>
          <p className="mt-3 text-cocoa-700">Tell us about your wedding events and we will tailor a package for you.</p>
          <button type="button" onClick={() => openBooking('package:bridal-premium')} className={buttonStyles('primary', 'lg', 'mt-6')}>
            Start a Bridal Enquiry
          </button>
        </div>
      </section>
    </>
  );
};
