import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useBooking } from '../../context/BookingContext';
import { generalWhatsAppUrl } from '../../utils/whatsapp';
import { buttonStyles } from '../ui/buttonStyles';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.mapQuery)}&output=embed`;

export const ContactSection = () => {
  const { openBooking } = useBooking();
  const telHref = `tel:+${siteConfig.whatsappNumber}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-beige-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="Visit & Contact"
          title={
            <>
              Let&rsquo;s plan your <span className="italic text-blush-600">perfect look</span>
            </>
          }
          description="Walk in, call us, or message on WhatsApp. We reply to every enquiry personally."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-600">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-medium">Studio address</h3>
                    <address className="mt-1 not-italic text-cocoa-600">
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.line2}
                      <br />
                      {siteConfig.address.city}
                    </address>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-600">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-medium">Call / WhatsApp</h3>
                    <a href={telHref} className="mt-1 block text-cocoa-600 hover:text-cocoa-900">
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-600">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-medium">Email</h3>
                    <a href={`mailto:${siteConfig.email}`} className="mt-1 block break-all text-cocoa-600 hover:text-cocoa-900">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-600">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-medium">Opening hours</h3>
                    <dl className="mt-1 space-y-1 text-cocoa-600">
                      {siteConfig.openingHours.map((h) => (
                        <div key={h.days} className="flex flex-col sm:flex-row sm:gap-3">
                          <dt className="font-medium text-cocoa-700 sm:w-40">{h.days}</dt>
                          <dd>{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonStyles('whatsapp', 'md')}>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> Chat on WhatsApp
                </a>
                <button type="button" onClick={() => openBooking()} className={buttonStyles('primary', 'md')}>
                  Book an Appointment
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full min-h-[320px] overflow-hidden rounded-[2rem] shadow-soft">
              <iframe
                title={`Map showing ${siteConfig.name}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[320px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
