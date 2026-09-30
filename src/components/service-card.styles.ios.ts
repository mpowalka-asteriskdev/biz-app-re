import { sharedServiceCardStyles } from '@/components/service-card.styles.shared';

/** iOS has no design of its own yet, so it uses the shared mobile design. */
export function useServiceCardStyles() {
  return sharedServiceCardStyles;
}
