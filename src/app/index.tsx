import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { authClient } from '@/lib/auth-client';
import { findOwnPlace } from '@/lib/onboarding';

/**
 * Where sign-in returns to for business accounts: with a place they go on to the calendar,
 * without one to onboarding.
 */
export default function HomeRoute() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { data: session } = authClient.useSession();
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;

    let active = true;

    findOwnPlace(userId)
      .then((place) => {
        if (active) router.replace(place ? '/calendar' : '/onboarding');
      })
      .catch((checkError: unknown) => {
        if (active) {
          setError(
            checkError instanceof Error ? checkError.message : 'Nie udało się wczytać danych firmy.',
          );
        }
      });

    return () => {
      active = false;
    };
  }, [userId, attempt, router]);

  if (!error) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.text} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>{error}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          setError(null);
          setAttempt((count) => count + 1);
        }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.backgroundElement },
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.text, { color: colors.text }]}>Spróbuj ponownie</Text>
      </Pressable>
      {/* Signing out flips the layout's guards, which sends the user back to login. */}
      <Pressable
        accessibilityRole="button"
        onPress={() => authClient.signOut()}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.backgroundElement },
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.text, { color: colors.text }]}>Wyloguj się</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
