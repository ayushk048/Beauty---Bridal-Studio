import type { FaqItem, GalleryItem, Testimonial } from '../types';
import { pexels } from '../utils/image';

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    city: 'Jaipur',
    rating: 5,
    service: 'Premium Bridal Package',
    quote:
      'I was so nervous about my wedding look, but the team understood exactly what I wanted. My makeup lasted from 6 AM to midnight and every photo looks magical.',
  },
  {
    id: 't2',
    name: 'Ananya Verma',
    city: 'Delhi',
    rating: 5,
    service: 'Pre-Bridal Programme',
    quote:
      'The pre-bridal skin programme changed my skin completely. Warm staff, spotless hygiene and a luxurious atmosphere. I felt like royalty every visit.',
  },
  {
    id: 't3',
    name: 'Meera Kapoor',
    city: 'Jaipur',
    rating: 5,
    service: 'Engagement Makeup',
    quote:
      'Soft, glowy and so me. My family could not stop complimenting the look. The artist even stayed back to touch me up before the ring ceremony.',
  },
  {
    id: 't4',
    name: 'Ritika Agarwal',
    city: 'Udaipur',
    rating: 5,
    service: 'Hair Spa & Facial',
    quote:
      'My go-to salon for monthly care. Honest advice, never pushy, and my hair has never felt this soft. The booking over WhatsApp is so easy.',
  },
];

export const galleryItems: GalleryItem[] = [
  { id: 'g1', src: pexels(30825617, 1000), alt: 'Bride with traditional jewellery and bridal makeup', category: 'Bridal' },
  { id: 'g2', src: pexels(35538643, 1000), alt: 'Makeup artist applying lipstick to a bride', category: 'Makeup' },
  { id: 'g3', src: pexels(29908196, 1000), alt: 'Client enjoying a spa facial with a face mask', category: 'Skincare' },
  { id: 'g4', src: pexels(29133472, 1000), alt: 'Elegant bride in a red outfit', category: 'Bridal' },
  { id: 'g5', src: pexels(23349902, 1000), alt: 'Relaxing head massage during a hair spa', category: 'Hair' },
  { id: 'g6', src: pexels(7446914, 1000), alt: 'Professional manicure in progress', category: 'Nails' },
  { id: 'g7', src: pexels(5149734, 1000), alt: 'Woman having her makeup done in front of a ring light', category: 'Makeup' },
  { id: 'g8', src: pexels(30417961, 1000), alt: 'Smiling bride with henna and traditional jewellery', category: 'Bridal' },
  { id: 'g9', src: pexels(12115040, 1000), alt: 'Beautician removing a clay mask during a facial', category: 'Skincare' },
  { id: 'g10', src: pexels(29096366, 1000), alt: 'Hair stylist working on a client in the salon', category: 'Hair' },
  { id: 'g11', src: pexels(14062394, 1000), alt: 'Bridal look with golden jewellery', category: 'Bridal' },
  { id: 'g12', src: pexels(17056220, 1000), alt: 'Pedicure session with pink nail polish', category: 'Nails' },
];

export const faqs: FaqItem[] = [
  {
    question: 'How does booking work?',
    answer:
      'Choose a service or package and fill in the short booking form. Your enquiry is sent to us on WhatsApp, and our team replies to confirm availability. A booking is only confirmed once we message you back.',
  },
  {
    question: 'Do I need to pay when I send an enquiry?',
    answer:
      'No. Sending an enquiry is free. For bridal and engagement bookings we ask for a small advance on WhatsApp to reserve your date.',
  },
  {
    question: 'Can I get a trial before my wedding?',
    answer:
      'Yes. Premium, Luxury and Complete Transformation packages include a trial. A trial can also be added to the Basic package as an extra.',
  },
  {
    question: 'Do you travel to wedding venues?',
    answer:
      'Our bridal team can travel to your home or venue within the city. Travel charges for other locations are shared when we confirm your booking.',
  },
  {
    question: 'Which products do you use?',
    answer:
      'We use professional, dermatologically tested brands, and every client gets fresh disposable applicators. Tell us about allergies in your notes and we will plan accordingly.',
  },
  {
    question: 'What is your rescheduling policy?',
    answer:
      'You can reschedule once at no cost with at least 72 hours notice. Message us on WhatsApp and we will find the nearest available slot.',
  },
];
