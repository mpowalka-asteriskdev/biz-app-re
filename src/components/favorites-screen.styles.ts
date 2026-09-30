import { sharedFavoritesScreenStyles } from '@/components/favorites-screen.styles.shared';

/** Fallback for native platforms other than Android and iOS. */
export function useFavoritesScreenStyles() {
  return sharedFavoritesScreenStyles;
}
