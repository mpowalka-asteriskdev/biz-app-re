import { EmployeesDesktopScreen } from '@/components/employees-desktop-screen';
import { EmployeesScreen } from '@/components/employees-screen';
import { PlaceholderScreen } from '@/components/placeholder-screen';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

export default function EmployeesRoute() {
  const { isWebDesktop, isWebMobile } = usePlatformLayout();

  // Only the desktop web layout is designed so far; mobile web lays it out like Klienci.
  if (isWebDesktop) return <EmployeesDesktopScreen />;
  if (isWebMobile) return <EmployeesScreen />;

  return <PlaceholderScreen title="Pracownicy" />;
}
