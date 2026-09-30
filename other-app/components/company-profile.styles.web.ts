import { sharedCompanyProfileStyles } from '@/components/company-profile.styles.shared';

/** Mobile web uses the shared mobile design; desktop web renders company-profile.web.tsx instead. */
export function useCompanyProfileStyles() {
  return sharedCompanyProfileStyles;
}
