import { sharedProfileScreenStyles } from '@/components/profile-screen.styles.shared';

/** Mobile web uses the Android design ("User profile" in Figma); desktop web shows CompanyProfileScreen. */
export function useProfileScreenStyles() {
  return sharedProfileScreenStyles;
}
