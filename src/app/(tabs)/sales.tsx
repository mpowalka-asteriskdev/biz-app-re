import { Platform } from 'react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { SalesScreen } from '@/components/sales-screen';

export default function SalesRoute() {
  // Only the Android layout is designed so far.
  if (Platform.OS === 'android') {
    return <SalesScreen />;
  }

  return <PlaceholderScreen title="Sprzedaż" />;
}
