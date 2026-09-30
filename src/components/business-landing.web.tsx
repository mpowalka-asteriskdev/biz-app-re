import { Image, type ImageSource } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { LandingHeader } from '@/components/landing-header';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

const heroImage = require('@/assets/business/hero.jpg');
const phoneBlob = require('@/assets/business/phone-blob.svg');
const phoneScreen = require('@/assets/business/phone.png');
const photoAccent = require('@/assets/landing/home/discover-accent.svg');
const whyPhoto = require('@/assets/landing/home/discover-services.png');
const businessPhoto = require('@/assets/business/business-photo.jpg');
const flowArrow = require('@/assets/business/flow-arrow.svg');
const gMark = require('@/assets/business/g-mark.svg');
const cycleArrowTop = require('@/assets/business/cycle-arrow-top.svg');
const cycleArrowBottom = require('@/assets/business/cycle-arrow-bottom.svg');

// In Figma reading order: left column top, right column top, left bottom, right bottom.
const BENEFITS = [
  { icon: require('@/assets/business/icon-people.svg'), text: 'więcej klientów, dzięki\nlepszej widoczności w sieci' },
  { icon: require('@/assets/business/icon-home-trend-up.svg'), text: 'fundament pod dalsze\nzarządzanie firmą' },
  { icon: require('@/assets/business/icon-calendar.svg'), text: 'wszystkie wizyty i spotkania\nw jednym kalendarzu' },
  { icon: require('@/assets/business/icon-card-tick.svg'), text: 'mniej chaosu dzięki\nautomatycznym rezerwacjom' },
];

// The business Figma frame is drawn bigger than the "Dla Ciebie" one (48px vs 40px headline,
// 526px vs 428px hero) on the same 1728px artboard; scaling it by 5/6 makes both pages match.
const SCALE = 5 / 6;
const s = (value: number) => value * SCALE;

/**
 * "Dla biznesu" landing page of the web layout ("MacBook Pro 16" - biz" in Figma). Desktop sizes
 * are the Figma values passed through `s()`, in the frame's 1324px column. There is no mobile
 * design: narrow screens stack each section like the "Dla Ciebie" mobile page does.
 */
