import { sharedProfileScreenStyles } from '@/components/profile-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useProfileScreenStyles() {
  return sharedProfileScreenStyles;
}
