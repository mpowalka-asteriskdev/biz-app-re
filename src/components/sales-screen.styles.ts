import { sharedSalesScreenStyles } from '@/components/sales-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useSalesScreenStyles() {
  return sharedSalesScreenStyles;
}
