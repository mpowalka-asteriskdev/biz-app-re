import { sharedAuthScreenStyles } from '@/components/auth-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useAuthScreenStyles() {
  return sharedAuthScreenStyles;
}
