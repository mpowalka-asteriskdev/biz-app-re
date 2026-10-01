import { NavigationBar } from 'expo-navigation-bar';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';
import { authClient } from '@/lib/auth-client';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { data: session, isPending } = authClient.useSession();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Android: hide the system navigation bar; a swipe from the bottom edge shows it briefly.
          The app.json plugin does the same from launch, but plugins don't apply in Expo Go. */}
      <NavigationBar hidden />
      <AnimatedSplashOverlay />
      {isPending ? (
        <View style={[styles.loading, { backgroundColor: colors.background }]}>
          <ActivityIndicator color={colors.text} size="large" />
        </View>
      ) : (
        // iOS: the home indicator fades out after a few seconds without touches.
        <Stack screenOptions={{ headerShown: false, autoHideHomeIndicator: true }}>
          {/* Signed-out users land on the first available screen, which is login. */}
          <Stack.Protected guard={!!session}>
            {/* Client accounts (e.g. from the client app) only get onboarding, which makes them
                business accounts. The tabs (Kalendarz is `/`) also send businesses without a
                place there. */}
            <Stack.Protected guard={session?.user.accountType === 'business'}>
              <Stack.Screen name="(tabs)" />
              {/* Forms opened with "+"; they cover the tabs, without the bottom menu. */}
              <Stack.Screen name="clients/new" />
              <Stack.Screen name="visits/new" />
            </Stack.Protected>
            <Stack.Screen name="onboarding" />
          </Stack.Protected>

          <Stack.Protected guard={!session}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
          </Stack.Protected>
        </Stack>
      )}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
