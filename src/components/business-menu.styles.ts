import { sharedBusinessMenuStyles } from '@/components/business-menu.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useBusinessMenuStyles() {
  return sharedBusinessMenuStyles;
}
