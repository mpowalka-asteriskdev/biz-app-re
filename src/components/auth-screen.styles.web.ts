import { StyleSheet } from 'react-native';

import { sharedAuthScreenStyles } from '@/components/auth-screen.styles.shared';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

/** Applies to mobile and desktop web. */
const webOverrides = StyleSheet.create({
  // The browser outlines only the inner <input>; the whole field is highlighted instead.
  fieldFocused: {
    borderColor: '#E85012',
  },
  input: {
    outlineWidth: 0,
  },
});

/** Desktop web design ("Login screen desktop" / "Register screen" in Figma). */
const webDesktopOverrides = StyleSheet.create({
  hero: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 64,
    paddingTop: 43,
    paddingBottom: 72,
    gap: 48,
  },
  header: {
    alignItems: 'stretch',
    marginTop: 0,
    maxWidth: 1224,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formWrap: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  formWrapRegister: {
    marginBottom: 'auto',
  },
  headingBlock: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
  },
  // Narrower than the form, so the login text breaks into two lines as in Figma.
  description: {
    alignSelf: 'center',
    maxWidth: 502,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  fields: {
    gap: 16,
  },
  primaryButton: {
    alignSelf: 'center',
    width: 339,
    minHeight: 50,
    borderRadius: 25,
    marginTop: 24,
  },
  primaryButtonLabel: {
    fontSize: 20,
  },
  divider: {
    alignSelf: 'center',
    width: 524,
    marginTop: 16,
    marginBottom: 34,
    backgroundColor: '#F9F6F2',
  },
  socialButtons: {
    gap: 15,
  },
  socialButton: {
    minHeight: 40,
    gap: 5,
  },
});

type AuthScreenStyles = Record<string, unknown>;

function withOverrides(base: AuthScreenStyles, overrides: AuthScreenStyles): AuthScreenStyles {
  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(overrides).map(([key, style]) => [key, [base[key], style]]),
    ),
  };
}

const webMobileStyles = withOverrides(sharedAuthScreenStyles, webOverrides) as typeof sharedAuthScreenStyles;
const webDesktopStyles = withOverrides(webMobileStyles, webDesktopOverrides) as typeof sharedAuthScreenStyles;

export function useAuthScreenStyles() {
  const { isWebDesktop } = usePlatformLayout();

  return isWebDesktop ? webDesktopStyles : webMobileStyles;
}
