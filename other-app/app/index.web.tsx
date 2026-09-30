import { ScrollView, StyleSheet } from 'react-native';

import { LandingContent } from '@/components/landing-content';
import { LandingHero } from '@/components/landing-hero';
import { SiteFooter } from '@/components/site-footer';

/** Public web landing page. Native keeps using index.tsx and redirects into the app. */
export default function LandingRoute() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
      <LandingHero />
      <LandingContent />
      <SiteFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
