import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authBaseUrl =
  process.env.EXPO_PUBLIC_AUTH_BASE_URL ?? 'http://localhost:3001';

export const authClient = createAuthClient({
  baseURL: authBaseUrl,
  plugins: [
    expoClient({
      scheme: 'bizapp',
      storagePrefix: 'bizapp',
      storage: SecureStore,
    }),
  ],
});

export type AuthSession = typeof authClient.$Infer.Session;
