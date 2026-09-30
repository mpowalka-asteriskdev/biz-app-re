import { Image, type ImageSource } from 'expo-image';
import { type Href, Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { HeartIcon, LocationIcon, RatingStarIcon } from '@/components/company-icons';
import { useServiceCardStyles } from '@/components/service-card.styles';

export type ServiceCardData = {
  id: string;
  /** Category slug; the card opens /app/{category}/{id}. */
  category: string;
  image: ImageSource;
  name: string;
  rating: string;
  address: string;
};

/** Horizontally scrolling row of service cards ("Carousel" in Figma). */
export function ServiceCardRail({ services }: { services: ServiceCardData[] }) {
  const styles = useServiceCardStyles();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </ScrollView>
  );
}

/** Photo card of a business ("Profile Card" in Figma). */
export function ServiceCard({ service }: { service: ServiceCardData }) {
  const styles = useServiceCardStyles();

  // Every card opens the same sample business page for now.
  return (
    <Link asChild href={`/app/${service.category}/${service.id}` as Href}>
      <Pressable accessibilityRole="link" style={styles.card}>
        <View style={styles.imageWrap}>
          <Image
            accessibilityLabel={`Zdjęcie ${service.name}`}
            contentFit="cover"
            source={service.image}
            style={styles.image}
          />
          {/* Favorites aren't saved yet; the button still keeps the tap from opening the card. */}
          <Pressable
            accessibilityLabel={`Dodaj ${service.name} do ulubionych`}
            accessibilityRole="button"
            style={({ pressed }) => [styles.favorite, pressed && styles.pressed]}>
            <HeartIcon />
          </Pressable>
        </View>
        <View style={styles.body}>
          <View style={styles.topLine}>
            <Text numberOfLines={1} style={styles.name}>
              {service.name}
            </Text>
            <View style={styles.rating}>
              <RatingStarIcon width={12} height={12} />
              <Text style={styles.ratingText}>{service.rating}</Text>
            </View>
          </View>
          <View style={styles.location}>
            <LocationIcon color="#D6D5D4" width={12} height={12} />
            <Text numberOfLines={1} style={styles.address}>
              {service.address}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
