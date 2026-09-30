import { ScrollView, StyleSheet } from 'react-native';

import { BusinessLanding } from '@/components/business-landing';
import { SiteFooter } from '@/components/site-footer';

/** Public "Dla biznesu" landing page. Native keeps using dla-biznesu.tsx and opens the app. */
export default function BusinessLandingRoute() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
      <BusinessLanding />
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
