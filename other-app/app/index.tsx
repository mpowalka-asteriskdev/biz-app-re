import { Redirect } from 'expo-router';

/** The landing page is web-only (index.web.tsx); the native apps open straight into the app. */
export default function IndexRoute() {
  return <Redirect href="/app/search" />;
}
