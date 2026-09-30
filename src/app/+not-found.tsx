import { NotFoundScreen } from '@/components/not-found-screen';

/** Any path that matches no route shows the 404 page instead of expo-router's default screen. */
export default function NotFoundRoute() {
  return <NotFoundScreen />;
}
