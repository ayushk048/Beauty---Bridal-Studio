# Aurelle Beauty & Bridal Studio

A responsive single-page website for a beauty parlour and bridal makeup studio. Customers browse services and bridal packages, then send a booking enquiry to the parlour on WhatsApp through a 4-step wizard. There is no backend, login or payment.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Framer Motion, Lucide React.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

Requires Node.js 20.19 or later.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, about, featured services, popular bridal packages, why choose us, testimonials, gallery with lightbox, FAQ, contact |
| `/services` | Services by category, with category filters, search and an empty state |
| `/bridal-packages` | Bridal, engagement, pre-bridal and wedding guest packages, plus a bridal comparison table |

A sticky navbar (with a hamburger menu on mobile), the contact section, the footer and a floating WhatsApp button appear on every page.

## Booking wizard

Every **Book Now**, **Select Package** and **Book Appointment** button opens the same modal:

1. **Plan** – shows the selected service or package and lets the customer change it.
2. **Your details** – name, mobile, email (optional), city and event type.
3. **Date & time** – appointment date, alternative date, time slot and wedding/event date. Past dates are blocked, and the event date is required for bridal, engagement and pre-bridal packages.
4. **Review** – summary with edit links, a preview of the message, and **Confirm Booking via WhatsApp**.

Confirming opens `https://wa.me/<number>?text=<encodeURIComponent(message)>` in a new tab. The message contains every entered detail and skips empty optional fields. A final screen explains that this is an enquiry and that the parlour confirms availability on WhatsApp.

Entered data is kept when moving between steps. Closing the modal after entering data asks for confirmation first.

## Customising content

All content is in plain TypeScript files:

| File | What to edit |
| --- | --- |
| `src/config/site.ts` | Parlour name, tagline, WhatsApp number, phone, email, address, opening hours, currency |
| `src/data/services.ts` | Service categories, services, prices, durations, images |
| `src/data/packages.ts` | Package groups, bridal/engagement/pre-bridal/guest packages, prices, inclusions |
| `src/data/content.ts` | Testimonials, gallery images, FAQ |
| `index.html` | Page title, meta description, Open Graph tags, JSON-LD business data |

`whatsappNumber` in `src/config/site.ts` takes digits only, with the country code and no `+` (for example `911235467890`).

Prices and the hero statistics are sample values. Images are loaded from Pexels (see `src/utils/image.ts`). Replace them with your own photos before going live.

## Project structure

```
src/
  components/
    booking/   Wizard, steps, stepper, form fields
    cards/     ServiceCard, PackageCard
    layout/    Navbar, Footer, ContactSection, WhatsAppFloat, Layout
    sections/  Hero, home sections, Gallery, Testimonials, FAQ
    ui/        Modal, buttons, SmoothImage, SectionHeading, Reveal, PageHeader
  config/      Site configuration
  context/     BookingContext (opens the wizard from anywhere)
  data/        Services, packages, testimonials, gallery, FAQ
  hooks/       usePageMeta
  pages/       Home, Services, Bridal Packages, Not Found
  types/       Shared TypeScript interfaces
  utils/       Validation, WhatsApp message builder, formatting, catalog helpers
```

## Accessibility

Skip link, labelled form fields with inline errors, a focus-trapped modal that closes with Escape and restores focus, keyboard-operable gallery lightbox, FAQ and filters, and reduced-motion support.
# Beauty---Bridal-Studio
