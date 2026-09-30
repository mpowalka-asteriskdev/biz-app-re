import { sharedAccountScreenStyles } from '@/components/account-screen.styles.shared';

/** Mobile web uses the shared mobile design; desktop web renders AccountDesktop instead. */
export function useAccountScreenStyles() {
  return sharedAccountScreenStyles;
}
