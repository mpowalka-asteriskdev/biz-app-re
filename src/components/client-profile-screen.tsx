import { Image } from 'expo-image';
import { useIsFocused, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBusinessMenuHeight } from '@/components/business-menu';
import { useClientsScreenStyles } from '@/components/clients-screen.styles';
import { Toggle } from '@/components/toggle';
import { SAMPLE_CLIENT_PROFILE } from '@/constants/sample-clients';

const backIcon = require('@/assets/app/back.svg');
const settingsIcon = require('@/assets/calendar/settings.svg');
const clientPhoto = require('@/assets/clients/client-photo.png');

/**
 * "Client profile page", opened from the Klienci list (Android design). The details are sample
 * data until the backend has clients; only the "Zaufany klient" switch responds, and only for
 * this visit. Settings and the photo's "+" have no designs for what they open.
 */
export function ClientProfileScreen({ name }: { name: string }) {
  const router = useRouter();
  const styles = useClientsScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();
  const profile = SAMPLE_CLIENT_PROFILE;
  const [trusted, setTrusted] = useState(profile.trusted);

  return (
    <View style={styles.screen}>
      {isFocused && <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          // The notes end clear of the bottom menu.
          paddingBottom: getBusinessMenuHeight(width),
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Pressable
            accessibilityLabel="Wstecz"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => router.back()}
            style={({ pressed }) => pressed && styles.pressed}>
            <Image accessibilityLabel="" source={backIcon} style={styles.backIcon} />
          </Pressable>
          <Image accessibilityLabel="" source={settingsIcon} style={styles.backIcon} />
        </View>

        <View style={styles.profileSummary}>
          <View>
            <Image accessibilityLabel="" contentFit="cover" source={clientPhoto} style={styles.photo} />
            <View style={styles.photoButton}>
              <Text style={styles.photoButtonLabel}>+</Text>
            </View>
          </View>
          <View>
            <Text style={styles.clientName}>{name}</Text>
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text style={styles.tagLabel}>Rabat {profile.discount}%</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagLabel}>Odwołania {profile.cancellations}%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <DetailRow label="Najbliższa wizyta" value={profile.nextVisit} />
          <DetailRow label="Stały rabat" value={`${profile.discount}%`} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Zaufany klient</Text>
            <Toggle label="Zaufany klient" value={trusted} onChange={setTrusted} />
          </View>

          <Text style={styles.sectionTitle}>Statystyki</Text>
          <View style={styles.sectionRows}>
            <DetailRow label="Wizyty" value={String(profile.visits)} />
            <DetailRow label="Nieobecności" value={String(profile.absences)} />
            <DetailRow label="Ostatnia wizyta" value={profile.lastVisit} />
            <DetailRow label="Całkowity przychód" value={profile.revenue} />
            <DetailRow label="Data dołączenia" value={profile.joined} />
          </View>

          <Text style={[styles.sectionTitle, styles.notesTitle]}>Notatki</Text>
          {profile.notes.map((note) => (
            <View key={note} style={styles.detailRow}>
              <Text style={styles.note}>{note}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const styles = useClientsScreenStyles();

  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}
