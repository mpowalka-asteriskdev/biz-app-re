import { Image } from 'expo-image';
import { type Href, Link, useIsFocused } from 'expo-router';
import { Pressable, ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getAppMenuHeight } from '@/components/app-menu';
import { AuthLogo } from '@/components/auth-icons';
import { SearchBar } from '@/components/search-bar';
import { ShopIcon } from '@/components/search-icons';
import { useSearchScreenStyles } from '@/components/search-screen.styles';
import { type ServiceCardData, ServiceCardRail } from '@/components/service-card';
import { CATEGORIES } from '@/constants/categories';
import {
  BAR_BARBER,
  BAR_BARBER_ALT_PHOTO,
  BARBER_PRZY_GLOWNEJ,
  CRAZY_ONE,
  MAR_TATTOO,
  MASAZ_GOTU_HAN,
} from '@/constants/sample-services';

const headerImage = require('@/assets/landing/home/discover-services.png');

const SERVICE_SECTIONS: { title: string; services: ServiceCardData[] }[] = [
  { title: 'Najlepsze promocje', services: [MASAZ_GOTU_HAN, BAR_BARBER_ALT_PHOTO, CRAZY_ONE] },
  { title: 'Terminy na dziś', services: [BARBER_PRZY_GLOWNEJ, BAR_BARBER, CRAZY_ONE] },
  { title: 'Ostatnio dołączyli', services: [MAR_TATTOO, BAR_BARBER, CRAZY_ONE] },
];

/** "Szukamy" tab of the mobile layout ("Main screen" in Figma). */
export function SearchScreen() {
  const styles = useSearchScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();

  return (
    <View style={styles.screen}>
      {isFocused && <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: getAppMenuHeight(width) }}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Image source={headerImage} contentFit="cover" style={styles.headerImage} />
          <View style={styles.headerOverlay} />

          <View style={styles.headerBar}>
            <AuthLogo width={176} height={30} />
            {/* There is no screen for businesses yet. */}
            <Pressable
              accessibilityLabel="Dla firm"
              accessibilityRole="button"
              style={({ pressed }) => pressed && styles.pressed}>
              <ShopIcon />
            </Pressable>
          </View>

          <SearchBar placeholder="Co dziś ogarniemy?" inputStyle={styles.searchInput} />
        </View>

        <Text style={[styles.sectionTitle, styles.introTitle]}>Twoje sprawy w jednym miejscu!</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRail}>
          {CATEGORIES.map((category) => (
            <Link key={category.slug} asChild href={`/app/${category.slug}` as Href}>
              <Pressable
                accessibilityRole="link"
                style={({ pressed }) => [styles.category, pressed && styles.pressed]}>
                {/* Figma has grey placeholders instead of category photos. */}
                <View style={styles.categoryImage} />
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </Pressable>
            </Link>
          ))}
        </ScrollView>

        <View style={styles.serviceSections}>
          {SERVICE_SECTIONS.map((section) => (
            <View key={section.title}>
              <Text style={[styles.sectionTitle, styles.serviceTitle]}>{section.title}</Text>
              <ServiceCardRail services={section.services} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
