import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../config/site';
import { buttonStyles } from '../ui/buttonStyles';

interface Props {
  url: string;
  onClose: () => void;
}

export const SuccessStep = ({ url, onClose }: Props) => (
  <div className="py-4 text-center">
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 12 }}
      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#25a35a]/10 text-[#25a35a]"
    >
      <MessageCircle className="h-10 w-10" aria-hidden="true" />
    </motion.div>
    <h3 id="bk-step-heading" tabIndex={-1} className="mt-5 text-2xl outline-none sm:text-3xl">
      Your enquiry is ready
    </h3>
    <p className="mx-auto mt-3 max-w-md text-cocoa-600">
      WhatsApp is opening with your booking enquiry pre-filled. Please press <strong className="font-medium">Send</strong> in
      WhatsApp to share it with {siteConfig.shortName}.
    </p>
    <div className="mx-auto mt-5 max-w-md rounded-2xl bg-gold-100/70 p-4 text-left text-sm text-cocoa-700">
      <p className="font-medium text-cocoa-900">What happens next?</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>This is an enquiry, not a confirmed booking.</li>
        <li>Our team will check availability and reply on WhatsApp to confirm your slot.</li>
        <li>No payment is taken on this website.</li>
      </ul>
    </div>
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <a href={url} target="_blank" rel="noopener noreferrer" className={buttonStyles('whatsapp', 'md')}>
        <MessageCircle className="h-5 w-5" aria-hidden="true" /> Open WhatsApp again
      </a>
      <button type="button" onClick={onClose} className={buttonStyles('outline', 'md')}>
        Close
      </button>
    </div>
    <p className="mt-4 text-xs text-cocoa-500">If WhatsApp didn&rsquo;t open, your browser may have blocked the pop-up &mdash; use the button above.</p>
  </div>
);
