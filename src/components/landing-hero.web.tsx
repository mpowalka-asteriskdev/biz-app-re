import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { LandingHeader } from '@/components/landing-header';
import { SearchBar } from '@/components/search-bar';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

const heroImage = require('@/assets/landing/hero.jpg');

/** Top of the web landing page ("Main screen desktop" in Figma): header, headline and search. */
export function LandingHero() {
  const { isWebMobile } = usePlatformLayout();

  return (
    <View style={styles.hero}>
      <Image
        accessibilityLabel=""
        contentFit="cover"
        contentPosition={{ top: '30%', left: '50%' }}
        source={heroImage}
        style={styles.background}
      />
      <View style={styles.backdrop} />

      <View style={[styles.content, isWebMobile && mobileStyles.content]}>
        <LandingHeader audience="client" />

        <View style={[styles.headline, isWebMobile && mobileStyles.headline]}>
          <Text style={[styles.title, isWebMobile && mobileStyles.title]}>Co dziś ogarniemy?</Text>
          <Text style={[styles.subtitle, isWebMobile && mobileStyles.subtitle]}>
            Wyszukaj najlepsze usługi blisko Ciebie i umów się
          </Text>
        </View>

        <SearchBar style={[styles.search, isWebMobile && mobileStyles.search]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#11110F',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1352,
    paddingHorizontal: 64,
    paddingTop: 43,
    paddingBottom: 94,
    alignItems: 'center',
  },
  headline: {
    alignItems: 'center',
    gap: 7,
    marginTop: 57,
    marginBottom: 30,
  },
  title: {
    color: '#F9F6F2',
    fontSize: 40,
    lineHeight: 49,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#F9F6F2',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
  },
  search: {
    maxWidth: 816,
  },
});

/** Narrow web screens: the headline shrinks. */
const mobileStyles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 48,
  },
  headline: {
    marginTop: 48,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 17,
  },
  search: {
    maxWidth: '100%',
  },
});
