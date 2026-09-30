import { Platform } from 'react-native';

import { CompanyProfile } from '@/components/company-profile';
import { PlaceholderScreen } from '@/components/placeholder-screen';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

/** /app/{category}/{slug}: a business page. For now every slug shows the same sample business. */
export default function CompanyRoute() {
  const { isWebDesktop } = usePlatformLayout();

  // Only the desktop web and Android designs exist so far.
  return isWebDesktop || Platform.OS === 'android' ? (
    <CompanyProfile />
  ) : (
    <PlaceholderScreen title="Barber przy Głównej" />
  );
}
