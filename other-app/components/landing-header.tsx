import { Image } from 'expo-image';
import { type Href, Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthLogo, PersonIcon } from '@/components/auth-icons';
import { LandingLoginButton } from '@/components/landing-login-button';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';

const businessWordmark = require('@/assets/business/logo-business.svg');

type Audience = 'client' | 'business';

const AUDIENCES: { audience: Audience; label: string; href: Href }[] = [
  { audience: 'client', label: 'Dla Ciebie', href: '/' },
  { audience: 'business', label: 'Dla biznesu', href: '/dla-biznesu' as Href },
];

/**
 * Header row of the web landing pages: logo, the "Dla Ciebie" / "Dla biznesu" switch and the
 * account button. Both landings use it, so nothing moves when switching between them. Pages
 * outside the two landings (like the 404) leave `audience` out, so no tab is marked.
 */
export function LandingHeader({ audience }: { audience?: Audience }) {
  const { isWebMobile } = usePlatformLayout();
  const { data: session } = authClient.useSession();
  const home = AUDIENCES.find((item) => item.audience === audience)?.href ?? '/';

  return (
    <View style={[styles.header, isWebMobile && mobileStyles.header]}>
      <Link asChild href={home}>
        <Pressable accessibilityLabel="ogarnijmy.to, strona główna">
          <AuthLogo width={isWebMobile ? 160 : 216} height={isWebMobile ? 28 : 38} />
          {/* Hangs below the logo without making the header taller, as in the Figma frame. */}
          {audience === 'business' && (
            <Image
              accessibilityLabel=""
              source={businessWordmark}
              style={isWebMobile ? mobileStyles.wordmark : styles.wordmark}
            />
          )}
        </Pressable>
      </Link>

      <View style={styles.navigation}>
        {!isWebMobile && (
          <View style={styles.audiences}>
            {/* Every tab keeps room for the dot, so only the dot moves between the two pages. */}
            {AUDIENCES.map((item, index) => {
              const active = item.audience === audience;

              return (
                <View key={item.audience} style={[styles.audience, index > 0 && styles.audienceNext]}>
                  <View style={styles.activeDotBox}>{active && <View style={styles.activeDot} />}</View>
                  {active ? (
                    <Text style={styles.audienceActiveText}>{item.label}</Text>
                  ) : (
                    <Link href={item.href} style={styles.audienceInactiveText}>
                      {item.label}
                    </Link>
                  )}
                </View>
              );
            })}
          </View>
        )}
        {/* Signed-out visitors get the "Logowanie" button. */}
        {session ? (
          <Link asChild href="/app/account">
            {/* On web, Link hands the child's style to the <a> element, which can't take
                style arrays or functions, so the circle is drawn by an inner View. */}
            <Pressable accessibilityLabel="Profil">
              <View style={[styles.profileCircle, isWebMobile && mobileStyles.profileCircle]}>
                <PersonIcon width={24} height={24} />
              </View>
            </Pressable>
          </Link>
        ) : (
          <LandingLoginButton compact={isWebMobile} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Offsets from the business Figma frame, relative to the logo.
  wordmark: {
    position: 'absolute',
    top: 46,
    left: 73.5,
    width: 163.47,
    height: 24.72,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  audiences: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audience: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // With the dot box in front, this leaves Figma's 20px between the two labels.
  audienceNext: {
    marginLeft: -4,
  },
  activeDotBox: {
    width: 30,
    height: 30,
    marginRight: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E64F21',
  },
  audienceActiveText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  audienceInactiveText: {
    color: '#AAA5A2',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/** Narrow web screens: the audience switch is hidden and the logo shrinks. */
const mobileStyles = StyleSheet.create({
  header: {
    gap: 16,
  },
  // The desktop offsets scaled to the 160px logo.
  wordmark: {
    position: 'absolute',
    top: 34,
    left: 54.3,
    width: 120.7,
    height: 18.25,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
