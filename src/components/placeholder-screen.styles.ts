import { sharedPlaceholderScreenStyles } from '@/components/placeholder-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function usePlaceholderScreenStyles() {
  return sharedPlaceholderScreenStyles;
}
