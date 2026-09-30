import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFormScreenStyles } from '@/components/form-screen.styles';

const backIcon = require('@/assets/app/back.svg');
const arrowDownIcon = require('@/assets/app/arrow-down.svg');

/**
 * Full-screen form opened with a "+": back arrow and title, bordered fields, and "Zatwierdź"
 * at the bottom. The bottom menu is hidden while it's open.
 */
export function FormScreen({
  title,
  largeTitle = false,
  onSubmit,
  children,
}: {
  title: string;
  /** "New visit" has a 24px title, "Add new client" a 20px one. */
  largeTitle?: boolean;
  onSubmit: () => void;
  children: ReactNode;
}) {
  const router = useRouter();
  const styles = useFormScreenStyles();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Text style={[styles.title, largeTitle && styles.titleLarge]}>{title}</Text>
        <Pressable
          accessibilityLabel="Wstecz"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Image accessibilityLabel="" source={backIcon} style={styles.backIcon} />
        </Pressable>
      </View>

      <View style={styles.fields}>{children}</View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 34) }]}>
        <Pressable
          accessibilityRole="button"
          onPress={onSubmit}
          style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}>
          <Text style={styles.submitButtonLabel}>Zatwierdź</Text>
        </Pressable>
      </View>
    </View>
  );
}

/** One bordered row: the orange icon, the field itself (an input or a label) and the chevron. */
export function FormField({ icon, children }: { icon: number; children: ReactNode }) {
  const styles = useFormScreenStyles();

  return (
    <View style={styles.field}>
      <Image accessibilityLabel="" source={icon} style={styles.fieldIcon} />
      {children}
      <Image accessibilityLabel="" source={arrowDownIcon} style={styles.fieldIcon} />
    </View>
  );
}
