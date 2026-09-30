import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { usePlatformLayout } from '@/hooks/use-platform-layout';

const appStoreBadge = require('@/assets/footer/app-store-badge.svg');
const googlePlayBadge = require('@/assets/footer/google-play-badge.svg');

const FOOTER_SECTIONS = ['O nas', 'Regulamin', 'FAQ', 'Polityka prywatności'];
const PLACEHOLDER_LINKS = ['Opcja pierwsza', 'Opcja druga', 'Opcja trzecia'];

/**
 * Orange page footer of the web layout; it stacks vertically on mobile web. Reuse it on every
 * desktop page instead of the footer drawn in individual Figma frames.
 */
export function SiteFooter() {
  const { isWebMobile } = usePlatformLayout();

  return (
    <View style={[styles.footer, isWebMobile && mobileStyles.footer]}>
      <View style={[styles.content, isWebMobile && mobileStyles.content]}>
        <FooterLogo size={isWebMobile ? 80 : 110} />

        <View style={[styles.sections, isWebMobile && mobileStyles.sections]}>
          {FOOTER_SECTIONS.map((title) => (
            <View key={title} style={[styles.section, isWebMobile && mobileStyles.section]}>
              <Text style={[styles.sectionTitle, isWebMobile && mobileStyles.sectionText]}>
                {title}
              </Text>
              {PLACEHOLDER_LINKS.map((link) => (
                <Text
                  key={link}
                  style={[styles.sectionLink, isWebMobile && mobileStyles.sectionText]}>
                  {link}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={[styles.storeBadges, isWebMobile && mobileStyles.storeBadges]}>
          <Image
            accessibilityLabel="Pobierz w App Store"
            contentFit="contain"
            source={appStoreBadge}
            style={styles.appStoreBadge}
          />
          <Image
            accessibilityLabel="Pobierz z Google Play"
            contentFit="contain"
            source={googlePlayBadge}
            style={styles.googlePlayBadge}
          />
        </View>
      </View>
    </View>
  );
}

function FooterLogo({ size }: { size: number }) {
  return (
    <Svg width={size} height={(size * 127) / 137} viewBox="0 0 137 127" fill="none">
      <Path d="M68.5035 0C110.249 0 137.007 24.7558 137.007 63.5C137.007 102.244 110.249 127 68.5035 127C26.758 127 0 102.251 0 63.5C0 24.7487 27.8351 0 68.5035 0Z" fill="#201F1E" />
      <Path d="M79.4945 70.9539C79.4945 70.9539 91.5908 69.8778 91.5908 52.9892C91.5908 40.5471 82.3077 31.8748 68.3406 31.8748C54.3734 31.8748 45.0903 40.5471 45.0903 53.5593C45.0903 66.5714 54.3734 75.2437 68.3406 75.2437C73.7758 75.2437 83.151 75.2437 83.151 84.1085C83.151 91.9329 78.0914 96.0802 68.8083 96.0802C59.5252 96.0802 54.4655 91.3699 54.4655 82.3199H45.558C45.558 96.4579 53.8986 104.475 68.8083 104.475C83.7179 104.475 92.0585 97.028 92.0585 84.4862C92.0585 74.5881 84.7454 70.961 79.4945 70.961V70.9539ZM53.9978 53.5593C53.9978 45.3572 59.5323 40.2692 68.3406 40.2692C77.1489 40.2692 82.6833 45.2646 82.6833 53.5593C82.6833 63.1723 77.5245 66.8493 68.3406 66.8493C59.1567 66.8493 53.9978 61.6615 53.9978 53.5593Z" fill="#F9F6F2" />
      <Path d="M88.5862 22.5396C92.2428 22.5396 94.6805 24.7985 94.6805 28.105C94.6805 31.4114 92.2428 33.6704 88.5862 33.6704C84.9297 33.6704 82.5841 31.5041 82.5841 28.105C82.5841 24.7059 84.9297 22.5396 88.5862 22.5396Z" fill="#E85012" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 64,
    paddingVertical: 28,
    backgroundColor: '#E64F21',
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1385,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32,
  },
  // Columns share all the space between the logo and the store badges.
  sections: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    rowGap: 24,
    columnGap: 40,
  },
  section: {
    alignItems: 'flex-end',
    gap: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  sectionLink: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'right',
  },
  storeBadges: {
    alignItems: 'flex-start',
    gap: 12,
  },
  appStoreBadge: {
    width: 131,
    height: 43,
  },
  googlePlayBadge: {
    width: 147,
    height: 44,
  },
});

/** Narrow web screens: everything stacks and centers. */
const mobileStyles = StyleSheet.create({
  footer: {
    paddingHorizontal: 24,
  },
  content: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: 28,
  },
  // Undo the desktop `flex: 1`, which collapses the grid's height in a column layout.
  sections: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    rowGap: 20,
    columnGap: 16,
  },
  section: {
    width: '45%',
    alignItems: 'center',
  },
  sectionText: {
    textAlign: 'center',
  },
  storeBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
