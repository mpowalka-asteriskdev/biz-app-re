import { Platform } from 'react-native';

import { authBaseUrl, authClient } from '@/lib/auth-client';

interface TokenResponse {
  token: string;
}

export async function getAccessToken(): Promise<string> {
  const headers = new Headers();
  let credentials: RequestCredentials = 'include';

  if (Platform.OS !== 'web') {
    const cookie = await authClient.getCookie();
    if (cookie) {
      headers.set('Cookie', cookie);
    }
    credentials = 'omit';
  }

  const response = await fetch(`${authBaseUrl}/api/auth/token`, {
    credentials,
    headers,
  });

  if (!response.ok) {
    throw new Error('Unable to create an API access token. Please sign in again.');
  }

  const data = (await response.json()) as TokenResponse;
  return data.token;
}

export async function authenticatedFetch(
  input: string | URL,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getAccessToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);

  return fetch(input, { ...init, headers });
}