export function BusinessLanding() {
  const { isWebMobile: mobile } = usePlatformLayout();
  const copyStyle = mobile && mobileStyles.copy;

  return (
    <View style={[styles.page, mobile && mobileStyles.page]}>
      <BusinessHero mobile={mobile} />

      <View style={[styles.column, mobile && mobileStyles.column]}>
        <View style={[styles.row, styles.aboutRow, mobile && mobileStyles.section]}>
          <PhoneVisual mobile={mobile} />
          <View style={[styles.copy, styles.aboutCopy, copyStyle]}>
            <Text style={[styles.sectionTitle, mobile && mobileStyles.sectionTitle]}>
              Czym jest system ogarnijmy<Text style={styles.orange}>.</Text>to?
            </Text>
            <Text style={[styles.bodyText, styles.aboutText, mobile && mobileStyles.bodyText]}>
              Jeżeli prowadzisz biznes usługowy,{' '}
              <Link href="/" style={styles.inlineLink}>
                ogarnijmy.to
              </Link>{' '}
              pomoże Ci uporządkować codzienną pracę. Zbudujesz widoczny profil, który ułatwi
              klientom znalezienie Twojej firmy, przyjmiesz rezerwacje online i zsynchronizujesz je z
              kalendarzem.
            </Text>
          </View>
        </View>

        <View style={[styles.benefits, mobile && mobileStyles.benefits]}>
          {BENEFITS.map((benefit) => (
            <View key={benefit.text} style={[styles.benefit, mobile && mobileStyles.benefit]}>
              <View style={[styles.benefitBadge, mobile && mobileStyles.benefitBadge]}>
                <Image
                  accessibilityLabel=""
                  source={benefit.icon}
                  style={mobile ? mobileStyles.benefitIcon : styles.benefitIcon}
                />
              </View>
              <Text style={[styles.benefitText, mobile && mobileStyles.benefitText]}>
                {/* The Figma line breaks only fit the wide layout. */}
                {mobile ? benefit.text.replace('\n', ' ') : benefit.text}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.row, styles.whyRow, mobile && mobileStyles.section]}>
          <BlobPhoto image={whyPhoto} label="Para przeglądająca usługi w telefonie" mobile={mobile} />
          <View style={[styles.copy, styles.whyCopy, copyStyle]}>
            <Text style={[styles.sectionTitle, mobile && mobileStyles.sectionTitle]}>
              Dlaczego nas potrzebujesz?
            </Text>
            <Text
              style={[
                styles.bodyText,
                styles.bodyBold,
                styles.whyQuestion,
                mobile && mobileStyles.bodyText,
              ]}>
              Prowadzisz 3 różne kalendarze, przypominasz codziennie klientom o wizytach, a jeszcze
              próbujesz prowadzić swój biznes?
            </Text>
            <Text style={[styles.bodyText, styles.whyAnswer, mobile && mobileStyles.bodyText]}>
              Dajemy Ci gotowe rozwiązanie, które wspiera biznesy usługowe w zakresie umawiania wizyt,
              pilnowania kalendarza i rozliczania ich!
            </Text>
          </View>
        </View>

        {/* Decorative arrow leading from the photo above to the "g" mark. */}
        <FlowArrow mobile={mobile} />

        <View style={[styles.row, styles.businessRow, mobile && mobileStyles.section]}>
          <BlobPhoto image={businessPhoto} label="Kobieta prowadząca firmę przy laptopie" mobile={mobile} />
          <View style={[styles.copy, styles.businessCopy, copyStyle]}>
            <Text style={[styles.sectionTitle, mobile && mobileStyles.sectionTitle]}>
              Ogarnijmy sprawy biznesowe
            </Text>
            <Text style={[styles.bodyText, styles.businessText, mobile && mobileStyles.bodyText]}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
              quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </Text>
          </View>
        </View>

        {mobile ? <MobileCycle /> : <DesktopCycle />}
      </View>
    </View>
  );
}

function BusinessHero({ mobile }: { mobile: boolean }) {
  return (
    <View style={styles.hero}>
      {/* Mobile crops the photo around the two people instead of the desktop zoom. */}
      <Image
        accessibilityLabel=""
        contentFit="cover"
        contentPosition={mobile ? { left: '40%', top: '30%' } : undefined}
        source={heroImage}
        style={mobile ? mobileStyles.heroImage : styles.heroImage}
      />
      <View style={styles.heroBackdrop} />

      <View style={[styles.heroContent, mobile && mobileStyles.heroContent]}>
        <LandingHeader audience="business" />

        <View style={[styles.headline, mobile && mobileStyles.headline]}>
          <Text style={[styles.heroTitle, mobile && mobileStyles.heroTitle]}>
            {'Ogarnij biznes kompleksowo.\nOd rezerwacji po faktury.'}
          </Text>
          <Text style={[styles.heroSubtitle, mobile && mobileStyles.heroSubtitle]}>
            {'Więcej niż kalendarz. Zintegrowany system ERP.\nRezerwacje, magazyn, CRM, faktury, KSeF.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

/** Tilted phone screenshot on the dark blob ("Czym jest system ogarnijmy.to?"). */
function PhoneVisual({ mobile }: { mobile: boolean }) {
  const visual = mobile ? mobilePhoneStyles : phoneStyles;

  return (
    <View style={visual.box}>
      <Image accessibilityLabel="" source={phoneBlob} style={visual.blob} />
      <View style={visual.frame}>
        <View style={visual.phone}>
          <Image
            accessibilityLabel="Kalendarz wizyt w aplikacji ogarnijmy.to"
            contentFit="cover"
            draggable={false}
            source={phoneScreen}
            style={styles.fill}
          />
        </View>
      </View>
    </View>
  );
}

/** Photo in a rounded blob with the orange accent above its right side (Figma "Mask group"). */
function BlobPhoto({ image, label, mobile }: { image: ImageSource; label: string; mobile: boolean }) {
  const visual = mobile ? mobileBlobStyles : blobStyles;

  return (
    <View style={visual.box}>
      <Image accessibilityLabel="" source={photoAccent} style={visual.accent} />
      <Image accessibilityLabel={label} contentFit="cover" source={image} style={visual.photo} />
    </View>
  );
}

function FlowArrow({ mobile }: { mobile: boolean }) {
  const visual = mobile ? mobileFlowStyles : flowStyles;

  return (
    <View style={[visual.box, mobile ? mobileStyles.flow : styles.flow]}>
      <Image accessibilityLabel="" source={flowArrow} style={visual.arrow} />
      <Image accessibilityLabel="" source={gMark} style={visual.mark} />
    </View>
  );
}

/** "masz klienta" ⇄ "masz ogarnięte" side by side, as in Figma. */
function DesktopCycle() {
  return (
    <View style={styles.cycle}>
      <View style={[styles.cycleArrowBox, styles.cycleArrowTopBox]}>
        <Image accessibilityLabel="" source={cycleArrowTop} style={styles.cycleArrowTop} />
      </View>
      <Text style={[styles.cycleText, styles.cycleTextLeft]}>masz klienta</Text>
      <Text style={[styles.cycleText, styles.cycleTextRight]}>masz ogarnięte</Text>
      <View style={[styles.cycleArrowBox, styles.cycleArrowBottomBox]}>
        <Image accessibilityLabel="" source={cycleArrowBottom} style={styles.cycleArrowBottom} />
      </View>
    </View>
  );
}

/**
 * The same loop turned upright for narrow screens: "masz klienta" on top, "masz ogarnięte" below,
 * and each Figma arrow rotated a further 90° so they run down the right and back up the left.
 */
function MobileCycle() {
  return (
    <View style={mobileStyles.cycle}>
      <Text style={[mobileStyles.cycleText, mobileStyles.cycleTextTop]}>masz klienta</Text>
      <View style={[mobileStyles.cycleArrowBox, mobileStyles.cycleArrowRight]}>
        <Image accessibilityLabel="" source={cycleArrowTop} style={mobileStyles.cycleArrowDown} />
      </View>
      <View style={[mobileStyles.cycleArrowBox, mobileStyles.cycleArrowLeft]}>
        <Image accessibilityLabel="" source={cycleArrowBottom} style={mobileStyles.cycleArrowUp} />
      </View>
      <Text style={[mobileStyles.cycleText, mobileStyles.cycleTextBottom]}>masz ogarnięte</Text>
    </View>
  );
}

/** Phone-on-blob visual at `k` times its Figma size. */
function createPhoneStyles(k: number) {
  return StyleSheet.create({
    box: {
      width: 424 * k,
      height: 587 * k,
    },
    blob: {
      position: 'absolute',
      top: 120 * k,
      left: 0,
      width: 424 * k,
      height: 391 * k,
    },
    frame: {
      position: 'absolute',
      top: 0,
      left: 38 * k,
      width: 330 * k,
      height: 587 * k,
      alignItems: 'center',
      justifyContent: 'center',
    },
    phone: {
      width: 273.54 * k,
      height: 562.17 * k,
      overflow: 'hidden',
      borderRadius: 44 * k,
      transform: [{ rotate: '-5.92deg' }],
    },
  });
}

/** Blob photo visual at `k` times its Figma size. */
function createBlobStyles(k: number) {
  return StyleSheet.create({
    box: {
      width: 418 * k,
      height: 387 * k,
    },
    accent: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 238 * k,
      height: 219 * k,
    },
    photo: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 372 * k,
      height: 343 * k,
      borderRadius: 186 * k,
    },
  });
}

/** Wavy arrow and "g" mark at `k` times their Figma size; the box starts at the arrow's left. */
function createFlowStyles(k: number) {
  return StyleSheet.create({
    box: {
      width: (1166 - 269) * k,
      height: 507 * k,
    },
    arrow: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 759 * k,
      height: 370 * k,
    },
    mark: {
      position: 'absolute',
      top: 237 * k,
      left: (873 - 269) * k,
      width: 293 * k,
      height: 270 * k,
    },
  });
}

const phoneStyles = createPhoneStyles(SCALE);
const blobStyles = createBlobStyles(SCALE);
const flowStyles = createFlowStyles(SCALE);
// Sized to fit a 360px-wide phone with 16px margins.
const mobilePhoneStyles = createPhoneStyles(0.62);
const mobileBlobStyles = createBlobStyles(0.78);
const mobileFlowStyles = createFlowStyles(0.36);

const styles = StyleSheet.create({
  page: {
    width: '100%',
    overflow: 'hidden',
    paddingBottom: s(160),
    backgroundColor: '#FFFFFF',
  },
  fill: {
    width: '100%',
    height: '100%',
  },

  // Hero: the Figma photo is zoomed past "cover" (2247 × 1498 in a 1728 × 526 frame).
  hero: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#11110F',
  },
  heroImage: {
    position: 'absolute',
    top: '-88.85%',
    left: '-14.74%',
    width: '130%',
    height: '284.74%',
  },
  heroBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(10, 0, 0, 0.6)',
  },
  // Same box as the "Dla Ciebie" hero, so the shared header sits in the same place.
  heroContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1352,
    paddingHorizontal: 64,
    paddingTop: 43,
    paddingBottom: s(526 - 392),
  },
  // In Figma the headline starts 204px from the top; the header ends 93px down (43 + 50).
  headline: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginTop: s(204) - 93,
    gap: s(22),
  },
  heroTitle: {
    color: '#F9F6F2',
    fontSize: s(48),
    lineHeight: s(59),
    fontWeight: '700',
    textAlign: 'right',
  },
  heroSubtitle: {
    color: '#F9F6F2',
    fontSize: s(20),
    lineHeight: s(24),
    textAlign: 'right',
  },

  column: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: s(1324),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy: {
    flexShrink: 1,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: s(40),
    lineHeight: s(49),
    fontWeight: '700',
  },
  orange: {
    color: '#E64F21',
  },
  bodyText: {
    color: '#201F1E',
    fontSize: s(20),
    lineHeight: s(32),
    fontWeight: '300',
  },
  bodyBold: {
    fontWeight: '700',
  },
  inlineLink: {
    textDecorationLine: 'underline',
  },

  // "Czym jest system ogarnijmy.to?"
  aboutRow: {
    marginTop: s(107),
    paddingLeft: s(50),
  },
  aboutCopy: {
    width: s(776),
    marginLeft: s(82),
  },
  aboutText: {
    marginTop: s(22),
    color: 'rgba(0, 0, 0, 0.8)',
  },

  benefits: {
    marginTop: s(198),
    paddingLeft: s(48),
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: s(63),
  },
  benefit: {
    width: s(632),
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(33),
  },
  benefitBadge: {
    width: s(64),
    height: s(64),
    borderRadius: s(32),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
  },
  benefitIcon: {
    width: s(34),
    height: s(34),
  },
  benefitText: {
    flexShrink: 1,
    color: '#000000',
    fontSize: s(32),
    lineHeight: s(39),
    fontWeight: '700',
  },

  // "Dlaczego nas potrzebujesz?"
  whyRow: {
    marginTop: s(232),
    paddingLeft: s(89),
  },
  whyCopy: {
    width: s(706),
    marginLeft: s(49),
  },
  whyQuestion: {
    marginTop: s(18),
  },
  whyAnswer: {
    marginTop: s(28),
  },
  flow: {
    marginTop: s(71),
    marginLeft: s(269),
  },

  // "Ogarnijmy sprawy biznesowe"
  businessRow: {
    marginTop: s(91),
    paddingLeft: s(86),
  },
  businessCopy: {
    width: s(706),
    marginLeft: s(52),
  },
  businessText: {
    marginTop: s(21),
  },

  // "masz klienta" ⇄ "masz ogarnięte"
  cycle: {
    height: s(522),
    marginTop: s(228),
  },
  cycleText: {
    position: 'absolute',
    top: s(211),
    width: s(655),
    color: '#000000',
    fontSize: s(80),
    lineHeight: s(98),
    fontWeight: '700',
  },
  cycleTextLeft: {
    left: 0,
  },
  cycleTextRight: {
    left: s(669),
  },
  cycleArrowBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cycleArrowTopBox: {
    top: 0,
    left: s(395),
    width: s(408),
    height: s(226),
  },
  cycleArrowTop: {
    width: s(393.03),
    height: s(172.72),
    transform: [{ rotate: '171.99deg' }, { skewX: '-1.65deg' }],
  },
  cycleArrowBottomBox: {
    top: s(304),
    left: s(396),
    width: s(406),
    height: s(218),
  },
  cycleArrowBottom: {
    width: s(392.8),
    height: s(172.8),
    transform: [{ rotate: '-6.71deg' }, { skewX: '-1.39deg' }],
  },
});

