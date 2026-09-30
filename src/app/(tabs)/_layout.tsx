import { Tabs } from 'expo-router/js-tabs';

import { BusinessMenu } from '@/components/business-menu';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

/** The business app's sections; phones switch them with the bottom menu, as in the client app. */
export default function TabsLayout() {
  const { isWebDesktop } = usePlatformLayout();

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      // Desktop web pages carry their own header menu instead.
      tabBar={(props) => (isWebDesktop ? null : <BusinessMenu {...props} />)}>
      <Tabs.Screen name="calendar" options={{ title: 'Kalendarz' }} />
      <Tabs.Screen name="clients" options={{ title: 'Klienci' }} />
      <Tabs.Screen name="employees" options={{ title: 'Pracownicy' }} />
      <Tabs.Screen name="sales" options={{ title: 'Sprzedaż' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
