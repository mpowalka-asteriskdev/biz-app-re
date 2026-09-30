import { authClient } from '@/lib/auth-client';
import { getPlaces, type Place } from '@/lib/places-api';

/** The user's place; the places service has no "my place" route, so it's picked from the list. */
export async function findOwnPlace(userId: string): Promise<Place | null> {
  return (await getPlaces()).find((place) => place.ownerId === userId) ?? null;
}

/** Makes the signed-in user a business account, which opens the rest of the app to them. */
export async function switchToBusinessAccount(): Promise<void> {
  const { error } = await authClient.updateUser({ accountType: 'business' });

  if (error) {
    throw new Error(error.message ?? 'Nie udało się zmienić typu konta.');
  }
}
