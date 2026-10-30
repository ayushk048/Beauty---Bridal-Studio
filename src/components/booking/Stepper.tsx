import { Check } from 'lucide-react';

interface Props {
  steps: string[];
  current: number;
  /** Highest step the user may jump to. */
  maxReachable: number;
  onSelect: (step: number) => void;
}

export const Stepper = ({ steps, current, maxReachable, onSelect }: Props) => (
  <nav aria-label="Booking progress">
    <p className="sr-only" aria-live="polite">
      Step {current} of {steps.length}: {steps[current - 1]}
    </p>
    <ol className="flex items-center gap-1.5 sm:gap-2">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        const reachable = n <= maxReachable;
        return (
          <li key={label} className="flex flex-1 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onSelect(n)}
              disabled={!reachable || active}
              aria-current={active ? 'step' : undefined}
              aria-label={`Step ${n}: ${label}${done ? ' (completed)' : ''}`}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition ${
                active
                  ? 'bg-cocoa-800 text-ivory'
                  : done
                    ? 'bg-gold-400 text-cocoa-900 hover:bg-gold-300'
                    : 'bg-beige-200 text-cocoa-500'
              } disabled:cursor-default`}
            >
              {done ? <Check className="h-4 w-4" aria-hidden="true" /> : n}
            </button>
            <span className={`hidden text-xs sm:block ${active ? 'font-medium text-cocoa-900' : 'text-cocoa-500'}`}>
              {label}
            </span>
            {n < steps.length && <span className="h-px flex-1 bg-beige-300" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);
