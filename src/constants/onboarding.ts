import type { WeekDay } from '@/lib/places-api';

/** Opening-hours rows, Monday first: the places service's key and the label shown. */
export const WEEK_DAYS: { key: WeekDay; label: string }[] = [
  { key: 'monday', label: 'poniedziałek' },
  { key: 'tuesday', label: 'wtorek' },
  { key: 'wednesday', label: 'środa' },
  { key: 'thursday', label: 'czwartek' },
  { key: 'friday', label: 'piątek' },
  { key: 'saturday', label: 'sobota' },
  { key: 'sunday', label: 'niedziela' },
];

/** Times offered in the opening-hours popup: 0:00 to 23:30 every half hour. */
export const TIME_OPTIONS = Array.from(
  { length: 48 },
  (_, index) => `${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);
