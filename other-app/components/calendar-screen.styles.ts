import { sharedCalendarScreenStyles } from '@/components/calendar-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useCalendarScreenStyles() {
  return sharedCalendarScreenStyles;
}
