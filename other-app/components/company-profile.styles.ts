import { sharedCompanyProfileStyles } from '@/components/company-profile.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useCompanyProfileStyles() {
  return sharedCompanyProfileStyles;
}
