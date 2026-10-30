import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { generalWhatsAppUrl } from '../../utils/whatsapp';

export const WhatsAppFloat = () => (
  <a
    href={generalWhatsAppUrl()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Chat with ${siteConfig.shortName} on WhatsApp`}
    className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25a35a] p-4 text-white shadow-lift transition-all duration-300 hover:scale-105 hover:bg-[#1f8d4e] sm:bottom-6 sm:right-6"
  >
    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25a35a]/40 [animation-duration:2.5s]" aria-hidden="true" />
    <MessageCircle className="h-6 w-6" aria-hidden="true" />
    <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[140px] group-focus-visible:max-w-[140px] sm:inline">
      Chat on WhatsApp
    </span>
  </a>
);
