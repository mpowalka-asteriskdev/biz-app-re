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

/** Desktop web design ("Company details register" frames in Figma). */
const webDesktopOverrides = StyleSheet.create({
  title: {
    marginTop: 35,
  },
  description: {
    marginTop: 9,
  },
  // Lines up with the left-aligned button.
  message: {
    textAlign: 'left',
  },
  industryList: {
    marginTop: 30,
    marginHorizontal: 0,
  },
  // Below the button on desktop.
  consents: {
    marginTop: 44,
    paddingTop: 0,
  },
  checkboxRowNested: {
    marginLeft: 51,
  },
  profileTitle: {
    color: '#201F1E',
  },
  profileDescription: {
    color: '#201F1E',
  },
  hoursRow: {
    paddingLeft: 2,
  },
  hoursDetails: {
    marginLeft: 47,
  },
  hoursDay: {
    width: 352,
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
