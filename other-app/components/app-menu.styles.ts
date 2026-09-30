import { sharedAppMenuStyles } from '@/components/app-menu.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useAppMenuStyles() {
  return sharedAppMenuStyles;
}
