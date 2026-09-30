import { sharedToggleStyles } from '@/components/toggle.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useToggleStyles() {
  return sharedToggleStyles;
}
