import { DesktopPlaceholderScreen, PlaceholderScreen } from '@/components/placeholder-screen';
import { SalesScreen } from '@/components/sales-screen';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

export default function SalesRoute() {
  const { isAndroid, isWebDesktop } = usePlatformLayout();

  // Only the Android layout is designed so far; desktop web shows a placeholder page.
  if (isAndroid) return <SalesScreen />;
  if (isWebDesktop) return <DesktopPlaceholderScreen section="sales" title="Sprzedaż" />;

  return <PlaceholderScreen title="Sprzedaż" />;
}
