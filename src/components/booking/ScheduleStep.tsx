import { CalendarHeart } from 'lucide-react';
import type { BookableItem, TimeSlot } from '../../types';
import { todayISO } from '../../utils/format';
import { ChoiceGroup } from './ChoiceGroup';
import { FormField, inputClass } from './FormField';
import type { StepProps } from './PersonalStep';

const timeSlots: { value: TimeSlot; label: string; description: string }[] = [
  { value: 'Morning', label: 'Morning', description: '9 AM – 12 PM' },
  { value: 'Afternoon', label: 'Afternoon', description: '12 PM – 4 PM' },
  { value: 'Evening', label: 'Evening', description: '4 PM – 8 PM' },
];

export const ScheduleStep = ({ form, errors, onChange, onBlur, item }: StepProps & { item: BookableItem }) => {
  const today = todayISO();
  const eventRequired = item.requiresEventDate;

  return (
    <div className="space-y-5">
      {eventRequired && (
        <div className="flex items-start gap-3 rounded-2xl bg-blush-50 p-4 text-sm text-cocoa-700">
          <CalendarHeart className="mt-0.5 h-5 w-5 shrink-0 text-blush-500" aria-hidden="true" />
          <p>
            <strong className="font-medium text-cocoa-900">Two different dates:</strong> your{' '}
            <em>appointment date</em> is when you visit us (for trial, prep or services); your{' '}
            <em>wedding / event date</em> is the day of the celebration.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField name="appointmentDate" label="Preferred appointment date" required error={errors.appointmentDate}>
          {(aria) => (
            <input
              {...aria}
              type="date"
              min={today}
              value={form.appointmentDate}
              onChange={(e) => onChange('appointmentDate', e.target.value)}
              onBlur={() => onBlur('appointmentDate')}
              className={inputClass(Boolean(errors.appointmentDate))}
            />
          )}
        </FormField>

        <FormField name="alternativeDate" label="Alternative date" error={errors.alternativeDate}>
          {(aria) => (
            <input
              {...aria}
              type="date"
              min={today}
              value={form.alternativeDate}
              onChange={(e) => onChange('alternativeDate', e.target.value)}
              onBlur={() => onBlur('alternativeDate')}
              className={inputClass(Boolean(errors.alternativeDate))}
            />
          )}
        </FormField>
      </div>

      <ChoiceGroup<TimeSlot>
        name="timeSlot"
        legend="Preferred time slot"
        required
        options={timeSlots}
        value={form.timeSlot}
        error={errors.timeSlot}
        columns="grid-cols-1 min-[420px]:grid-cols-3"
        onChange={(v) => {
          onChange('timeSlot', v);
          onBlur('timeSlot');
        }}
      />

      <FormField
        name="eventDate"
        label={eventRequired ? 'Wedding / event date' : 'Wedding / event date (if applicable)'}
        required={eventRequired}
        highlight={eventRequired}
        error={errors.eventDate}
        hint={eventRequired ? 'The day you need your final look.' : 'Add this if your booking is for a specific event.'}
      >
        {(aria) => (
          <input
            {...aria}
            type="date"
            min={today}
            value={form.eventDate}
            onChange={(e) => onChange('eventDate', e.target.value)}
            onBlur={() => onBlur('eventDate')}
            className={inputClass(Boolean(errors.eventDate))}
          />
        )}
      </FormField>

      <FormField name="notes" label="Additional requirements / notes">
        {(aria) => (
          <textarea
            {...aria}
            rows={3}
            maxLength={500}
            value={form.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Skin allergies, preferred artist, outfit colour, number of people…"
            className={inputClass(false)}
          />
        )}
      </FormField>
    </div>
  );
};
