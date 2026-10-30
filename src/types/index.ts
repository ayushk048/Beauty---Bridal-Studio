import type { LucideIcon } from 'lucide-react';

export type ServiceCategoryId =
  | 'facial'
  | 'hair-care'
  | 'hair-styling'
  | 'hair-spa'
  | 'waxing'
  | 'threading'
  | 'mani-pedi'
  | 'party-makeup'
  | 'engagement-makeup'
  | 'pre-bridal';

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  icon: LucideIcon;
}

export interface Service {
  id: string;
  category: ServiceCategoryId;
  name: string;
  description: string;
  /** Starting price in INR. */
  price: number;
  duration: string;
  image: string;
  includes: string[];
  popular?: boolean;
}

export type PackageGroupId = 'bridal' | 'engagement' | 'pre-bridal' | 'guest';

export interface PackageGroup {
  id: PackageGroupId;
  label: string;
  /** Label used in the WhatsApp message "Category" line. */
  messageLabel: string;
  description: string;
}

export interface BridalPackage {
  id: string;
  group: PackageGroupId;
  name: string;
  tagline: string;
  price: number;
  /** Strike-through price, for display only. */
  originalPrice?: number;
  validity: string;
  sessions: number;
  suitableFor: string;
  image: string;
  features: string[];
  popular?: boolean;
}

/** A service or package that can be booked through the wizard. */
export interface BookableItem {
  key: string;
  kind: 'service' | 'package';
  name: string;
  categoryLabel: string;
  price: number;
  priceIsStarting: boolean;
  duration?: string;
  includes: string[];
  image: string;
  /** Bridal packages require a wedding / event date. */
  requiresEventDate: boolean;
}

export type EventType = 'Bridal' | 'Engagement' | 'Party Makeup' | 'Regular Beauty Service' | 'Other';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';

export interface BookingForm {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  eventType: EventType | '';
  appointmentDate: string;
  alternativeDate: string;
  timeSlot: TimeSlot | '';
  eventDate: string;
  notes: string;
}

export type BookingErrors = Partial<Record<keyof BookingForm, string>>;

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  service: string;
  quote: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'Bridal' | 'Makeup' | 'Skincare' | 'Hair' | 'Nails';
}

export interface FaqItem {
  question: string;
  answer: string;
}
