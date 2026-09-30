import { sharedFormScreenStyles } from '@/components/form-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useFormScreenStyles() {
  return sharedFormScreenStyles;
}
