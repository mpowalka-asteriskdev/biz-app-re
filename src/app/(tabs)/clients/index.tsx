import { ClientsDesktopScreen } from '@/components/clients-desktop-screen';
import { ClientsScreen } from '@/components/clients-screen';
import { PlaceholderScreen } from '@/components/placeholder-screen';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

export default function ClientsRoute() {
  const { isAndroid, isWebDesktop } = usePlatformLayout();

  // Only the Android and desktop web layouts are designed so far.
  if (isAndroid) return <ClientsScreen />;
  if (isWebDesktop) return <ClientsDesktopScreen />;

  return <PlaceholderScreen title="Klienci" />;
}
