import { Redirect } from 'expo-router';

/** The business landing page is web-only (dla-biznesu.web.tsx); the native apps open the app. */
export default function BusinessLandingRoute() {
  return <Redirect href="/app/search" />;
}
