import { Platform } from 'react-native';

import { FavoritesScreen } from '@/components/favorites-screen';
import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function FavoritesRoute() {
  // Only the Android layout is built so far.
  if (Platform.OS === 'android') {
    return <FavoritesScreen />;
  }

  return <PlaceholderScreen title="Ulubione" />;
}
