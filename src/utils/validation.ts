import type { BookingErrors, BookingForm, BookableItem } from '../types';
import { isValidISODate, todayISO } from './format';

export const emptyForm: BookingForm = {
  fullName: '',
  mobile: '',
  email: '',
  city: '',
  eventType: '',
  appointmentDate: '',
  alternativeDate: '',
  timeSlot: '',
  eventDate: '',
  notes: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validatePersonal = (form: BookingForm): BookingErrors => {
  const errors: BookingErrors = {};
  if (form.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';

  const mobile = form.mobile.trim();
  const digits = mobile.replace(/\D/g, '');
  if (!mobile) errors.mobile = 'Please enter your WhatsApp / mobile number.';
  else if (!/^\+?[\d\s-]+$/.test(mobile) || digits.length < 10 || digits.length > 13)
    errors.mobile = 'Enter a valid number with 10–13 digits.';

  if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address or leave it blank.';
  if (form.city.trim().length < 2) errors.city = 'Please enter your city.';
  if (!form.eventType) errors.eventType = 'Please choose an event type.';
  return errors;
};

export const validateSchedule = (form: BookingForm, item: BookableItem): BookingErrors => {
  const errors: BookingErrors = {};
  const today = todayISO();

  if (!form.appointmentDate) errors.appointmentDate = 'Please choose your preferred appointment date.';
  else if (!isValidISODate(form.appointmentDate)) errors.appointmentDate = 'Enter a valid date.';
  else if (form.appointmentDate < today) errors.appointmentDate = 'Appointment date cannot be in the past.';

  if (form.alternativeDate) {
    if (!isValidISODate(form.alternativeDate)) errors.alternativeDate = 'Enter a valid date.';
    else if (form.alternativeDate < today) errors.alternativeDate = 'Alternative date cannot be in the past.';
    else if (form.alternativeDate === form.appointmentDate)
      errors.alternativeDate = 'Choose a different date from your preferred date.';
  }

  if (!form.timeSlot) errors.timeSlot = 'Please select a preferred time slot.';

  if (!form.eventDate) {
    if (item.requiresEventDate) errors.eventDate = 'Please enter your wedding / event date.';
  } else if (!isValidISODate(form.eventDate)) errors.eventDate = 'Enter a valid date.';
  else if (form.eventDate < today) errors.eventDate = 'Wedding / event date cannot be in the past.';
  else if (form.appointmentDate && form.eventDate < form.appointmentDate)
    errors.eventDate = 'Event date should be on or after your appointment date.';

  return errors;
};

export const hasErrors = (errors: BookingErrors): boolean => Object.keys(errors).length > 0;
