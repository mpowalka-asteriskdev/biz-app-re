import { router, useIsFocused } from 'expo-router';
import { Pressable, ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsIcon } from '@/components/account-icons';
import { getAppMenuHeight } from '@/components/app-menu';
import { BackArrowIcon } from '@/components/auth-icons';
import { useFavoritesScreenStyles } from '@/components/favorites-screen.styles';
import { SearchBar } from '@/components/search-bar';
import { type ServiceCardData, ServiceCardRail } from '@/components/service-card';
import {
  BAR_BARBER,
  BAR_BARBER_ALT_PHOTO,
  BARBER_PRZY_GLOWNEJ,
  CRAZY_ONE,
  MASAZ_GOTU_HAN,
} from '@/constants/sample-services';

// Placeholder favorites from the Figma design until favorites are saved.
const FAVORITE_SECTIONS: { title: string; services: ServiceCardData[] }[] = [
  { title: 'Masaże i SPA', services: [MASAZ_GOTU_HAN, BAR_BARBER_ALT_PHOTO, CRAZY_ONE] },
  { title: 'Terminy na dziś', services: [BARBER_PRZY_GLOWNEJ, BAR_BARBER, CRAZY_ONE] },
];

/** "Ulubione" tab of the mobile layout ("Favourites" in Figma). */
export function FavoritesScreen() {
  const styles = useFavoritesScreenStyles();
  const { width } = useWindowDimensions();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();

  function goBack() {
    if (router.canGoBack()) router.back();
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      {isFocused && <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: getAppMenuHeight(width) }}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Wróć"
            accessibilityRole="button"
            onPress={goBack}
            style={({ pressed }) => pressed && styles.pressed}>
            <BackArrowIcon />
          </Pressable>
          {/* There is no settings screen yet. */}
          <Pressable
            accessibilityLabel="Ustawienia"
            accessibilityRole="button"
            style={({ pressed }) => pressed && styles.pressed}>
            <SettingsIcon />
          </Pressable>
        </View>

        {/* Searching the favorites isn't wired up yet. */}
        <View style={styles.search}>
          <SearchBar
            variant="light"
            placeholder="Znajdź wśród ulubionych"
            inputStyle={styles.searchInput}
          />
        </View>

        <View style={styles.sections}>
          {FAVORITE_SECTIONS.map((section) => (
            <View key={section.title}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <ServiceCardRail services={section.services} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
