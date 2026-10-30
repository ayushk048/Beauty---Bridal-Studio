import { Link } from 'react-router-dom';
import { Award, BadgeCheck, Gem, HeartHandshake, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { bridalPackages } from '../../data/packages';
import { services } from '../../data/services';
import { pexels } from '../../utils/image';
import { PackageCard } from '../cards/PackageCard';
import { ServiceCard } from '../cards/ServiceCard';
import { buttonStyles } from '../ui/buttonStyles';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SmoothImage } from '../ui/SmoothImage';

const featuredServices = services.filter((s) => s.popular).slice(0, 4);
const popularPackages = bridalPackages.filter((p) => p.group === 'bridal').slice(0, 3);

export const AboutSection = () => (
  <section id="about" aria-labelledby="about-title" className="bg-ivory py-20 sm:py-28">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <Reveal className="relative mx-auto w-full max-w-lg">
        <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] border-2 border-gold-300" aria-hidden="true" />
        <SmoothImage
          src={pexels(35538643, 1000)}
          alt="Makeup artist carefully applying lipstick to a bride"
          wrapperClassName="relative aspect-[4/5] rounded-[2.5rem] shadow-lift"
        />
        <div className="absolute -bottom-6 right-4 rounded-3xl bg-white px-6 py-4 shadow-lift sm:-right-6">
          <p className="font-serif text-3xl text-cocoa-900">{new Date().getFullYear() - siteConfig.foundedYear}+</p>
          <p className="text-sm text-cocoa-600">years of beauty artistry</p>
        </div>
      </Reveal>

      <div>
        <SectionHeading
          id="about-title"
          align="left"
          eyebrow="About Us"
          title={
            <>
              A boutique studio where <span className="italic text-blush-600">beauty feels personal</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-cocoa-600">
            <p>
              {siteConfig.name} was founded in {siteConfig.foundedYear} with a simple belief: every woman deserves to feel
              beautiful, cared for and completely herself. From a quick brow shape to a three-day wedding celebration, we treat
              every appointment as a special occasion.
            </p>
            <p>
              Our certified makeup artists, hair stylists and skin therapists use premium, skin-friendly products and spotless,
              single-use tools, so you can relax and enjoy the experience.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {['Certified artists & stylists', 'Premium, skin-safe products', 'Private bridal suite', 'Trials before your big day'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-cocoa-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

export const FeaturedServices = () => (
  <section aria-labelledby="featured-title" className="bg-beige-100 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="featured-title"
        eyebrow="Featured Services"
        title={
          <>
            Treatments our clients <span className="italic text-blush-600">love most</span>
          </>
        }
        description="A taste of our most-booked rituals. Explore the full menu of services and plans."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredServices.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/services" className={buttonStyles('outline', 'md')}>
          View all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export const PopularPackages = () => (
  <section aria-labelledby="popular-title" className="bg-ivory py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="popular-title"
        eyebrow="Bridal Packages"
        title={
          <>
            Your wedding look, <span className="italic text-blush-600">beautifully planned</span>
          </>
        }
        description="Choose a package that fits your celebration. Every plan can be tailored to your needs."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {popularPackages.map((p) => (
          <PackageCard key={p.id} pkg={p} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/bridal-packages" className={buttonStyles('primary', 'md')}>
          Compare all bridal packages <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

const reasons = [
  { icon: Award, title: 'Certified experts', text: 'Trained makeup artists, stylists and skin therapists with years of bridal experience.' },
  { icon: ShieldCheck, title: 'Hygiene first', text: 'Sanitised stations, single-use applicators and dermatologically tested products.' },
  { icon: Gem, title: 'Premium products', text: 'International-grade, long-wear and skin-friendly brands chosen for Indian skin tones.' },
  { icon: HeartHandshake, title: 'Personal attention', text: 'Honest advice, a consultation before every look, and no hard-selling.' },
  { icon: Sparkles, title: 'Trials & touch-ups', text: 'Trial looks and on-the-day touch-up support so you feel confident all day.' },
  { icon: BadgeCheck, title: 'Transparent pricing', text: 'Clear package inclusions with no hidden charges, confirmed upfront on WhatsApp.' },
];

export const WhyChooseUs = () => (
  <section aria-labelledby="why-title" className="relative overflow-hidden bg-cocoa-900 py-20 text-ivory sm:py-28">
    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blush-500/10 blur-3xl" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="why-title"
        eyebrow="Why Choose Us"
        title={
          <span className="text-ivory">
            The {siteConfig.shortName} <span className="italic text-gradient-gold">difference</span>
          </span>
        }
        description="Luxury is in the details. Here is what sets our studio apart."
      />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <li key={r.title} className="list-none">
            <Reveal delay={i * 0.06} className="h-full">
              <div className="h-full rounded-3xl border border-ivory/10 bg-ivory/5 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:bg-ivory/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300">
                  <r.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-medium text-ivory">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{r.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
