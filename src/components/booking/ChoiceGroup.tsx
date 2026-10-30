interface Option<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface Props<T extends string> {
  name: string;
  legend: string;
  required?: boolean;
  options: Option<T>[];
  value: T | '';
  error?: string;
  columns?: string;
  onChange: (value: T) => void;
}

/** Accessible radio group rendered as selectable chips. */
export const ChoiceGroup = <T extends string>({ name, legend, required, options, value, error, columns = 'grid-cols-2', onChange }: Props<T>) => {
  const errorId = `bk-${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-cocoa-800">
        {legend}
        {required && (
          <span className="text-blush-600" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div id={`bk-${name}`} tabIndex={-1} role="radiogroup" aria-required={required} aria-invalid={Boolean(error)} className={`grid gap-2 outline-none ${columns}`}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm transition focus-within:ring-2 focus-within:ring-gold-300 ${
                checked
                  ? 'border-gold-500 bg-gold-100 text-cocoa-900 shadow-soft'
                  : error
                    ? 'border-blush-300 bg-white hover:border-gold-400'
                    : 'border-beige-300 bg-white hover:border-gold-400'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span className="block font-medium">{o.label}</span>
              {o.description && <span className="mt-0.5 block text-xs text-cocoa-500">{o.description}</span>}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-blush-600">
          {error}
        </p>
      )}
    </fieldset>
  );
};
