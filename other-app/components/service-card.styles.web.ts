import { sharedServiceCardStyles } from '@/components/service-card.styles.shared';

/** Mobile web uses the shared mobile design; the desktop web design is not built yet. */
export function useServiceCardStyles() {
  return sharedServiceCardStyles;
}
