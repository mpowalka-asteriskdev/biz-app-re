import { Image } from 'expo-image';
import { type ReactNode, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewStyle,
} from 'react-native';

import { CallIcon, TickCircleIcon } from '@/components/account-icons';
import {
  ChevronIcon,
  ClockIcon,
  DollarCircleIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  LocationIcon,
  MapPinIcon,
  ProfileCircleIcon,
  RatingStarIcon,
  SmsIcon,
  WarningIcon,
  YoutubeIcon,
} from '@/components/company-icons';
import { SearchIcon } from '@/components/search-bar';
import { SiteFooter } from '@/components/site-footer';

// Placeholder content from the Figma "Company profile" frame until the business API exists.
const COMPANY = {
  name: 'Barber przy Głównej',
  address: 'Poznań, ul. Główna 69',
  rating: '5,00',
  ratingCount: 786,
  tags: ['Akceptujemy karty zniżkowe', 'We wtorki 20% taniej!', 'Akceptujemy karty zniżkowe'],
  about:
    'Lorem ipsum dolor sit fryzjer, epsum paras kole matos, asto berdo etno faragato. Lorem ipsum dolor sit fryzjer, epsum paras kole matos, asto berdo etno faragato.',
  details:
    'Lorem ipsum dolor sit fryzjer, epsum paras kole matos, asto berdo etno faragato. Lorem ipsum dolor sit fryzjer, epsum paras kole matos, asto berdo etno faragato.',
  phone: '600 123 456',
  email: 'barber@przyglownej.pl',
};

const OPENING_HOURS = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
].map((day) => ({ day, hours: '10:00 - 20:00' }));

const SERVICE_DESCRIPTION =
  'Lorem ipsum dolor sit fryzjer,epsum paras kole matos, asto berdo etno faragato. Lorem ipsum dolor sit fryzjer,epsum paras kole matos, asto berdo etno faragato.';
const SERVICES = [
  'Strzyżnie',
  'Golenie brzytwą',
  'Combo',
  'Strzyżenie dziecięce',
  'Strzyżenie dziecięce',
  'Strzyżenie dziecięce',
  'Strzyżenie dziecięce',
].map((name, index) => ({ id: `service-${index}`, name, price: '90 zł', duration: '45 min.' }));

const RATING_BREAKDOWN = [
  { stars: 5, count: 786 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const REVIEWS = ['Sławomir', 'Marcin', 'Grzesiu'].map((author) => ({
  id: author,
  author,
  date: '20.03.2026',
  service: 'Golenie brzytwą',
  employee: 'Marcelina',
  text: 'Lorem ipsum dolor sit fryzjer, epsum paras kole matos, asto berdo etno faragato. Lorem ipsum dolor sit fryzjer, epsum paras kole matos, asto berdo etno faragato.',
}));

const SIMILAR_SERVICES = [
  {
    id: 'similar-1',
    name: 'Masaż Gotu Han',
    rating: '4,98',
    address: 'Krzywa 13, Poznań',
    image: require('@/assets/company/similar-1.jpg'),
  },
  {
    id: 'similar-2',
    name: 'BarBarber',
    rating: '5,00',
    address: 'Główna 69, Poznań',
    image: require('@/assets/company/similar-2.jpg'),
  },
  {
    id: 'similar-3',
    name: 'CrazyOne',
    rating: '4,70',
    address: 'Poznańska 2, Poznań',
    image: require('@/assets/company/similar-3.jpg'),
  },
  {
    id: 'similar-4',
    name: 'Studio Relax',
    rating: '4,85',
    address: 'Półwiejska 12, Poznań',
    image: require('@/assets/company/similar-1.jpg'),
  },
  {
    id: 'similar-5',
    name: 'FitZone',
    rating: '4,92',
    address: 'Garbary 44, Poznań',
    image: require('@/assets/company/similar-2.jpg'),
  },
  {
    id: 'similar-6',
    name: 'Brodacz',
    rating: '4,80',
    address: 'Święty Marcin 30, Poznań',
    image: require('@/assets/company/similar-3.jpg'),
  },
];

const SIMILAR_CARD_WIDTH = 250;
const SIMILAR_CARD_GAP = 28;
const SIMILAR_IMAGE_HEIGHT = 215;

// Empty gallery slots from the design until the business photos exist.
const THUMBNAIL_COUNT = 10;
const THUMBNAIL_WIDTH = 120;
const THUMBNAIL_HEIGHT = 125;
const THUMBNAIL_GAP = 16;

const CAROUSEL_ARROW_SIZE = 46;

const mainPhoto = require('@/assets/company/main-photo.jpg');
const mapImage = require('@/assets/company/map.jpg');

/** Business page of the desktop web layout ("Company profile" in Figma). */
export function CompanyProfile() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.main}>
          <Gallery />
          <CompanyHeader />
          <Services />
          <Ratings />
          <Reviews />
          <SimilarServices />
        </View>

        <Sidebar />
      </View>

      <SiteFooter />
    </ScrollView>
  );
}

