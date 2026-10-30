import type { BookingErrors, BookingForm, EventType } from '../../types';
import { ChoiceGroup } from './ChoiceGroup';
import { FormField, inputClass } from './FormField';

export interface StepProps {
  form: BookingForm;
  errors: BookingErrors;
  onChange: <K extends keyof BookingForm>(field: K, value: BookingForm[K]) => void;
  onBlur: (field: keyof BookingForm) => void;
}

const eventTypes: { value: EventType; label: string }[] = [
  { value: 'Bridal', label: 'Bridal' },
  { value: 'Engagement', label: 'Engagement' },
  { value: 'Party Makeup', label: 'Party Makeup' },
  { value: 'Regular Beauty Service', label: 'Regular Beauty Service' },
  { value: 'Other', label: 'Other' },
];

export const PersonalStep = ({ form, errors, onChange, onBlur }: StepProps) => (
  <div className="space-y-5">
    <FormField name="fullName" label="Full name" required error={errors.fullName}>
      {(aria) => (
        <input
          {...aria}
          type="text"
          autoComplete="name"
          value={form.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          onBlur={() => onBlur('fullName')}
          placeholder="e.g. Priya Sharma"
          className={inputClass(Boolean(errors.fullName))}
        />
      )}
    </FormField>

    <FormField name="mobile" label="WhatsApp / mobile number" required error={errors.mobile} hint="Include country code if outside India.">
      {(aria) => (
        <input
          {...aria}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.mobile}
          onChange={(e) => onChange('mobile', e.target.value)}
          onBlur={() => onBlur('mobile')}
          placeholder="e.g. +91 98765 43210"
          className={inputClass(Boolean(errors.mobile))}
        />
      )}
    </FormField>

    <div className="grid gap-5 sm:grid-cols-2">
      <FormField name="email" label="Email address" error={errors.email}>
        {(aria) => (
          <input
            {...aria}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            onBlur={() => onBlur('email')}
            placeholder="you@example.com"
            className={inputClass(Boolean(errors.email))}
          />
        )}
      </FormField>

      <FormField name="city" label="City" required error={errors.city}>
        {(aria) => (
          <input
            {...aria}
            type="text"
            autoComplete="address-level2"
            value={form.city}
            onChange={(e) => onChange('city', e.target.value)}
            onBlur={() => onBlur('city')}
            placeholder="e.g. Jaipur"
            className={inputClass(Boolean(errors.city))}
          />
        )}
      </FormField>
    </div>

    <ChoiceGroup<EventType>
      name="eventType"
      legend="Event type"
      required
      options={eventTypes}
      value={form.eventType}
      error={errors.eventType}
      columns="grid-cols-1 min-[420px]:grid-cols-2"
      onChange={(v) => {
        onChange('eventType', v);
        onBlur('eventType');
      }}
    />
  </div>
);
