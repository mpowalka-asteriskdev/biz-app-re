import { sharedNotFoundScreenStyles } from '@/components/not-found-screen.styles.shared';

/** iOS has no design of its own yet, so it uses the shared mobile design. */
export function useNotFoundScreenStyles() {
  return sharedNotFoundScreenStyles;
}
