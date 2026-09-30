import { sharedOnboardingStyles } from '@/components/onboarding.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useOnboardingStyles() {
  return sharedOnboardingStyles;
}
