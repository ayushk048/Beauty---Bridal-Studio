import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle, X } from 'lucide-react';
import type { BookableItem, BookingErrors, BookingForm } from '../../types';
import { defaultEventTypeFor, getBookableByKey, serviceItems } from '../../utils/catalog';
import { formatPrice } from '../../utils/format';
import { emptyForm, hasErrors, validatePersonal, validateSchedule } from '../../utils/validation';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { buttonStyles } from '../ui/buttonStyles';
import { Modal } from '../ui/Modal';
import { fieldId } from './FormField';
import { PersonalStep } from './PersonalStep';
import { PlanStep } from './PlanStep';
import { ReviewStep } from './ReviewStep';
import { ScheduleStep } from './ScheduleStep';
import { Stepper } from './Stepper';
import { SuccessStep } from './SuccessStep';

interface Props {
  open: boolean;
  initialItemKey?: string;
  onClose: () => void;
}

const STEP_LABELS = ['Plan', 'Your details', 'Date & time', 'Review'];
const STEP_TITLES = ['Your selected plan', 'Tell us about you', 'Choose your date & time', 'Review & confirm'];
const PERSONAL_FIELDS: (keyof BookingForm)[] = ['fullName', 'mobile', 'email', 'city', 'eventType'];
const SCHEDULE_FIELDS: (keyof BookingForm)[] = ['appointmentDate', 'alternativeDate', 'timeSlot', 'eventDate'];
const SUCCESS_STEP = 5;

const DEFAULT_ITEM: BookableItem = getBookableByKey('service:fs-glow') ?? serviceItems[0];

const initialFor = (key?: string): { item: BookableItem; form: BookingForm } => {
  const item = (key && getBookableByKey(key)) || DEFAULT_ITEM;
  return { item, form: { ...emptyForm, eventType: defaultEventTypeFor(item) } };
};

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 32 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -32 }),
};

