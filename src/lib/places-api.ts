import { authenticatedFetch } from '@/lib/api-client';

export const placesBaseUrl =
  process.env.EXPO_PUBLIC_PLACES_BASE_URL ?? 'http://localhost:3002';

export type PlaceExperience = 'beginner' | 'established' | 'firstTime';

/** Fields accepted by the places service; `null` clears a field on update. */
export interface PlaceInput {
  name?: string;
  nip?: string | null;
  street?: string | null;
  city?: string | null;
  postalCode?: string | null;
  latlon?: { lat: number; lon: number } | null;
  experience?: PlaceExperience | null;
  categoryId?: string | null;
}

export interface Place extends PlaceInput {
  id: string;
  name: string;
  ownerId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

/** Per day: `mondayOpen`, `mondayOpensAt` and `mondayClosesAt` (times as HH:MM). */
export type OpeningHoursInput = Partial<
  Record<`${WeekDay}Open`, boolean> & Record<`${WeekDay}${'OpensAt' | 'ClosesAt'}`, string | null>
>;

/** Saved opening hours; a place that has none is closed every day. Times come as HH:MM:SS. */
export type OpeningHours = Record<`${WeekDay}Open`, boolean> &
  Record<`${WeekDay}${'OpensAt' | 'ClosesAt'}`, string | null>;

export async function getPlaces(): Promise<Place[]> {
  return readJson(await fetch(`${placesBaseUrl}/places`));
}

export async function getCategories(): Promise<Category[]> {
  return readJson(await fetch(`${placesBaseUrl}/categories`));
}

export async function getOpeningHours(placeId: string): Promise<OpeningHours> {
  return readJson(
    await fetch(`${placesBaseUrl}/places/${encodeURIComponent(placeId)}/opening-hours`),
  );
}

export function createPlace(input: PlaceInput & { name: string }): Promise<Place> {
  return sendAuthenticated<Place>('/places', 'POST', input);
}

/** Only the owner (or an admin) may update a place. */
export function updatePlace(id: string, input: PlaceInput): Promise<Place> {
  return sendAuthenticated<Place>(`/places/${encodeURIComponent(id)}`, 'PATCH', input);
}

export function updateOpeningHours(placeId: string, input: OpeningHoursInput): Promise<unknown> {
  return sendAuthenticated(`/places/${encodeURIComponent(placeId)}/opening-hours`, 'PATCH', input);
}

async function sendAuthenticated<T>(path: string, method: 'POST' | 'PATCH', body: object) {
  const response = await authenticatedFetch(`${placesBaseUrl}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return readJson<T>(response);
}

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return (await response.json()) as T;
}

/** Nest errors carry `message` as a string or a list of validation messages. */
async function readError(response: Response): Promise<string> {
  const fallback = `${response.status} ${response.statusText}`;

  try {
    const body = (await response.json()) as { message?: string | string[] };

    return Array.isArray(body.message) ? body.message.join(', ') : (body.message ?? fallback);
  } catch {
    return fallback;
  }
}
