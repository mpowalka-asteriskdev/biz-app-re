import { Platform } from 'react-native';

import { CalendarScreen } from '@/components/calendar-screen';
import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function CalendarRoute() {
  // Only the Android layout is built so far.
  if (Platform.OS === 'android') {
    return <CalendarScreen />;
  }

  return <PlaceholderScreen title="Kalendarz" />;
}
