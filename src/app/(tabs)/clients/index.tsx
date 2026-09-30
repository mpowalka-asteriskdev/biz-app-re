import { Platform } from 'react-native';

import { ClientsScreen } from '@/components/clients-screen';
import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function ClientsRoute() {
  // Only the Android layout is designed so far.
  if (Platform.OS === 'android') {
    return <ClientsScreen />;
  }

  return <PlaceholderScreen title="Klienci" />;
}
