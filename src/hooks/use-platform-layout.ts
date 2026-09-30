import { Platform, useWindowDimensions } from 'react-native';

import { WebDesktopBreakpoint } from '@/constants/layout';

export type PlatformLayoutTarget = 'web-mobile' | 'web-desktop' | 'android' | 'ios';

export interface PlatformLayout {
  target: PlatformLayoutTarget;
  isWeb: boolean;
  isWebMobile: boolean;
  isWebDesktop: boolean;
  isNative: boolean;
  isAndroid: boolean;
  isIOS: boolean;
}

/**
 * Returns the current styling target. Web responds to viewport resizing, while
 * native targets are selected from the operating system rather than screen size.
 */
export function usePlatformLayout(): PlatformLayout {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isWebDesktop = isWeb && width >= WebDesktopBreakpoint;
  const isWebMobile = isWeb && !isWebDesktop;
  const isAndroid = Platform.OS === 'android';
  const isIOS = Platform.OS === 'ios';

  return {
    target: isWeb ? (isWebDesktop ? 'web-desktop' : 'web-mobile') : isIOS ? 'ios' : 'android',
    isWeb,
    isWebMobile,
    isWebDesktop,
    isNative: !isWeb,
    isAndroid,
    isIOS,
  };
}