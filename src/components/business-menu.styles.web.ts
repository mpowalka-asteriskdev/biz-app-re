import { sharedBusinessMenuStyles } from '@/components/business-menu.styles.shared';

/** Mobile web uses the phone design; desktop web has the header menu instead. */
export function useBusinessMenuStyles() {
  return sharedBusinessMenuStyles;
}
