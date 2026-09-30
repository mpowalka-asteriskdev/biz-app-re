import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CakeIcon,
  CalendarTickIcon,
  CallFilledIcon,
  ChevronRightIcon,
  LocationIcon,
  LogoutIcon,
  PlusIcon,
  SettingsIcon,
} from '@/components/account-icons';
import { useAccountScreenStyles } from '@/components/account-screen.styles';
import { getAppMenuHeight } from '@/components/app-menu';
import { BackArrowIcon, PersonIcon } from '@/components/auth-icons';
import { Toggle } from '@/components/toggle';
import { authClient } from '@/lib/auth-client';

// Placeholder visit from the Figma design until the visits API exists.
const UPCOMING_VISIT = {
  time: '12:30',
  date: '13.12.2025',
  place: 'BarBarber',
  address: 'Główna 69, Poznań',
};

// None of these has a screen yet.
const MENU_OPTIONS = ['Twoje dane', 'Wystawione opinie', 'Karty podarunkowe', 'Program lojalnościowy'];

/** Logged-in account screen of the mobile layout ("User profile" in Figma). */
export function AccountScreen() {
  const styles = useAccountScreenStyles();
  const { width } = useWindowDimensions();
  const { data: session } = authClient.useSession();
  const user = session?.user as
    | { name?: string; image?: string | null; phone?: string; birthDate?: string }
    | undefined;
  // Visit reminders aren't saved yet.
  const [visitReminder, setVisitReminder] = useState(true);

  function goBack() {
    if (router.canGoBack()) router.back();
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: getAppMenuHeight(width) + 24 }}>
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

        <View style={styles.profile}>
          <View>
            <View style={styles.avatar}>
              {user?.image ? (
                <Image
                  accessibilityLabel=""
                  contentFit="cover"
                  source={user.image}
                  style={styles.avatarImage}
                />
              ) : (
                <PersonIcon width={48} height={48} />
              )}
            </View>
            <View style={styles.avatarButton}>
              <PlusIcon />
            </View>
          </View>

          <View style={styles.profileDetails}>
            <Text style={styles.name}>{user?.name}</Text>
            <View style={styles.contactRows}>
              {user?.phone ? (
                <View style={styles.contactRow}>
                  <CallFilledIcon />
                  <Text style={styles.contactText}>{user.phone}</Text>
                </View>
              ) : null}
              {/* The account has no birth date yet; the row shows up once it does. */}
              {user?.birthDate ? (
                <View style={styles.contactRow}>
                  <CakeIcon />
                  <Text style={styles.contactText}>{user.birthDate}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionLabel}>Nadchodząca wizyta</Text>
          <View style={styles.visitCard}>
            <View style={styles.visitWhen}>
              <View style={styles.visitTime}>
                <CalendarTickIcon color="#E64F21" />
                <Text style={styles.visitTimeText}>{UPCOMING_VISIT.time}</Text>
              </View>
              <Text style={styles.visitDate}>{UPCOMING_VISIT.date}</Text>
            </View>

            <View style={styles.visitDetails}>
              <Text style={styles.visitPlace}>{UPCOMING_VISIT.place}</Text>
              <View style={styles.visitAddress}>
                <LocationIcon />
                <Text style={styles.visitAddressText}>{UPCOMING_VISIT.address}</Text>
              </View>
            </View>
          </View>

          <View style={styles.menu}>
            <View style={styles.menuItem}>
              <Text style={styles.menuLabel}>Przypomnienie o wizycie</Text>
              <Toggle
                label="Przypomnienie o wizycie"
                value={visitReminder}
                onChange={setVisitReminder}
              />
            </View>

            {MENU_OPTIONS.map((option) => (
              <Pressable
                key={option}
                accessibilityRole="button"
                style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
                <Text style={styles.menuLabel}>{option}</Text>
                <ChevronRightIcon color="#D6D5D4" />
              </Pressable>
            ))}

            {/* Not in the Figma design; kept so the app still has a way to sign out. */}
            <Pressable
              accessibilityRole="button"
              onPress={() => authClient.signOut()}
              style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
              <Text style={styles.menuLabel}>Wyloguj się</Text>
              <LogoutIcon />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
