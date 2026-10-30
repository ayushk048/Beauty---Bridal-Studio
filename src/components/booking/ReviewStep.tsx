import type { ReactNode } from 'react';
import { AlertCircle, Pencil } from 'lucide-react';
import type { BookableItem, BookingForm } from '../../types';
import { formatDate, formatPrice } from '../../utils/format';

interface Props {
  item: BookableItem;
  form: BookingForm;
  message: string;
  onEdit: (step: number) => void;
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="grid grid-cols-[120px_1fr] gap-3 py-2 text-sm sm:grid-cols-[150px_1fr]">
      <dt className="text-cocoa-500">{label}</dt>
      <dd className="break-words font-medium text-cocoa-900">{value}</dd>
    </div>
  ) : null;

const Section = ({ title, step, onEdit, children }: { title: string; step: number; onEdit: (s: number) => void; children: ReactNode }) => (
  <section className="rounded-3xl border border-beige-200 bg-white p-5">
    <div className="mb-1 flex items-center justify-between">
      <h3 className="font-serif text-lg">{title}</h3>
      <button
        type="button"
        onClick={() => onEdit(step)}
        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm text-gold-600 hover:bg-gold-100"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit<span className="sr-only"> {title}</span>
      </button>
    </div>
    <dl className="divide-y divide-beige-100">{children}</dl>
  </section>
);

export const ReviewStep = ({ item, form, message, onEdit }: Props) => (
  <div className="space-y-4">
    <div className="flex items-start gap-3 rounded-2xl bg-gold-100/70 p-4 text-sm text-cocoa-700">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
      <p>
        This is a <strong className="font-medium">booking enquiry</strong>. It is not confirmed yet &mdash; the
        parlour will check availability and confirm with you on WhatsApp.
      </p>
    </div>

    <Section title="Selected plan" step={1} onEdit={onEdit}>
      <Row label="Plan" value={item.name} />
      <Row label="Category" value={item.categoryLabel} />
      <Row label="Price" value={`${item.priceIsStarting ? 'Starting from ' : ''}${formatPrice(item.price)}`} />
    </Section>

    <Section title="Your details" step={2} onEdit={onEdit}>
      <Row label="Name" value={form.fullName.trim()} />
      <Row label="Mobile" value={form.mobile.trim()} />
      <Row label="Email" value={form.email.trim() || undefined} />
      <Row label="City" value={form.city.trim()} />
      <Row label="Event type" value={form.eventType} />
    </Section>

    <Section title="Appointment" step={3} onEdit={onEdit}>
      <Row label="Preferred date" value={formatDate(form.appointmentDate)} />
      <Row label="Alternative date" value={form.alternativeDate ? formatDate(form.alternativeDate) : undefined} />
      <Row label="Preferred time" value={form.timeSlot} />
      <Row label="Wedding / event" value={form.eventDate ? formatDate(form.eventDate) : undefined} />
      <Row label="Notes" value={form.notes.trim() || undefined} />
    </Section>

    <details className="rounded-2xl border border-beige-200 bg-white p-4 text-sm">
      <summary className="cursor-pointer font-medium text-cocoa-800">Preview WhatsApp message</summary>
      <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-beige-100 p-3 font-sans text-xs text-cocoa-700">
        {message}
      </pre>
    </details>
  </div>
);