function Gallery() {
  return (
    <View>
      <Image accessibilityLabel="" contentFit="cover" source={mainPhoto} style={styles.mainPhoto} />

      <View style={styles.thumbnails}>
        <Carousel itemWidth={THUMBNAIL_WIDTH} gap={THUMBNAIL_GAP} arrowTop={THUMBNAIL_HEIGHT / 2}>
          {Array.from({ length: THUMBNAIL_COUNT }, (_, index) => (
            <View key={index} style={styles.thumbnail} />
          ))}
        </Carousel>
      </View>
    </View>
  );
}

function CompanyHeader() {
  return (
    <View style={styles.companyHeader}>
      <Text style={styles.companyName}>{COMPANY.name}</Text>

      <View style={styles.companyMeta}>
        <View style={styles.metaItem}>
          <LocationIcon />
          <Text style={styles.metaText}>{COMPANY.address}</Text>
        </View>
        <View style={styles.metaItem}>
          <RatingStarIcon color="#FFC629" width={15} height={15} />
          <Text style={styles.metaText}>
            {COMPANY.rating} ({COMPANY.ratingCount} ocen)
          </Text>
        </View>
      </View>

      <View style={styles.tags}>
        {COMPANY.tags.map((tag, index) => (
          <View key={`${tag}-${index}`} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Services() {
  return (
    <View style={styles.section}>
      <View style={styles.servicesHeader}>
        <Text style={styles.sectionTitle}>Nasze usługi</Text>

        <View style={styles.serviceSearch}>
          <SearchIcon />
          <TextInput
            accessibilityLabel="Szukaj usług i ofert specjalnych"
            placeholder="Szukaj usług i ofert specjalnych"
            placeholderTextColor="#AAA5A2"
            selectionColor="#E85012"
            style={styles.serviceSearchInput}
          />
        </View>
      </View>

      <View style={styles.services}>
        {SERVICES.map((service) => (
          <View key={service.id} style={styles.serviceRow}>
            <View style={styles.serviceText}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>{SERVICE_DESCRIPTION}</Text>
            </View>

            <View style={styles.serviceDivider} />

            <View style={styles.serviceFacts}>
              <View style={styles.serviceFact}>
                <DollarCircleIcon />
                <Text style={styles.serviceFactText}>{service.price}</Text>
              </View>
              <View style={styles.serviceFact}>
                <ClockIcon />
                <Text style={styles.serviceFactText}>{service.duration}</Text>
              </View>
            </View>

            <View style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Umów się</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function Ratings() {
  const maxCount = Math.max(...RATING_BREAKDOWN.map((row) => row.count), 1);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Oceny i opinie</Text>

      <View style={styles.ratingSummary}>
        <View style={styles.ratingScore}>
          <Text style={styles.ratingValue}>5.0</Text>
          <Stars count={5} size={26} />
          <Text style={styles.ratingCount}>{COMPANY.ratingCount} ocen</Text>
        </View>

        <View style={styles.ratingBars}>
          {RATING_BREAKDOWN.map((row) => (
            <View key={row.stars} style={styles.ratingBarRow}>
              <Text style={styles.ratingBarLabel}>{row.stars}</Text>
              <RatingStarIcon color="#E1DEDD" />
              <View style={styles.ratingBarTrack}>
                <View
                  style={[styles.ratingBarFill, { width: `${(row.count / maxCount) * 100}%` }]}
                />
              </View>
              <Text style={styles.ratingBarCount}>{row.count}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function Reviews() {
  return (
    <View style={styles.reviews}>
      {REVIEWS.map((review, index) => (
        <View
          key={review.id}
          style={[styles.review, index < REVIEWS.length - 1 && styles.reviewSeparated]}>
          <View style={styles.reviewHeader}>
            <ProfileCircleIcon />
            <View style={styles.reviewAuthor}>
              <Text style={styles.reviewAuthorName}>{review.author}</Text>
              <View style={styles.verified}>
                <TickCircleIcon />
                <Text style={styles.verifiedText}>Potwierdzona wizyta</Text>
              </View>
            </View>
            <WarningIcon />
          </View>

          <Text style={styles.reviewDate}>{review.date}</Text>
          <Stars count={5} size={20} />

          <View style={styles.reviewBody}>
            <Text style={styles.reviewMeta}>
              Usługa: {review.service}
              {'\n'}Pracownik: {review.employee}
            </Text>
            <View style={styles.reviewDivider} />
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function SimilarServices() {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, styles.similarTitle]}>Podobne usługi</Text>

      <View style={styles.similarCarousel}>
        <Carousel
          itemWidth={SIMILAR_CARD_WIDTH}
          gap={SIMILAR_CARD_GAP}
          arrowTop={SIMILAR_IMAGE_HEIGHT / 2}
          contentStyle={styles.similarCards}>
        {SIMILAR_SERVICES.map((item) => (
          <View key={item.id} style={styles.similarCard}>
            <View>
              <Image
                accessibilityLabel=""
                contentFit="cover"
                source={item.image}
                style={styles.similarImage}
              />
              <View style={styles.likeButton}>
                <HeartIcon />
              </View>
            </View>

            <View style={styles.similarInfo}>
              <View style={styles.similarTitleRow}>
                <Text numberOfLines={1} style={styles.similarName}>
                  {item.name}
                </Text>
                <View style={styles.similarRating}>
                  <RatingStarIcon width={12} height={12} />
                  <Text style={styles.similarRatingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.similarAddress}>
                <LocationIcon color="#D6D5D4" width={12} height={12} />
                <Text style={styles.similarAddressText}>{item.address}</Text>
              </View>
            </View>
          </View>
        ))}
        </Carousel>
      </View>
    </View>
  );
}

/**
 * Horizontal list scrolled one item per arrow click. Past the end it wraps around; a final step
 * shorter than half an item is skipped so the arrow never just nudges the list.
 */
function Carousel({
  itemWidth,
  gap,
  arrowTop,
  contentStyle,
  children,
}: {
  itemWidth: number;
  gap: number;
  /** Vertical centre of the arrows, measured from the top of the items. */
  arrowTop: number;
  contentStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const scrollRef = useRef<ScrollView>(null);
  const [offset, setOffset] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const step = itemWidth + gap;
  const maxOffset = Math.max(0, contentWidth - viewportWidth);
  const currentIndex = Math.round(offset / step);

  function showNext() {
    const nearEnd = maxOffset - offset < step / 2;
    scrollRef.current?.scrollTo({ x: nearEnd ? 0 : Math.min((currentIndex + 1) * step, maxOffset) });
  }

  function showPrevious() {
    const nearStart = offset < step / 2;
    scrollRef.current?.scrollTo({ x: nearStart ? maxOffset : Math.max((currentIndex - 1) * step, 0) });
  }

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        contentContainerStyle={[{ gap }, contentStyle]}
        onContentSizeChange={(width) => setContentWidth(width)}
        onLayout={(event) => setViewportWidth(event.nativeEvent.layout.width)}
        onScroll={(event) => setOffset(event.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>

      {maxOffset > 0 && (
        <>
          {offset > 1 && (
            <CarouselArrow direction="previous" top={arrowTop} onPress={showPrevious} />
          )}
          <CarouselArrow direction="next" top={arrowTop} onPress={showNext} />
        </>
      )}
    </View>
  );
}

function CarouselArrow({
  direction,
  top,
  onPress,
}: {
  direction: 'previous' | 'next';
  top: number;
  onPress: () => void;
}) {
  const isNext = direction === 'next';

  return (
    <Pressable
      accessibilityLabel={isNext ? 'Następne' : 'Poprzednie'}
      accessibilityRole="button"
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.carouselArrow,
        { top: top - CAROUSEL_ARROW_SIZE / 2 },
        isNext ? styles.carouselArrowNext : styles.carouselArrowPrevious,
        hovered && styles.carouselArrowHovered,
        pressed && styles.carouselArrowPressed,
      ]}>
      <View style={!isNext && styles.chevronPrevious}>
        <ChevronIcon />
      </View>
    </Pressable>
  );
}

function Sidebar() {
  return (
    <View style={styles.sidebar}>
      <View>
        <Image accessibilityLabel="" contentFit="cover" source={mapImage} style={styles.map} />
        <View style={styles.mapPin}>
          <MapPinIcon />
        </View>
      </View>

      <View style={styles.sidebarBody}>
        <SidebarSection title="O NAS">
          <Text style={styles.sidebarText}>{COMPANY.about}</Text>
        </SidebarSection>

        <SidebarSection title="GODZINY OTWARCIA">
          <View style={styles.hours}>
            {OPENING_HOURS.map((row) => (
              <View key={row.day} style={styles.hoursRow}>
                <Text style={styles.sidebarText}>{row.day}</Text>
                <Text style={styles.sidebarText}>{row.hours}</Text>
              </View>
            ))}
          </View>
        </SidebarSection>

        <SidebarSection title="DANE FIRMY">
          <Text style={styles.sidebarText}>{COMPANY.details}</Text>
          <View style={styles.contacts}>
            <View style={styles.contactRow}>
              <CallIcon width={15} height={15} />
              <Text style={styles.sidebarText}>{COMPANY.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <SmsIcon />
              <Text style={styles.sidebarText}>{COMPANY.email}</Text>
            </View>
          </View>
        </SidebarSection>

        <SidebarSection title="SOCIAL MEDIA">
          <View style={styles.socials}>
            <FacebookIcon />
            <InstagramIcon />
            <YoutubeIcon />
          </View>
        </SidebarSection>
      </View>
    </View>
  );
}

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Stars({ count, size }: { count: number; size: number }) {
  return (
    <View style={styles.stars}>
      {Array.from({ length: count }, (_, index) => (
        <RatingStarIcon key={index} width={size} height={size} />
      ))}
    </View>
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
  // Same box as the top menu, so the columns line up with its logo and avatar.
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1354,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 40,
    paddingHorizontal: 64,
    paddingTop: 57,
    paddingBottom: 100,
  },
  main: {
    flex: 1,
    maxWidth: 804,
  },
  mainPhoto: {
    width: '100%',
    height: 360,
    borderRadius: 15,
  },
  thumbnails: {
    marginTop: 18,
  },
  thumbnail: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#FAFAFA',
  },
  companyHeader: {
    marginTop: 21,
  },
  companyName: {
    color: '#000000',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  companyMeta: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  tags: {
    marginTop: 27,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#B4340D',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'rgba(230, 79, 33, 0.1)',
  },
  tagText: {
    color: '#B4340D',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  section: {
    marginTop: 79,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  servicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  serviceSearch: {
    width: 409,
    flexShrink: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E1DEDD',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(249, 246, 242, 0.5)',
  },
  serviceSearchInput: {
    flex: 1,
    minHeight: 38,
    color: '#201F1E',
    fontSize: 14,
    fontWeight: '500',
    outlineWidth: 0,
  },
  services: {
    marginTop: 35,
  },
  serviceRow: {
    minHeight: 126,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1DEDD',
  },
  serviceText: {
    flex: 1,
    maxWidth: 530,
    gap: 6,
  },
  serviceName: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  serviceDescription: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  serviceDivider: {
    width: 2,
    height: 86,
    backgroundColor: '#E64F21',
  },
  serviceFacts: {
    gap: 6,
  },
  serviceFact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  serviceFactText: {
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
  },
  bookButton: {
    marginLeft: 'auto',
    width: 110,
    height: 44,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 5.8px rgba(0, 0, 0, 0.15)',
  },
  bookButtonText: {
    color: '#F9F6F2',
    fontSize: 14,
    lineHeight: 18,
  },
  ratingSummary: {
    marginTop: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 88,
    paddingLeft: 12,
  },
  ratingScore: {
    alignItems: 'center',
  },
  ratingValue: {
    color: '#000000',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600',
  },
  ratingCount: {
    marginTop: 6,
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '300',
  },
  ratingBars: {
    flex: 1,
    gap: 9,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBarLabel: {
    width: 9,
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
  },
  ratingBarTrack: {
    flex: 1,
    height: 5,
    marginLeft: 5,
    marginRight: 17,
    borderRadius: 3,
    backgroundColor: '#E1DEDD',
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#E64F21',
  },
  ratingBarCount: {
    minWidth: 21,
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  reviews: {
    marginTop: 75,
  },
  review: {
    paddingBottom: 33,
  },
  reviewSeparated: {
    marginBottom: 33,
    borderBottomWidth: 1,
    borderBottomColor: '#E1DEDD',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  reviewAuthor: {
    flex: 1,
    paddingTop: 4,
    gap: 3,
  },
  reviewAuthorName: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  verifiedText: {
    color: '#48B35E',
    fontSize: 12,
    lineHeight: 15,
  },
  reviewDate: {
    marginTop: 4,
    marginBottom: 8,
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  reviewBody: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  reviewMeta: {
    width: 143,
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  reviewDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E64F21',
  },
  reviewText: {
    flex: 1,
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  similarTitle: {
    color: '#201F1E',
  },
  similarCarousel: {
    marginTop: 20,
  },
  // Padding keeps the cards' shadows from being clipped by the scroll area.
  similarCards: {
    paddingRight: 4,
    paddingBottom: 10,
  },
  similarCard: {
    width: SIMILAR_CARD_WIDTH,
  },
  similarImage: {
    width: '100%',
    height: SIMILAR_IMAGE_HEIGHT,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F6F2',
    boxShadow: '0px 4px 5.8px rgba(0, 0, 0, 0.15)',
  },
  similarInfo: {
    gap: 4,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '3px 3px 5.1px rgba(0, 0, 0, 0.05)',
  },
  similarTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  similarName: {
    flexShrink: 1,
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  similarRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  similarRatingText: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
  },
  similarAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  similarAddressText: {
    color: '#AAA5A2',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '200',
  },
  // Half outside the carousel edge; the carousel sets the vertical position.
  carouselArrow: {
    position: 'absolute',
    width: CAROUSEL_ARROW_SIZE,
    height: CAROUSEL_ARROW_SIZE,
    borderRadius: CAROUSEL_ARROW_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.18)',
  },
  carouselArrowNext: {
    right: -23,
  },
  carouselArrowPrevious: {
    left: -23,
  },
  carouselArrowHovered: {
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.26)',
  },
  carouselArrowPressed: {
    opacity: 0.8,
  },
  chevronPrevious: {
    transform: [{ rotate: '180deg' }],
  },
  sidebar: {
    width: 382,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  map: {
    width: '100%',
    height: 199,
  },
  mapPin: {
    position: 'absolute',
    top: 60,
    left: 161,
  },
  sidebarBody: {
    paddingHorizontal: 26,
    paddingTop: 34,
    paddingBottom: 30,
    gap: 34,
  },
  sidebarSection: {
    gap: 6,
  },
  sidebarTitle: {
    color: '#000000',
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
  },
  sidebarText: {
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  hours: {
    gap: 8,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contacts: {
    marginTop: 13,
    gap: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  socials: {
    marginTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  stars: {
    flexDirection: 'row',
  },
});
