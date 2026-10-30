import { Check, Clock } from 'lucide-react';
import { bridalPackages, packageGroups } from '../../data/packages';
import { serviceCategories, services } from '../../data/services';
import type { BookableItem } from '../../types';
import { formatPrice } from '../../utils/format';
import { SmoothImage } from '../ui/SmoothImage';
import { fieldId, FormField, inputClass } from './FormField';

interface Props {
  item: BookableItem;
  onChange: (key: string) => void;
}

export const PlanStep = ({ item, onChange }: Props) => (
  <div className="space-y-6">
    <div className="overflow-hidden rounded-3xl border border-beige-200 bg-white shadow-soft">
      <div className="grid sm:grid-cols-[180px_1fr]">
        <SmoothImage src={item.image} alt={item.name} wrapperClassName="h-44 sm:h-full" className="object-top" />
        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600">{item.categoryLabel}</p>
          <h3 className="mt-1 text-2xl">{item.name}</h3>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-serif text-2xl text-cocoa-900">
              {item.priceIsStarting && <span className="mr-1 text-sm font-sans text-cocoa-500">from</span>}
              {formatPrice(item.price)}
            </span>
            {item.duration && (
              <span className="inline-flex items-center gap-1 text-sm text-cocoa-600">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {item.duration}
              </span>
            )}
          </p>
          <p className="mb-2 mt-4 text-sm font-medium text-cocoa-800">What&rsquo;s included</p>
          <ul className="space-y-1.5">
            {item.includes.map((inc) => (
              <li key={inc} className="flex items-start gap-2 text-sm text-cocoa-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                {inc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <FormField name="plan" label="Change your plan" required hint="Prices are indicative and confirmed by the parlour on WhatsApp.">
      {(aria) => (
        <select {...aria} id={fieldId('plan')} value={item.key} onChange={(e) => onChange(e.target.value)} className={inputClass(false)}>
          {packageGroups.map((g) => (
            <optgroup key={g.id} label={g.label}>
              {bridalPackages
                .filter((p) => p.group === g.id)
                .map((p) => (
                  <option key={p.id} value={`package:${p.id}`}>
                    {p.name} – {formatPrice(p.price)}
                  </option>
                ))}
            </optgroup>
          ))}
          {serviceCategories.map((c) => (
            <optgroup key={c.id} label={c.label}>
              {services
                .filter((s) => s.category === c.id)
                .map((s) => (
                  <option key={s.id} value={`service:${s.id}`}>
                    {s.name} – from {formatPrice(s.price)}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      )}
    </FormField>
  </div>
);
