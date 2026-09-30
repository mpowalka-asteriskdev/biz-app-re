import { sharedOnboardingStyles } from '@/components/onboarding.styles.shared';

/** iOS has no design of its own yet, so it uses the shared mobile design. */
export function useOnboardingStyles() {
  return sharedOnboardingStyles;
}
