import { Image } from 'expo-image';
import { useIsFocused, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBusinessMenuHeight } from '@/components/business-menu';
import { useProfileScreenStyles } from '@/components/profile-screen.styles';
import { Toggle } from '@/components/toggle';
import type { ProfileSection } from '@/constants/profile-sections';
import { authClient } from '@/lib/auth-client';

const backIcon = require('@/assets/app/back.svg');
const chevronIcon = require('@/assets/onboarding/chevron-right.svg');

/**
 * Sub menu opened from a Profil row (Android and mobile web), in the Profil screen's style. Figma
 * has no designs for the sub menus: the options are placeholders, and the ones with a chevron
 * don't open anything yet. The switches respond for this visit only.
 */
export function ProfileSectionScreen({ section }: { section: ProfileSection }) {
  const router = useRouter();
  const styles = useProfileScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();
  const { data: session } = authClient.useSession();

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
          <Pressable
            accessibilityLabel="Wstecz"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => router.back()}
            style={({ pressed }) => pressed && styles.pressed}>
            <Image accessibilityLabel="" source={backIcon} style={styles.headerIcon} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{section.title}</Text>

          <View style={styles.sectionRows}>
            {section.options.map((option) =>
              option.kind === 'toggle' ? (
                <ToggleRow key={option.label} initial={option.initial} label={option.label} />
              ) : (
                <View key={option.label} style={styles.row}>
                  <Text style={styles.rowLabel}>{option.label}</Text>
                  {option.kind === 'link' ? (
                    <Image accessibilityLabel="" source={chevronIcon} style={styles.chevron} />
                  ) : (
                    <Text numberOfLines={1} style={styles.rowValue}>
                      {option.kind === 'account' ? session?.user[option.field] : option.value}
                    </Text>
                  )}
                </View>
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ToggleRow({ label, initial }: { label: string; initial: boolean }) {
  const styles = useProfileScreenStyles();
  const [value, setValue] = useState(initial);

  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Toggle label={label} value={value} onChange={setValue} />
    </View>
  );
}
