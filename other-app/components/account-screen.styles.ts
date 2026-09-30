import { sharedAccountScreenStyles } from '@/components/account-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useAccountScreenStyles() {
  return sharedAccountScreenStyles;
}
