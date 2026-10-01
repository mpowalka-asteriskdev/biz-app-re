import { EmployeesDesktopScreen } from '@/components/employees-desktop-screen';
import { PlaceholderScreen } from '@/components/placeholder-screen';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

export default function EmployeesRoute() {
  const { isWebDesktop } = usePlatformLayout();

  // Only the desktop web layout is designed so far.
  if (isWebDesktop) return <EmployeesDesktopScreen />;

  return <PlaceholderScreen title="Pracownicy" />;
}
