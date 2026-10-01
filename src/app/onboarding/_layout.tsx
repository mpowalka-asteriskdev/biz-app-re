import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { OnboardingProvider } from '@/components/onboarding-context';
import { OnboardingButton } from '@/components/onboarding-screen';
import { authClient } from '@/lib/auth-client';
import { findOwnPlace } from '@/lib/onboarding';

/** Registration steps that create the user's place; they share their answers. */
export default function OnboardingLayout() {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const [hasPlace, setHasPlace] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  // The steps create a place, so users who already have one (e.g. after going back in the
  // browser history from home) are sent home instead of creating a second one.
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
      <View style={styles.screen}>
        <Text style={styles.error}>{error}</Text>
        <OnboardingButton
          label="Spróbuj ponownie"
          onPress={() => {
            setError(null);
            setAttempt((count) => count + 1);
          }}
        />
        <OnboardingButton label="Wyloguj się" onPress={() => authClient.signOut()} />
      </View>
    );
  }

  if (hasPlace === null) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color="#AAA5A2" size="large" />
      </View>
    );
  }

  if (hasPlace) {
    return <Redirect href="/" />;
  }

  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 25,
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: '#E64F21',
    fontSize: 15,
    textAlign: 'center',
  },
});
