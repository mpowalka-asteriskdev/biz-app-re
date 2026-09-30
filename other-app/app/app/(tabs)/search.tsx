import { Platform } from 'react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { SearchScreen } from '@/components/search-screen';

export default function SearchRoute() {
  // Only the Android layout is built so far.
  if (Platform.OS === 'android') {
    return <SearchScreen />;
  }

  return <PlaceholderScreen title="Szukamy" />;
}
