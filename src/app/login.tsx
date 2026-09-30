import { useLocalSearchParams } from 'expo-router';

import { AuthScreen } from '@/components/auth-screen';

export default function LoginRoute() {
  const { registered } = useLocalSearchParams<{ registered?: string }>();

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
