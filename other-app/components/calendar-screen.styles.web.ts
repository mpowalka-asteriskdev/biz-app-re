import { sharedCalendarScreenStyles } from '@/components/calendar-screen.styles.shared';

/** Mobile web uses the shared mobile design; the desktop web design is not built yet. */
export function useCalendarScreenStyles() {
  return sharedCalendarScreenStyles;
}
