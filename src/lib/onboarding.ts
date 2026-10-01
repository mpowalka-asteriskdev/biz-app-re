import { getPlaces, type Place } from '@/lib/places-api';

/** The user's place; the places service has no "my place" route, so it's picked from the list. */
export async function findOwnPlace(userId: string): Promise<Place | null> {
  return (await getPlaces()).find((place) => place.ownerId === userId) ?? null;
}
