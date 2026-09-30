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
          {/* Web: landing page. Native: redirects straight into the app. */}
          <Stack.Screen name="index" />

          {/* The app itself lives under /app so web can keep / for the landing page. */}
          <Stack.Screen name="app/(tabs)" />

          <Stack.Protected guard={!session}>
            <Stack.Screen name="app/register" />
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