export const BookingWizard = ({ open, initialItemKey, onClose }: Props) => {
  const [prevOpen, setPrevOpen] = useState(false);
  const [item, setItem] = useState<BookableItem>(DEFAULT_ITEM);
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [touched, setTouched] = useState<Partial<Record<keyof BookingForm, boolean>>>({});
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [confirmClose, setConfirmClose] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Reset the wizard each time it is opened (state adjusted during render, not in an effect).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      const init = initialFor(initialItemKey);
      setItem(init.item);
      setForm(init.form);
      setTouched({});
      setStep(1);
      setDirection(1);
      setConfirmClose(false);
      setWaUrl('');
    }
  }

  const errors = useMemo<BookingErrors>(() => ({ ...validatePersonal(form), ...validateSchedule(form, item) }), [form, item]);
  const visibleErrors = useMemo<BookingErrors>(() => {
    const out: BookingErrors = {};
    (Object.keys(errors) as (keyof BookingForm)[]).forEach((k) => {
      if (touched[k]) out[k] = errors[k];
    });
    return out;
  }, [errors, touched]);

  const personalValid = !PERSONAL_FIELDS.some((f) => errors[f]);
  const scheduleValid = !SCHEDULE_FIELDS.some((f) => errors[f]);
  const maxReachable = personalValid ? (scheduleValid ? 4 : 3) : 2;
  const canConfirm = personalValid && scheduleValid;

  const isDirty =
    step < SUCCESS_STEP &&
    (['fullName', 'mobile', 'email', 'city', 'appointmentDate', 'alternativeDate', 'timeSlot', 'eventDate', 'notes'] as const).some(
      (k) => form[k].trim() !== '',
    );

  // Move focus to the step heading and reset scroll on each step change (a11y + UX).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    bodyRef.current?.scrollTo({ top: 0 });
    const t = window.setTimeout(() => document.getElementById('bk-step-heading')?.focus({ preventScroll: true }), 320);
    return () => window.clearTimeout(t);
  }, [step]);

  const message = useMemo(() => (canConfirm ? buildWhatsAppMessage(item, form) : ''), [canConfirm, item, form]);

  const requestClose = () => {
    if (confirmClose) {
      setConfirmClose(false);
      return;
    }
    if (isDirty) setConfirmClose(true);
    else onClose();
  };

  const setField = <K extends keyof BookingForm>(field: K, value: BookingForm[K]) =>
    setForm((f) => ({ ...f, [field]: value }));
  const touch = (field: keyof BookingForm) => setTouched((t) => (t[field] ? t : { ...t, [field]: true }));

  const changePlan = (key: string) => {
    const next = getBookableByKey(key);
    if (!next) return;
    const prevDefault = defaultEventTypeFor(item);
    setForm((f) => (!f.eventType || f.eventType === prevDefault ? { ...f, eventType: defaultEventTypeFor(next) } : f));
    setItem(next);
  };

  const move = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const goTo = (target: number) => {
    if (target < step || target <= maxReachable) move(target);
  };

  const attempt = (fields: (keyof BookingForm)[], errs: BookingErrors): boolean => {
    if (!hasErrors(errs)) return true;
    setTouched((t) => ({ ...t, ...Object.fromEntries(fields.map((f) => [f, true])) }));
    const first = fields.find((f) => errs[f]);
    if (first) window.setTimeout(() => document.getElementById(fieldId(first))?.focus(), 60);
    return false;
  };

  const next = () => {
    if (step === 2 && !attempt(PERSONAL_FIELDS, validatePersonal(form))) return;
    if (step === 3 && !attempt(SCHEDULE_FIELDS, validateSchedule(form, item))) return;
    move(step + 1);
  };

  const confirm = () => {
    if (!canConfirm) return;
    const url = buildWhatsAppUrl(buildWhatsAppMessage(item, form));
    setWaUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    move(SUCCESS_STEP);
  };

  const isSuccess = step === SUCCESS_STEP;

  return (
    <Modal open={open} onRequestClose={requestClose} labelledBy="bk-title">
      <div inert={confirmClose} className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-beige-200 bg-gradient-to-b from-blush-50 to-ivory px-5 pb-4 pt-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-600">
                {isSuccess ? 'All set' : `Step ${step} of ${STEP_LABELS.length}`}
              </p>
              <h2 id="bk-title" className="mt-1 text-xl sm:text-2xl">
                Book your appointment
              </h2>
            </div>
            <button
              type="button"
              onClick={requestClose}
              aria-label="Close booking form"
              className="rounded-full p-2 text-cocoa-600 transition hover:bg-blush-100 hover:text-cocoa-900"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {!isSuccess && (
            <div className="mt-4">
              <Stepper steps={STEP_LABELS} current={step} maxReachable={maxReachable} onSelect={goTo} />
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-beige-200" aria-hidden="true">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-500"
                  animate={{ width: `${(step / STEP_LABELS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}
        </header>

        <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {!isSuccess && (
                <h3 id="bk-step-heading" tabIndex={-1} className="mb-5 text-xl outline-none sm:text-2xl">
                  {STEP_TITLES[step - 1]}
                </h3>
              )}
              {step === 1 && <PlanStep item={item} onChange={changePlan} />}
              {step === 2 && <PersonalStep form={form} errors={visibleErrors} onChange={setField} onBlur={touch} />}
              {step === 3 && <ScheduleStep form={form} errors={visibleErrors} onChange={setField} onBlur={touch} item={item} />}
              {step === 4 && <ReviewStep item={item} form={form} message={message} onEdit={goTo} />}
              {isSuccess && <SuccessStep url={waUrl} onClose={onClose} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {!isSuccess && (
          <footer className="shrink-0 border-t border-beige-200 bg-white/80 px-5 py-4 sm:px-8">
            {step > 1 && (
              <p className="mb-3 truncate text-sm text-cocoa-600">
                <span className="font-medium text-cocoa-900">{item.name}</span> &middot; {item.priceIsStarting ? 'from ' : ''}
                {formatPrice(item.price)}
              </p>
            )}
            {step === 4 && !canConfirm && (
              <p role="status" className="mb-3 text-sm text-blush-600">
                Some required details are missing or invalid. Use &ldquo;Edit&rdquo; above to fix them.
              </p>
            )}
            <div className="flex items-center justify-between gap-3">
              {step > 1 ? (
                <button type="button" onClick={() => move(step - 1)} className={buttonStyles('ghost', 'md')}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
              ) : (
                <button type="button" onClick={requestClose} className={buttonStyles('ghost', 'md')}>
                  Cancel
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={next} className={buttonStyles('primary', 'md')}>
                  Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button type="button" onClick={confirm} disabled={!canConfirm} className={buttonStyles('whatsapp', 'md')}>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden min-[420px]:inline">Confirm Booking via WhatsApp</span>
                  <span className="min-[420px]:hidden">Send on WhatsApp</span>
                </button>
              )}
            </div>
          </footer>
        )}
      </div>

      <AnimatePresence>
        {confirmClose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-cocoa-900/50 p-6"
          >
            <div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="bk-discard-title"
              aria-describedby="bk-discard-desc"
              className="w-full max-w-sm rounded-3xl bg-ivory p-6 text-center shadow-lift"
            >
              <h3 id="bk-discard-title" className="text-xl">
                Discard your enquiry?
              </h3>
              <p id="bk-discard-desc" className="mt-2 text-sm text-cocoa-600">
                You&rsquo;ve entered some details. If you close now, they will be lost.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <button type="button" autoFocus onClick={() => setConfirmClose(false)} className={buttonStyles('primary', 'md')}>
                  Keep editing
                </button>
                <button type="button" onClick={onClose} className={buttonStyles('outline', 'md')}>
                  Discard &amp; close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
