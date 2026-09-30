import { Tabs } from 'expo-router/js-tabs';

import { AppMenu } from '@/components/app-menu';
import { AppTopMenu } from '@/components/app-top-menu';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';

export default function TabsLayout() {
  const { isWebDesktop } = usePlatformLayout();
  const { data: session } = authClient.useSession();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        // Desktop web uses the top menu instead of the bottom one, except on the login page,
        // which has its own header.
        headerShown: isWebDesktop && !(route.name === 'account' && !session),
        header: () => <AppTopMenu />,
      })}
      tabBar={(props) => (isWebDesktop ? null : <AppMenu {...props} />)}>
      {/* Menu tabs; the first one is where the tabs open. */}
      <Tabs.Screen name="search" options={{ title: 'Szukamy' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Ulubione' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Kalendarz' }} />
      <Tabs.Screen name="account" options={{ title: 'Profil' }} />

      {/* Pages without a menu button: /app (web landing after login), /app/{category} and
          /app/{category}/{slug}. */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="[category]/index" options={{ href: null }} />
      <Tabs.Screen name="[category]/[slug]" options={{ href: null }} />
    </Tabs>
  );
}