// Size of the rotated cycle arrows on narrow screens (their Figma size is 393 × 173).
const CYCLE_ARROW_SCALE = 0.55;
const CYCLE_ARROW_WIDTH = 393 * CYCLE_ARROW_SCALE;
const CYCLE_ARROW_HEIGHT = 173 * CYCLE_ARROW_SCALE;
const MOBILE_CYCLE_WIDTH = 300;
const MOBILE_CYCLE_HEIGHT = 330;

/**
 * Narrow web screens, designed here (Figma has no mobile "Dla biznesu" frame): one column with
 * 16px margins and the "Dla Ciebie" mobile type sizes; each visual sits above its text.
 */
const mobileStyles = StyleSheet.create({
  page: {
    paddingBottom: 72,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  heroContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 48,
  },
  headline: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 64,
    gap: 12,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  column: {
    paddingHorizontal: 16,
  },
  section: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 0,
  },
  copy: {
    alignSelf: 'stretch',
    width: 'auto',
    marginLeft: 0,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 27,
    lineHeight: 34,
  },
  bodyText: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 26,
  },
  benefits: {
    marginTop: 64,
    paddingLeft: 0,
    flexDirection: 'column',
    rowGap: 24,
  },
  benefit: {
    width: 'auto',
    gap: 16,
  },
  benefitBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  benefitIcon: {
    width: 26,
    height: 26,
  },
  benefitText: {
    fontSize: 20,
    lineHeight: 26,
  },
  flow: {
    alignSelf: 'center',
    marginTop: 48,
  },
  cycle: {
    alignSelf: 'center',
    width: MOBILE_CYCLE_WIDTH,
    height: MOBILE_CYCLE_HEIGHT,
    marginTop: 80,
  },
  cycleText: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: '#000000',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    textAlign: 'center',
  },
  cycleTextTop: {
    top: 0,
  },
  cycleTextBottom: {
    bottom: 0,
  },
  // Each arrow is laid out unrotated and turned about its centre, 50px in from the side.
  cycleArrowBox: {
    position: 'absolute',
    top: (MOBILE_CYCLE_HEIGHT - CYCLE_ARROW_HEIGHT) / 2,
    width: CYCLE_ARROW_WIDTH,
    height: CYCLE_ARROW_HEIGHT,
  },
  cycleArrowRight: {
    left: MOBILE_CYCLE_WIDTH - 50 - CYCLE_ARROW_WIDTH / 2,
  },
  cycleArrowLeft: {
    left: 50 - CYCLE_ARROW_WIDTH / 2,
  },
  cycleArrowDown: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '261.99deg' }, { skewX: '-1.65deg' }],
  },
  cycleArrowUp: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '83.29deg' }, { skewX: '-1.39deg' }],
  },
});
