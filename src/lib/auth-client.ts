import { expoClient } from '@better-auth/expo/client';
import { inferAdditionalFields } from 'better-auth/client/plugins';
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
    // Mirrors the backend's user fields, so sessions and sign-up/update calls are typed.
    inferAdditionalFields({
      user: {
        accountType: { type: ['client', 'business'], required: false, defaultValue: 'client' },
      },
    }),
  ],
});

export type AuthSession = typeof authClient.$Infer.Session;
