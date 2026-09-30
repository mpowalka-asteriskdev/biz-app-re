import { useLocalSearchParams } from 'expo-router';

import { AccountDesktop } from '@/components/account-desktop';
import { AccountScreen } from '@/components/account-screen';
import { AuthScreen } from '@/components/auth-screen';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';

export default function AccountRoute() {
  const { data: session } = authClient.useSession();
  const { registered } = useLocalSearchParams<{ registered?: string }>();
  const { isWebDesktop } = usePlatformLayout();

  if (!session) {
    return (
      <AuthScreen
        mode="login"
        initialMessage={
          registered === '1'
            ? 'Konto zostało utworzone. Sprawdź skrzynkę e-mail, a następnie zaloguj się.'
            : undefined
        }
      />
    );
  }

  return isWebDesktop ? <AccountDesktop /> : <AccountScreen />;
}
