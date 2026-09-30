# Authentication integration

The Expo app uses the backend's Better Auth implementation for email/password and Google authentication on Android, iOS, and web.

## Architecture

- Auth service: `http://localhost:3001`
- Better Auth routes: `/api/auth/*`
- Session transport: HTTP-only cookies on web and Better Auth Expo secure cookie storage on native
- Native secure storage: Expo SecureStore
- Protected service transport: short-lived JWT from `/api/auth/token` sent as a Bearer token
- App callback scheme: `bizapp://`

The client implementation is in `src/lib/auth-client.ts`. `src/lib/api-client.ts` exchanges the current Better Auth session for a JWT and exposes `authenticatedFetch()` for protected backend requests.

## Backend setup

Start MySQL and the user service from the backend repository:

```powershell
npm run db:up
npm run start:user:dev
```

The backend environment must define:

```dotenv
BETTER_AUTH_URL=http://localhost:3001
TRUSTED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8082,bizapp://,bizapp://*,exp://,exp://**
GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

The broad `exp://` origins are development-only. Production should trust only deployed HTTPS origins and `bizapp://` callback patterns.

## Google Cloud configuration

Create an OAuth 2.0 Client ID of type **Web application** in the Google Cloud project used by the backend. Add this authorized redirect URI exactly:

```text
http://localhost:3001/api/auth/callback/google
```

For production, add the production backend callback as well:

```text
https://api.example.com/api/auth/callback/google
```

The Google client secret stays on the backend and must never use an `EXPO_PUBLIC_` variable.

## Client environment

Copy `.env.example` to `.env.local` when an override is needed:

```dotenv
EXPO_PUBLIC_AUTH_BASE_URL=http://localhost:3001
EXPO_PUBLIC_PLACES_BASE_URL=http://localhost:3002
```

Defaults already target these localhost URLs. Web, the iOS simulator, and Android connected through the project USB command can use them unchanged.

For a physical iPhone, use an HTTPS development backend or replace localhost with the computer's reachable LAN IP. Add that web/deep-link origin to backend `TRUSTED_ORIGINS`.

## Android over USB

Connect and authorize the Android phone, install Expo Go, then run:

```powershell
npm run android
```

This command forwards ports `8082`, `3001`, and `3002` through ADB before starting Expo. The phone can therefore reach Metro and both local backend services through localhost.

## Web

Run:

```powershell
npm run web
```

The browser uses credentialed requests and the HTTP-only Better Auth session cookie. The backend must include the web origin in `TRUSTED_ORIGINS`. Expo web commonly runs on `http://localhost:8082` in this project.

## Email/password behavior

Registration requires a name, email, and password of at least eight characters, and creates a `business` account (the backend's `accountType` field). The backend signs the user in straight away, without email verification.

An account that isn't `business` (e.g. a `client` account from the client app, or a Google sign-in) can open only the registration steps under `/onboarding`. Business accounts land on `/`, which looks up their place in `GET /places` and sends them to the steps while they have none.

The categories in the steps come from `GET /categories`. The company step creates the place (`POST /places`, together with the chosen category) and switches a `client` account to `business` through Better Auth's update-user endpoint, which opens the rest of the app. The later steps update the place (`PATCH /places/:id`, and `PATCH /places/:id/opening-hours` for the hours). A `client` account that already owns a place is switched to `business` when it opens the steps, and sent home.

## Google behavior

The client calls `authClient.signIn.social()` for both native and web:

- Web follows the Google redirect in the current browser and returns to the web app.
- Native opens a secure browser session and returns through the Expo/`bizapp` deep link.
- Better Auth creates and persists the application session after Google succeeds.

## Protected API calls

Use `authenticatedFetch()` rather than manually handling cookies or JWTs:

```ts
import { authenticatedFetch } from '@/lib/api-client';

const response = await authenticatedFetch('http://localhost:3002/places', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

The helper obtains a fresh short-lived JWT from the authenticated session and adds `Authorization: Bearer <token>`.

## Troubleshooting

### `Failed to fetch`

Confirm the user service is running on port `3001`. On Android USB, rerun `npm run android` to restore ADB port forwarding.

### `Invalid origin`

Add the exact client origin or callback scheme to backend `TRUSTED_ORIGINS`, then restart the user service.

### Google `redirect_uri_mismatch`

Confirm both `BETTER_AUTH_URL` and the Google authorized redirect URI use the same backend host and `/api/auth/callback/google` path.

### Native browser does not return to the app

Expo Go uses an `exp://` callback during development. A development/production build uses `bizapp://`. Confirm both are trusted by the backend. Changes to the native scheme require rebuilding the app.

### Session works on web but not native

Confirm the backend has the `@better-auth/expo` server plugin and the app has the `expoClient` plugin with SecureStore. Do not replace these with manually managed session tokens.
