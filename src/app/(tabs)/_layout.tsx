import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BusinessMenu } from '@/components/business-menu';
import { Colors } from '@/constants/theme';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';
import { findOwnPlace } from '@/lib/onboarding';

/**
 * The business app's sections, with Kalendarz at `/`; phones switch them with the bottom menu,
 * as in the client app. Businesses without a place (e.g. right after signing up) are sent to
 * onboarding first.
 */
export default function TabsLayout() {
  const { isWebDesktop } = usePlatformLayout();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { data: session } = authClient.useSession();
  const [hasPlace, setHasPlace] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;

    let active = true;

    findOwnPlace(userId)
      .then((place) => {
        if (active) setHasPlace(place !== null);
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
  }, [userId, attempt]);

  if (error) {
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
        {/* Signing out flips the root layout's guards, which sends the user back to login. */}
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

  if (hasPlace === null) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.text} size="large" />
      </SafeAreaView>
    );
  }

  if (!hasPlace) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      // Desktop web pages carry their own header menu instead.
      tabBar={(props) => (isWebDesktop ? null : <BusinessMenu {...props} />)}>
      <Tabs.Screen name="index" options={{ title: 'Kalendarz' }} />
      <Tabs.Screen name="clients" options={{ title: 'Klienci' }} />
      <Tabs.Screen name="employees" options={{ title: 'Pracownicy' }} />
      <Tabs.Screen name="sales" options={{ title: 'Sprzedaż' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
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
