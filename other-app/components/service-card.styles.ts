import { sharedServiceCardStyles } from '@/components/service-card.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useServiceCardStyles() {
  return sharedServiceCardStyles;
}
