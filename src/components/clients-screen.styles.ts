import { sharedClientsScreenStyles } from '@/components/clients-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useClientsScreenStyles() {
  return sharedClientsScreenStyles;
}
