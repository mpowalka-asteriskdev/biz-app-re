import { StyleSheet } from 'react-native';

import { sharedOnboardingStyles } from '@/components/onboarding.styles.shared';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

/** Applies to mobile and desktop web. */
const webOverrides = StyleSheet.create({
  // The browser outlines only the inner <input>; the whole field is highlighted instead.
  fieldFocused: {
    borderColor: '#E64F21',
  },
  input: {
    outlineWidth: 0,
  },
});

/**
 * Desktop web has no design of its own: the Android layout sits in a phone-sized card (the
 * Figma frames are 393x852) on the login page's photo.
 */
const webDesktopOverrides = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    backgroundColor: '#11110F',
  },
  column: {
    maxWidth: 393,
    maxHeight: 852,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.35)',
  },
});

type OnboardingStyles = Record<string, unknown>;

function withOverrides(base: OnboardingStyles, overrides: OnboardingStyles): OnboardingStyles {
  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(overrides).map(([key, style]) => [key, [base[key], style]]),
    ),
  };
}

const webMobileStyles = withOverrides(sharedOnboardingStyles, webOverrides) as typeof sharedOnboardingStyles;
const webDesktopStyles = withOverrides(webMobileStyles, webDesktopOverrides) as typeof sharedOnboardingStyles;

export function useOnboardingStyles() {
  const { isWebDesktop } = usePlatformLayout();

  return isWebDesktop ? webDesktopStyles : webMobileStyles;
}
