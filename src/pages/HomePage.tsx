import { usePageMeta } from '../hooks/usePageMeta';
import { siteConfig } from '../config/site';
import { Gallery } from '../components/sections/Gallery';
import { FaqSection } from '../components/sections/FaqSection';
import { Hero } from '../components/sections/Hero';
import { AboutSection, FeaturedServices, PopularPackages, WhyChooseUs } from '../components/sections/HomeSections';
import { Testimonials } from '../components/sections/Testimonials';

export const HomePage = () => {
  usePageMeta(
    `${siteConfig.name} | Bridal Makeup, Facials, Hair Spa & Salon Services`,
    siteConfig.description,
  );

  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedServices />
      <PopularPackages />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      <FaqSection />
    </>
  );
};
