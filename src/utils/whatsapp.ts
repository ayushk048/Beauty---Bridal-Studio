import { siteConfig } from '../config/site';
import type { BookableItem, BookingForm } from '../types';
import { formatDate, formatPrice } from './format';

/** Builds the enquiry text. Optional fields are omitted when empty. */
export const buildWhatsAppMessage = (item: BookableItem, form: BookingForm): string => {
  const price = item.priceIsStarting ? `Starting from ${formatPrice(item.price)}` : formatPrice(item.price);
  const email = form.email.trim();
  const notes = form.notes.trim();

  const lines: (string | null)[] = [
    'Hello! I would like to enquire about booking a beauty parlour service.',
    '',
    '*Booking Details*',
    '',
    `*Selected Plan:* ${item.name}`,
    `*Category:* ${item.categoryLabel}`,
    `*Price:* ${price}`,
    '',
    '*Customer Information*',
    `Name: ${form.fullName.trim()}`,
    `Mobile: ${form.mobile.trim()}`,
    email ? `Email: ${email}` : null,
    `City: ${form.city.trim()}`,
    '',
    '*Appointment Details*',
    `Preferred Date: ${formatDate(form.appointmentDate)}`,
    form.alternativeDate ? `Alternative Date: ${formatDate(form.alternativeDate)}` : null,
    `Preferred Time: ${form.timeSlot}`,
    form.eventDate ? `Wedding/Event Date: ${formatDate(form.eventDate)}` : null,
    `Event Type: ${form.eventType}`,
    notes ? '' : null,
    notes ? '*Additional Requirements:*' : null,
    notes ? notes : null,
    '',
    'Please share availability and confirm my booking.',
    '',
    'Thank you!',
  ];

  return lines.filter((l): l is string => l !== null).join('\n');
};

export const buildWhatsAppUrl = (message: string, number: string = siteConfig.whatsappNumber): string =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

/** Link for general (non-booking) WhatsApp contact. */
export const generalWhatsAppUrl = (): string =>
  buildWhatsAppUrl(`Hello ${siteConfig.shortName}! I would like to know more about your services.`);
