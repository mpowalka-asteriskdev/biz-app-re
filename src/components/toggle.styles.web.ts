import { sharedToggleStyles } from '@/components/toggle.styles.shared';

/** Mobile and desktop web use the same switch as the apps. */
export function useToggleStyles() {
  return sharedToggleStyles;
}
