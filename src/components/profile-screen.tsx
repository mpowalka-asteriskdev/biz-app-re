import { Image } from 'expo-image';
import { useIsFocused, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBusinessMenuHeight } from '@/components/business-menu';
import { useProfileScreenStyles } from '@/components/profile-screen.styles';
import { SignOutMenuButton } from '@/components/sign-out-menu';
import { Toggle } from '@/components/toggle';
import { PROFILE_SECTIONS } from '@/constants/profile-sections';
import { SAMPLE_PROFILE } from '@/constants/sample-profile';
import { authClient } from '@/lib/auth-client';

const backIcon = require('@/assets/app/back.svg');
const settingsIcon = require('@/assets/calendar/settings.svg');
const photo = require('@/assets/clients/client-photo.png');
const callIcon = require('@/assets/profile/call.svg');
const cakeIcon = require('@/assets/profile/cake.svg');
const visitIcon = require('@/assets/profile/visit.svg');
const locationIcon = require('@/assets/profile/location.svg');
const chevronIcon = require('@/assets/onboarding/chevron-right.svg');

/**
 * Profil tab ("User profile" in Figma, Android design, also used on mobile web). The name is the
 * signed-in user's; the rest is sample data. The design has no sign-out, so the settings icon
 * opens it. The rows with a chevron open sub menus (ProfileSectionScreen); the photo's "+" has no
 * design for what it opens.
 */
export function ProfileScreen() {
  const router = useRouter();
  const styles = useProfileScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();
  const { data: session } = authClient.useSession();
  const [reminder, setReminder] = useState(true);
  const visit = SAMPLE_PROFILE.upcomingVisit;

  return (
    <View style={styles.screen}>
      {isFocused && <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          // The last row ends clear of the bottom menu.
          paddingBottom: getBusinessMenuHeight(width),
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* The tabs go back to the first one, Kalendarz. */}
          <Pressable
            accessibilityLabel="Wstecz"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => router.back()}
            style={({ pressed }) => pressed && styles.pressed}>
            <Image accessibilityLabel="" source={backIcon} style={styles.headerIcon} />
          </Pressable>
          <SignOutMenuButton accessibilityLabel="Ustawienia">
            <Image accessibilityLabel="" source={settingsIcon} style={styles.headerIcon} />
          </SignOutMenuButton>
        </View>

        <View style={styles.summary}>
          <View>
            <Image accessibilityLabel="" contentFit="cover" source={photo} style={styles.photo} />
            <View style={styles.photoButton}>
              <Text style={styles.photoButtonLabel}>+</Text>
            </View>
          </View>
          <View>
            <Text style={styles.name}>{session?.user.name}</Text>
            <View style={styles.contactRows}>
              <View style={styles.contactRow}>
                <Image accessibilityLabel="" source={callIcon} style={styles.smallIcon} />
                <Text style={styles.contactText}>{SAMPLE_PROFILE.phone}</Text>
              </View>
              <View style={styles.contactRow}>
                <Image accessibilityLabel="" source={cakeIcon} style={styles.smallIcon} />
                <Text style={styles.contactText}>{SAMPLE_PROFILE.birthDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.upcomingLabel}>Nadchodząca wizyta</Text>
          <View style={styles.visitCard}>
            <View style={styles.visitWhen}>
              <View style={styles.visitTimeRow}>
                <Image accessibilityLabel="" source={visitIcon} style={styles.visitIcon} />
                <Text style={styles.visitTime}>{visit.time}</Text>
              </View>
              <Text style={styles.visitDate}>{visit.date}</Text>
            </View>
            <View style={styles.visitPlace}>
              <Text style={styles.visitPlaceName}>{visit.place}</Text>
              <View style={styles.visitAddressRow}>
                <Image accessibilityLabel="" source={locationIcon} style={styles.smallIcon} />
                <Text style={styles.visitAddress}>{visit.address}</Text>
              </View>
            </View>
          </View>

          <View style={styles.rows}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Przypomnienie o wizycie</Text>
              <Toggle label="Przypomnienie o wizycie" value={reminder} onChange={setReminder} />
            </View>
            {PROFILE_SECTIONS.map(({ slug, title }) => (
              <Pressable
                key={slug}
                accessibilityRole="button"
                onPress={() =>
                  router.push({ pathname: '/profile/[section]', params: { section: slug } })
                }
                style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
                <Text style={styles.rowLabel}>{title}</Text>
                <Image accessibilityLabel="" source={chevronIcon} style={styles.chevron} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
