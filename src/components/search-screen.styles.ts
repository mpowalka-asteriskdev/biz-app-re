import { sharedSearchScreenStyles } from '@/components/search-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useSearchScreenStyles() {
  return sharedSearchScreenStyles;
}
