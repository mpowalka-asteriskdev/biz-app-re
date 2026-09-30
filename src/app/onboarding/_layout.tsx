import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { OnboardingProvider } from '@/components/onboarding-context';
import { OnboardingButton } from '@/components/onboarding-screen';
import { authClient } from '@/lib/auth-client';
import { findOwnPlace, switchToBusinessAccount } from '@/lib/onboarding';

/**
 * Registration steps that create the user's place; they share their answers. It's the only
 * screen a client account gets in this app: creating the place makes it a business account.
 */
export default function OnboardingLayout() {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const isBusiness = session?.user.accountType === 'business';
  // The company step switches the account mid-flow; that must not re-run the check below.
  const [wasBusiness] = useState(isBusiness);
  const [hasPlace, setHasPlace] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  // The steps create a place, so users who already have one (e.g. after going back in the
  // browser history from home) are sent home instead of creating a second one.
  useEffect(() => {
    if (!userId) return;

    let active = true;

    findOwnPlace(userId)
      .then(async (place) => {
        // A client account that already owns a place (e.g. switching it failed after the
        // company step) only needs the switch; home stays closed to it until then.
        if (place && !wasBusiness) {
          await switchToBusinessAccount();
        }

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
  }, [userId, wasBusiness, attempt]);

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

  // After a switch, home opens only once the session shows the business account.
  if (hasPlace === null || (hasPlace && !isBusiness)) {
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
