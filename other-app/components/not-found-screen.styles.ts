import { sharedNotFoundScreenStyles } from '@/components/not-found-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useNotFoundScreenStyles() {
  return sharedNotFoundScreenStyles;
}
