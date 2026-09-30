import { Image } from 'expo-image';
import { router, useIsFocused } from 'expo-router';
import { Pressable, ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SettingsIcon } from '@/components/account-icons';
import { getAppMenuHeight } from '@/components/app-menu';
import { BackArrowIcon } from '@/components/auth-icons';
import {
  ClockIcon,
  DollarCircleIcon,
  LocationIcon,
  RatingStarIcon,
} from '@/components/company-icons';
import { useCompanyProfileStyles } from '@/components/company-profile.styles';

const photo = require('@/assets/search/barber-shave.png');

// Placeholder content from the Figma "Company profile" frame until the business API exists.
const COMPANY = {
  name: 'Barber przy Głównej',
  address: 'Poznań, ul. Główna 69',
  rating: '4,98',
  ratingCount: 786,
  tags: ['We wtorki 20% taniej!', 'Program dla stałych klientów', 'Akceptujemy karty zniżkowe'],
  about:
    'Jesteśmy nowym salonem barberskim na mapie Poznania. Zapraszamy wszystkich, którzy chcą poczuć się dobrze zaopiekowani.',
};

const SERVICES = ['Strzyżenie', 'Golenie brzytwą', 'Combo', 'Strzyżenie dziecięce', 'Farbowanie'].map(
  (name) => ({
    name,
    description: 'Lorem ipsum dolor sit fryzjer,epsum paras kole matos, asto berdo etno faragato.',
    duration: '45 min.',
    price: '90 zł',
  }),
);

/** Business page of the mobile layout ("Company profile" in Figma); desktop web has its own file. */
export function CompanyProfile() {
  const styles = useCompanyProfileStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();

  function goBack() {
    if (router.canGoBack()) router.back();
  }

  return (
    <View style={styles.screen}>
      {isFocused && <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: getAppMenuHeight(width) }}>
        <View style={styles.photo}>
          <Image
            accessibilityLabel={`Zdjęcie ${COMPANY.name}`}
            contentFit="cover"
            source={photo}
            style={styles.photoImage}
          />
          <View style={styles.photoBar}>
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
        </View>

        <Text style={styles.name}>{COMPANY.name}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <LocationIcon />
            <Text style={styles.metaText}>{COMPANY.address}</Text>
          </View>
          <View style={[styles.metaItem, styles.ratingItem]}>
            <RatingStarIcon color="#FFC629" width={15} height={15} />
            <Text style={styles.metaText}>
              {COMPANY.rating} ({COMPANY.ratingCount} ocen)
            </Text>
          </View>
        </View>

        <View style={styles.tags}>
          {COMPANY.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.about}>{COMPANY.about}</Text>

        <Text style={styles.sectionTitle}>Nasza oferta</Text>
        <View style={styles.services}>
          {SERVICES.map((service) => (
            <View key={service.name} style={styles.service}>
              <View style={styles.serviceMeta}>
                <View style={styles.serviceMetaItem}>
                  <ClockIcon color="#DE4949" />
                  <Text style={styles.serviceMetaText}>{service.duration}</Text>
                </View>
                <View style={styles.serviceMetaItem}>
                  <DollarCircleIcon color="#E64F21" />
                  <Text style={styles.serviceMetaText}>{service.price}</Text>
                </View>
              </View>
              <View style={styles.serviceDivider} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
