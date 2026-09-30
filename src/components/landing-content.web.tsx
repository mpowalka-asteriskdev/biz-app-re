import { Image, type ImageSource } from 'expo-image';
import { type Href, Link } from 'expo-router';
import { Component, createRef, type ReactNode, useState } from 'react';
import {
  Pressable,
  ScrollView,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { usePlatformLayout } from '@/hooks/use-platform-layout';

const discoverServices = require('@/assets/landing/home/discover-services.png');
const discoverAccent = require('@/assets/landing/home/discover-accent.svg');
const appPreview = require('@/assets/landing/home/app-preview.png');
const appAccent = require('@/assets/landing/home/app-accent.svg');
const faqArrow = require('@/assets/landing/home/faq-arrow.svg');

const massageImage = require('@/assets/landing/home/massage.jpg');
const barberPortraitImage = require('@/assets/landing/home/barber-portrait.jpg');
const barberShaveImage = require('@/assets/landing/home/barber-shave.png');
const personalTrainerImage = require('@/assets/landing/home/personal-trainer.jpg');
const haircutImage = require('@/assets/landing/home/haircut.jpg');
const tattooImage = require('@/assets/landing/home/tattoo.jpg');

const CATEGORIES = [
  { label: 'Barber', slug: 'barber' },
  { label: 'Trening', slug: 'trening' },
  { label: 'Tatuaż', slug: 'tatuaz' },
  { label: 'Paznokcie', slug: 'paznokcie' },
  { label: 'Fryzjer', slug: 'fryzjer' },
  { label: 'Masaż', slug: 'masaz' },
  { label: 'Solarium', slug: 'solarium' },
  { label: 'Barber', slug: 'barber' },
  { label: 'Trener personalny', slug: 'trener-personalny' },
  { label: 'Masaż', slug: 'masaz' },
] as const;

type CategorySlug = (typeof CATEGORIES)[number]['slug'];

type ServiceCardData = {
  id: string;
  /** The card opens /app/{category}/{id}; every id shows the same sample business for now. */
  category: CategorySlug;
  image: ImageSource;
  name: string;
  rating: string;
  address: string;
};

const RECOMMENDED: ServiceCardData[] = [
  {
    id: 'massage-gotu-han',
    category: 'masaz',
    image: massageImage,
    name: 'Masaż Gotu Han',
    rating: '4,98',
    address: 'Krzywa 13, Poznań',
  },
  {
    id: 'personal-zone',
    category: 'trening',
    image: personalTrainerImage,
    name: 'Personal Zone',
    rating: '5,00',
    address: 'Główna 69, Poznań',
  },
  {
    id: 'crazy-one',
    category: 'barber',
    image: barberPortraitImage,
    name: 'CrazyOne',
    rating: '4,70',
    address: 'Poznańska 2, Poznań',
  },
  {
    id: 'barber-main',
    category: 'barber',
    image: barberShaveImage,
    name: 'Barber przy Głównej',
    rating: '4,98',
    address: 'Krzywa 13, Poznań',
  },
  {
    id: 'bar-barber',
    category: 'barber',
    image: haircutImage,
    name: 'BarBarber',
    rating: '5,00',
    address: 'Główna 69, Poznań',
  },
];

const CATEGORY_SERVICE_NAMES: Record<CategorySlug, readonly string[]> = {
  barber: ['Barber przy Głównej', 'BarBarber', 'CrazyOne', 'Gentleman Barber', 'Strefa Brody'],
  trening: ['Personal Zone', 'Active Point', 'Forma Studio', 'Coach Club', 'FitLab Poznań'],
  tatuaz: ['MarTattoo', 'Black Ink Studio', 'Needle House', 'Wild Line Tattoo', 'Studio 13'],
  paznokcie: ['Nail Room', 'Mani Studio', 'Paznokcie & Co.', 'Beauty Point', 'Nail Art Poznań'],
  fryzjer: ['Studio Fryzur', 'Hair Spot', 'Fryzjer przy Głównej', 'Cut & Color', 'Salon 69'],
  masaz: ['Masaż Gotu Han', 'Strefa Relaksu', 'Balance Massage', 'Dobry Masaż', 'Relax Point'],
  solarium: ['Sun Studio', 'Solarium Glow', 'Golden Tan', 'Sun Point', 'Studio Słońca'],
  'trener-personalny': [
    'Trener Personalny Marta',
    'Coach Michał',
    'Trening z Olą',
    'Personal Best',
    'Move Studio',
  ],
};

const SERVICE_IMAGES = [
  massageImage,
  personalTrainerImage,
  tattooImage,
  haircutImage,
  barberShaveImage,
  barberPortraitImage,
];

const CATEGORY_IMAGE_OFFSET: Record<CategorySlug, number> = {
  barber: 4,
  trening: 1,
  tatuaz: 2,
  paznokcie: 5,
  fryzjer: 3,
  masaz: 0,
  solarium: 5,
  'trener-personalny': 1,
};

const ADDRESSES = [
  'Krzywa 13, Poznań',
  'Główna 69, Poznań',
  'Poznańska 2, Poznań',
  'Długa 8, Poznań',
  'Rynek 4, Poznań',
];

const RATINGS = ['4,98', '5,00', '4,70', '4,92', '4,86'];

const CATEGORY_SERVICES = Object.fromEntries(
  Object.entries(CATEGORY_SERVICE_NAMES).map(([slug, names]) => {
    const categorySlug = slug as CategorySlug;
    const imageOffset = CATEGORY_IMAGE_OFFSET[categorySlug];
    const services = names.map((name, index) => ({
      id: `${slug}-${index}`,
      category: categorySlug,
      image: SERVICE_IMAGES[(imageOffset + index) % SERVICE_IMAGES.length],
      name,
      rating: RATINGS[index],
      address: ADDRESSES[index],
    }));

    return [slug, services];
  }),
) as Record<CategorySlug, ServiceCardData[]>;

const TODAY: ServiceCardData[] = [
  RECOMMENDED[3],
  RECOMMENDED[4],
  RECOMMENDED[2],
  RECOMMENDED[0],
  RECOMMENDED[1],
];

const NEWEST: ServiceCardData[] = [
  {
    id: 'mar-tattoo',
    category: 'tatuaz',
    image: tattooImage,
    name: 'MarTattoo',
    rating: '4,98',
    address: 'Krzywa 13, Poznań',
  },
  RECOMMENDED[4],
  RECOMMENDED[2],
  RECOMMENDED[3],
  RECOMMENDED[0],
];

const FEATURE_COPY =
  'Zamiast dzwonić po kolejnych miejscach, widzisz od razu wolne terminy, ceny i opinie innych użytkowników. Wybierasz usługę, rezerwujesz dogodną godzinę i od razu dostajesz potwierdzenie.\nPrzypomnimy Ci o zbliżającej się wizycie, a wszystkie rezerwacje zawsze znajdziesz w swoim profilu – dzięki temu naprawdę ogarniasz swój dzień.';

const FAQ_ITEMS = [
  {
    question: 'Czy ogarnijmy.to zastępuje Booksy?',
    answer:
      'ogarnijmy.to działa podobnie do Booksy – pomaga klientom znaleźć usługę i umówić wizytę online. Naszym celem jest jednak pójście krok dalej: oprócz rezerwacji rozwijamy moduły, które pozwolą firmom ogarniać całą codzienną działalność, od sprzedaży i magazynu, przez prosty CRM, aż po fakturowanie.',
  },
  {
    question: 'Czy aplikacja jest darmowa?',
    answer:
      'Tak, dla osób korzystających z usług aplikacja jest bezpłatna. Dla firm planujemy bezpłatny plan startowy z podstawowymi funkcjami rezerwacji.',
  },
  {
    question: 'Czy mogę korzystać z aplikacji bez logowania?',
    answer:
      'Oferty usług i profile firm możesz przeglądać bez logowania. Aby zarezerwować wizytę, zapisać ulubione miejsca i wygodnie zarządzać rezerwacjami, potrzebne będzie darmowe konto użytkownika.',
  },
];

/** Figma landing-page content between the existing hero/menu and footer. */
export function LandingContent() {
  const { isWebMobile } = usePlatformLayout();
  const [activeCategory, setActiveCategory] = useState<CategorySlug>('trening');

  return (
    <View style={styles.page}>
      <View style={[styles.content, isWebMobile && mobileStyles.content]}>
        <CategoryRail
          activeCategory={activeCategory}
          isMobile={isWebMobile}
          onSelect={setActiveCategory}
        />
        <ServiceSection
          key={`recommended-${activeCategory}`}
          title="Polecane usługi"
          services={CATEGORY_SERVICES[activeCategory]}
          isMobile={isWebMobile}
        />

        <FeatureRow
          isMobile={isWebMobile}
          visual={<DiscoverVisual isMobile={isWebMobile} />}
          title="Nie wiesz którego fryzjera wybrać?"
          text={FEATURE_COPY}
        />

        <ServiceSection title="Terminy na dziś" services={TODAY} isMobile={isWebMobile} />

        <FeatureRow
          isMobile={isWebMobile}
          reverse
          visual={<AppVisual isMobile={isWebMobile} />}
          title="Wygodna aplikacja i wszystko pod ręką"
          text={FEATURE_COPY}
          action
        />

        <ServiceSection title="Ostatnio dołączyli" services={NEWEST} isMobile={isWebMobile} />
        <FaqSection isMobile={isWebMobile} />
      </View>
    </View>
  );
}

function CategoryRail({
  activeCategory,
  isMobile,
  onSelect,
}: {
  activeCategory: CategorySlug;
  isMobile: boolean;
  onSelect: (category: CategorySlug) => void;
}) {
  return (
    <DraggableHorizontalRail
      isMobile={isMobile}
      contentContainerStyle={[styles.categoryRail, isMobile && mobileStyles.categoryRail]}
      style={styles.fullBleedRail}>
      {CATEGORIES.map((category, index) => {
        const active = category.slug === activeCategory;
        return (
          <Pressable
            key={`${category.slug}-${index}`}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(category.slug)}>
            <Text style={[styles.category, active && styles.categoryActive]}>
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </DraggableHorizontalRail>
  );
}

function ServiceSection({
  title,
  services,
  isMobile,
}: {
  title: string;
  services: ServiceCardData[];
  isMobile: boolean;
}) {
  return (
    <View style={[styles.serviceSection, isMobile && mobileStyles.serviceSection]}>
      <Text style={[styles.sectionTitle, isMobile && mobileStyles.sectionTitle]}>{title}</Text>
      <DraggableHorizontalRail
        isMobile={isMobile}
        contentContainerStyle={[styles.cardRail, isMobile && mobileStyles.cardRail]}
        style={styles.fullBleedRail}>
        {services.map((service, index) => (
          <ServiceCard
            key={`${service.id}-${index}`}
            service={service}
            isMobile={isMobile}
          />
        ))}
      </DraggableHorizontalRail>
    </View>
  );
}

type DraggableHorizontalRailProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  isMobile: boolean;
  style?: StyleProp<ViewStyle>;
};

// The mouse must move this far before a press becomes a drag.
const DRAG_THRESHOLD = 5;
// A press held this long counts as a hold, not a click.
const HOLD_DURATION = 500;

/**
 * Horizontal rail that also scrolls by dragging with the mouse. Dragging works from anywhere,
 * including the cards; a card opens only on a plain click (no drag, released within
 * `HOLD_DURATION`). Touch screens keep the native scroll.
 */
class DraggableHorizontalRail extends Component<DraggableHorizontalRailProps> {
  private readonly scrollViewRef = createRef<ScrollView>();
  private node: HTMLElement | null = null;
  private pressStart: { x: number; scrollLeft: number; time: number } | null = null;
  private dragging = false;
  // Set on release when the press was a drag or a hold, so the click that follows is dropped.
  private cancelClick = false;

  componentDidMount() {
    this.node = this.scrollViewRef.current?.getScrollableNode() ?? null;
    this.node?.addEventListener('mousedown', this.onMouseDown);
    // Capture phase, so the click is dropped before it reaches the card link.
    this.node?.addEventListener('click', this.onClickCapture, true);
    // Browsers start their own drag on links and images, which would swallow the mouse moves.
    this.node?.addEventListener('dragstart', this.onDragStart);
  }

  componentWillUnmount() {
    this.node?.removeEventListener('mousedown', this.onMouseDown);
    this.node?.removeEventListener('click', this.onClickCapture, true);
    this.node?.removeEventListener('dragstart', this.onDragStart);
    this.stopTracking();
  }

  private readonly onMouseDown = (event: MouseEvent) => {
    if (event.button !== 0 || !this.node) return;
    this.pressStart = { x: event.clientX, scrollLeft: this.node.scrollLeft, time: Date.now() };
    this.dragging = false;
    this.cancelClick = false;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  };

  private readonly onMouseMove = (event: MouseEvent) => {
    if (!this.pressStart || !this.node) return;
    const dx = event.clientX - this.pressStart.x;
    if (!this.dragging && Math.abs(dx) > DRAG_THRESHOLD) {
      this.dragging = true;
    }
    if (this.dragging) {
      // Stops text selection while dragging.
      event.preventDefault();
      this.node.scrollLeft = this.pressStart.scrollLeft - dx;
    }
  };

  private readonly onMouseUp = () => {
    if (this.pressStart) {
      this.cancelClick = this.dragging || Date.now() - this.pressStart.time >= HOLD_DURATION;
    }
    this.stopTracking();
  };

  private readonly onClickCapture = (event: MouseEvent) => {
    if (this.cancelClick) {
      event.preventDefault();
      event.stopPropagation();
      this.cancelClick = false;
    }
  };

  private readonly onDragStart = (event: DragEvent) => event.preventDefault();

  private stopTracking() {
    this.pressStart = null;
    this.dragging = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  render() {
    const { children, contentContainerStyle, isMobile, style } = this.props;

    return (
      <ScrollView
        ref={this.scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        style={[style, !isMobile && styles.desktopDraggableRail]}>
        {children}
      </ScrollView>
    );
  }
}

function ServiceCard({ service, isMobile }: { service: ServiceCardData; isMobile: boolean }) {
  // The rail drops the click after a drag or a hold, so only a plain click opens the card.
  return (
    <Link asChild href={`/app/${service.category}/${service.id}` as Href}>
      {/* Link's Slot rejects style arrays on its child, so the card style is flattened. */}
      <Pressable
        accessibilityRole="link"
        style={StyleSheet.flatten([styles.card, isMobile && mobileStyles.card])}>
        <View style={styles.cardImageWrap}>
          {/* Browsers drag <img> elements natively, which would swallow the rail's mouse drag. */}
          <Image
            accessibilityLabel={`Zdjęcie ${service.name}`}
            contentFit="cover"
            draggable={false}
            source={service.image}
            style={styles.cardImage}
          />
          {/* Favorites aren't saved yet; cancelling the click keeps the card link from opening. */}
          <Pressable
            accessibilityLabel={`Dodaj ${service.name} do ulubionych`}
            onPress={(event) => event.preventDefault()}
            style={styles.favorite}>
            <HeartIcon />
          </Pressable>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTopLine}>
            <Text numberOfLines={1} style={styles.cardName}>
              {service.name}
            </Text>
            <View style={styles.rating}>
              <StarIcon />
              <Text style={styles.ratingText}>{service.rating}</Text>
            </View>
          </View>
          <View style={styles.location}>
            <LocationIcon />
            <Text numberOfLines={1} style={styles.address}>
              {service.address}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

function FeatureRow({
  visual,
  title,
  text,
  action,
  reverse,
  isMobile,
}: {
  visual: ReactNode;
  title: string;
  text: string;
  action?: boolean;
  reverse?: boolean;
  isMobile: boolean;
}) {
  return (
    <View
      style={[
        styles.feature,
        reverse && styles.featureReverse,
        isMobile && mobileStyles.feature,
      ]}>
      {visual}
      <View style={[styles.featureCopy, isMobile && mobileStyles.featureCopy]}>
        <Text style={[styles.featureTitle, isMobile && mobileStyles.featureTitle]}>{title}</Text>
        <Text style={[styles.featureText, isMobile && mobileStyles.featureText]}>{text}</Text>
        {action && (
          <Link asChild href={'/app' as Href}>
            <Pressable accessibilityRole="link" style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>Pobierz aplikację</Text>
            </Pressable>
          </Link>
        )}
      </View>
    </View>
  );
}

function DiscoverVisual({ isMobile }: { isMobile: boolean }) {
  return (
    <View style={[styles.discoverVisual, isMobile && mobileStyles.discoverVisual]}>
      <Image accessibilityLabel="" source={discoverAccent} style={styles.discoverAccent} />
      <Image
        accessibilityLabel="Osoby wybierające usługę w aplikacji"
        contentFit="cover"
        source={discoverServices}
        style={styles.discoverImage}
      />
    </View>
  );
}

function AppVisual({ isMobile }: { isMobile: boolean }) {
  return (
    <View style={[styles.appVisual, isMobile && mobileStyles.appVisual]}>
      <Image accessibilityLabel="" source={appAccent} style={styles.appAccent} />
      {/* The mockup PNG has opaque black corners around the phone; the rounded frame hides them. */}
      <View style={[styles.appPreview, isMobile && mobileStyles.appPreview]}>
        <Image
          accessibilityLabel="Podgląd aplikacji ogarnijmy.to"
          contentFit="cover"
          draggable={false}
          source={appPreview}
          style={styles.appPreviewImage}
        />
      </View>
    </View>
  );
}

function FaqSection({ isMobile }: { isMobile: boolean }) {
  return (
    <View style={[styles.faq, isMobile && mobileStyles.faq]}>
      <View style={[styles.faqHeadingWrap, isMobile && mobileStyles.faqHeadingWrap]}>
        <Text style={[styles.faqHeading, isMobile && mobileStyles.faqHeading]}>
          Najczęściej zadawane pytania
        </Text>
        <Image accessibilityLabel="" source={faqArrow} style={styles.faqArrow} />
      </View>
      <View style={[styles.faqItems, isMobile && mobileStyles.faqItems]}>
        {FAQ_ITEMS.map((item) => (
          <View key={item.question} style={styles.faqItem}>
            <Text style={[styles.faqQuestion, isMobile && mobileStyles.faqQuestion]}>
              {item.question}
            </Text>
            <Text style={[styles.faqAnswer, isMobile && mobileStyles.faqAnswer]}>
              {item.answer}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function HeartIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 13.47S2.67 10.43 2.67 6.13A2.8 2.8 0 0 1 8 4.91a2.8 2.8 0 0 1 5.33 1.22C13.33 10.43 8 13.47 8 13.47Z"
        stroke="#E85012"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function StarIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="m6 1 1.49 3.02 3.34.49-2.42 2.35.57 3.32L6 8.61l-2.98 1.57.57-3.32L1.17 4.51l3.34-.49L6 1Z"
        fill="#FFB800"
      />
    </Svg>
  );
}

function LocationIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="M10 5c0 3-4 6-4 6S2 8 2 5a4 4 0 1 1 8 0Z"
        stroke="#E85012"
        strokeWidth={1.15}
      />
      <Circle cx={6} cy={5} r={1.25} stroke="#E85012" strokeWidth={1.15} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1356,
    paddingHorizontal: 54,
    paddingTop: 46,
    paddingBottom: 142,
  },
  fullBleedRail: {
    width: '100%',
  },
  desktopDraggableRail: {
    userSelect: 'none',
  },
  categoryRail: {
    minWidth: '100%',
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 38,
    paddingHorizontal: 25,
  },
  category: {
    color: '#AAA5A2',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  categoryActive: {
    color: '#E85012',
  },
  serviceSection: {
    marginTop: 46,
  },
  sectionTitle: {
    color: '#201F1E',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    marginLeft: 25,
    marginBottom: 8,
  },
  cardRail: {
    gap: 28,
    paddingHorizontal: 3,
    paddingTop: 5,
    paddingBottom: 13,
  },
  card: {
    width: 250,
    height: 276,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 5.8px rgba(0, 0, 0, 0.15)',
  },
  cardImageWrap: {
    height: 215,
    overflow: 'hidden',
    backgroundColor: '#F2EFEC',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  favorite: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.16)',
  },
  cardBody: {
    height: 61,
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 4,
  },
  cardTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardName: {
    flex: 1,
    color: '#201F1E',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  address: {
    color: '#AAA5A2',
    fontSize: 11,
    lineHeight: 14,
  },
  feature: {
    minHeight: 480,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 72,
    marginTop: 77,
    paddingHorizontal: 27,
  },
  featureReverse: {
    minHeight: 700,
  },
  featureCopy: {
    flex: 1,
    gap: 12,
  },
  featureTitle: {
    color: '#201F1E',
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '700',
  },
  featureText: {
    color: '#201F1E',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '300',
  },
  discoverVisual: {
    width: 452,
    height: 387,
  },
  discoverAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 238,
    height: 219,
  },
  discoverImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 372,
    height: 343,
    borderRadius: 186,
  },
  appVisual: {
    width: 424,
    height: 640,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appAccent: {
    position: 'absolute',
    top: 56,
    left: 0,
    width: 424,
    height: 391,
  },
  // Corner radius matches the phone frame in the mockup (about 72px at its 437px width).
  appPreview: {
    width: 310,
    height: 634,
    borderRadius: 51,
    overflow: 'hidden',
    transform: [{ rotate: '-8deg' }],
  },
  // Slight overscan crops the thin black edge around the phone frame.
  appPreviewImage: {
    position: 'absolute',
    top: -2,
    right: -2,
    bottom: -2,
    left: -2,
  },
  downloadButton: {
    width: 230,
    height: 50,
    marginTop: 13,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E85012',
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '700',
  },
  faq: {
    marginTop: 116,
    paddingHorizontal: 36,
  },
  faqHeadingWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  faqHeading: {
    color: '#201F1E',
    fontSize: 48,
    lineHeight: 70,
    fontWeight: '700',
    textAlign: 'center',
  },
  faqArrow: {
    width: 98,
    height: 135,
    marginTop: -10,
    marginRight: 760,
  },
  faqItems: {
    gap: 38,
  },
  faqItem: {
    gap: 12,
  },
  faqQuestion: {
    color: '#201F1E',
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '700',
  },
  faqAnswer: {
    color: '#201F1E',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '300',
  },
});

const mobileStyles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 72,
  },
  categoryRail: {
    justifyContent: 'flex-start',
    gap: 24,
    paddingHorizontal: 0,
    paddingRight: 16,
  },
  serviceSection: {
    marginTop: 36,
  },
  sectionTitle: {
    marginLeft: 0,
    marginBottom: 12,
    fontSize: 22,
    lineHeight: 28,
  },
  cardRail: {
    gap: 16,
    paddingLeft: 1,
    paddingRight: 16,
  },
  card: {
    width: 232,
  },
  feature: {
    minHeight: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 30,
    marginTop: 72,
    paddingHorizontal: 0,
  },
  featureCopy: {
    flexGrow: 0,
  },
  featureTitle: {
    fontSize: 27,
    lineHeight: 34,
  },
  featureText: {
    fontSize: 16,
    lineHeight: 26,
  },
  discoverVisual: {
    alignSelf: 'center',
    width: 343,
    maxWidth: '100%',
    height: 314,
    transform: [{ scale: 0.88 }],
  },
  appVisual: {
    alignSelf: 'center',
    width: 343,
    maxWidth: '100%',
    height: 525,
  },
  appPreview: {
    width: 250,
    height: 511,
    borderRadius: 41,
  },
  faq: {
    marginTop: 88,
    paddingHorizontal: 0,
  },
  faqHeadingWrap: {
    alignItems: 'flex-start',
    marginBottom: 34,
  },
  faqArrow: {
    marginRight: 0,
  },
  faqHeading: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'left',
  },
  faqItems: {
    gap: 34,
  },
  faqQuestion: {
    fontSize: 23,
    lineHeight: 30,
  },
  faqAnswer: {
    fontSize: 16,
    lineHeight: 26,
  },
});
