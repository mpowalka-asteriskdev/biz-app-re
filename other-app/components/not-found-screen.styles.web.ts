import { StyleSheet } from 'react-native';

import { sharedNotFoundScreenStyles } from '@/components/not-found-screen.styles.shared';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

/** Desktop web: the header box of the landing pages and a larger message. */
const webDesktopOverrides = StyleSheet.create({
  headerContent: {
    paddingHorizontal: 64,
    paddingVertical: 43,
  },
  content: {
    paddingVertical: 140,
  },
  code: {
    fontSize: 140,
    lineHeight: 150,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
  },
});

type NotFoundScreenStyles = typeof sharedNotFoundScreenStyles;

// Flattened into plain objects: the button is a Link child, and Link's Slot rejects style arrays.
const webDesktopStyles = Object.fromEntries(
  Object.entries(sharedNotFoundScreenStyles).map(([key, style]) => [
    key,
    StyleSheet.flatten([style, webDesktopOverrides[key as keyof typeof webDesktopOverrides]]),
  ]),
) as NotFoundScreenStyles;

/** Mobile web uses the shared mobile design; desktop web adds the overrides above. */
export function useNotFoundScreenStyles() {
  const { isWebDesktop } = usePlatformLayout();

  return isWebDesktop ? webDesktopStyles : sharedNotFoundScreenStyles;
}
