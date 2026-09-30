import { useLocalSearchParams } from 'expo-router';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { getCategoryLabel } from '@/constants/categories';

/** /app/{category}: opened from the category row of the desktop top menu. */
export default function CategoryRoute() {
  const { category } = useLocalSearchParams<{ category: string }>();

  return <PlaceholderScreen title={getCategoryLabel(category)} />;
}
