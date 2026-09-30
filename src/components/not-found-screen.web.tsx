import { Link } from 'expo-router';
import Head from 'expo-router/head';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { LandingHeader } from '@/components/landing-header';
import { useNotFoundScreenStyles } from '@/components/not-found-screen.styles';
import { SiteFooter } from '@/components/site-footer';

/** 404 page of the web layout: landing header, message and the site footer. */
export function NotFoundScreen() {
  const styles = useNotFoundScreenStyles();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <Head>
        <title>Nie znaleziono strony – ogarnijmy.to</title>
      </Head>

      <View style={styles.headerBand}>
        <View style={styles.headerContent}>
          <LandingHeader />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Nie znaleźliśmy tej strony</Text>
        <Text style={styles.text}>
          Strona, której szukasz, nie istnieje albo została przeniesiona.
        </Text>
        <Link asChild href="/">
          <Pressable accessibilityRole="link" style={styles.button}>
            <Text style={styles.buttonText}>Wróć na stronę główną</Text>
          </Pressable>
        </Link>
      </View>

      <SiteFooter />
    </ScrollView>
  );
}
