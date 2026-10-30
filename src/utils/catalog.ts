import { bridalPackages, packageGroups } from '../data/packages';
import { serviceCategories, services } from '../data/services';
import type { BookableItem, BridalPackage, EventType, Service } from '../types';

export const serviceToBookable = (s: Service): BookableItem => ({
  key: `service:${s.id}`,
  kind: 'service',
  name: s.name,
  categoryLabel: `Service – ${serviceCategories.find((c) => c.id === s.category)?.label ?? 'Beauty Service'}`,
  price: s.price,
  priceIsStarting: true,
  duration: s.duration,
  includes: s.includes,
  image: s.image,
  requiresEventDate: false,
});

export const packageToBookable = (p: BridalPackage): BookableItem => ({
  key: `package:${p.id}`,
  kind: 'package',
  name: p.name,
  categoryLabel: packageGroups.find((g) => g.id === p.group)?.messageLabel ?? 'Bridal Package',
  price: p.price,
  priceIsStarting: false,
  duration: p.validity,
  includes: p.features,
  image: p.image,
  requiresEventDate: p.group !== 'guest',
});

export const serviceItems: BookableItem[] = services.map(serviceToBookable);
export const packageItems: BookableItem[] = bridalPackages.map(packageToBookable);

export const getBookableByKey = (key: string): BookableItem | undefined =>
  [...packageItems, ...serviceItems].find((i) => i.key === key);

/** Suggested event type for a booking item, used to pre-fill the wizard. */
export const defaultEventTypeFor = (item: BookableItem): EventType => {
  if (item.kind === 'package') {
    const pkg = bridalPackages.find((p) => `package:${p.id}` === item.key);
    if (pkg?.group === 'engagement') return 'Engagement';
    if (pkg?.group === 'guest') return 'Party Makeup';
    return 'Bridal';
  }
  const svc = services.find((s) => `service:${s.id}` === item.key);
  switch (svc?.category) {
    case 'party-makeup':
      return 'Party Makeup';
    case 'engagement-makeup':
      return 'Engagement';
    case 'pre-bridal':
      return 'Bridal';
    default:
      return 'Regular Beauty Service';
  }
};
