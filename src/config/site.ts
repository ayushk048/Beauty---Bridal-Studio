/**
 * Central site configuration. Edit this file to change the parlour's name,
 * contact details, opening hours and WhatsApp destination.
 */
export interface OpeningHours {
  days: string;
  time: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Digits only, with country code, no "+" (used in https://wa.me/<number>). */
  whatsappNumber: string;
  /** Human readable form of the WhatsApp / phone number. */
  phoneDisplay: string;
  email: string;
  address: { line1: string; line2: string; city: string; mapQuery: string };
  openingHours: OpeningHours[];
  currencySymbol: string;
  foundedYear: number;
}

export const siteConfig: SiteConfig = {
  name: 'Aurelle Beauty & Bridal Studio',
  shortName: 'Aurelle',
  tagline: 'Where every woman blooms, and every bride glows.',
  description:
    'Aurelle Beauty & Bridal Studio offers luxury bridal makeup, pre-bridal care, facials, hair spa, styling, waxing and nail care by certified artists. Book your appointment on WhatsApp.',
  whatsappNumber: '911235467890',
  phoneDisplay: '+91 12354 67890',
  email: 'hello@aurellestudio.example',
  address: {
    line1: '12, Rosewood Arcade, 2nd Floor',
    line2: 'Park Street Road, Near Central Mall',
    city: 'Jaipur, Rajasthan 302001',
    mapQuery: 'Rosewood Arcade, Park Street Road, Jaipur',
  },
  openingHours: [
    { days: 'Monday – Saturday', time: '10:00 AM – 8:00 PM' },
    { days: 'Sunday', time: '11:00 AM – 6:00 PM' },
    { days: 'Wedding season', time: 'Early-morning bridal slots by appointment' },
  ],
  currencySymbol: '₹',
  foundedYear: 2012,
};
