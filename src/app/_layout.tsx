import { NavigationBar } from 'expo-navigation-bar';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';

SplashScreen.preventAutoHideAsync();

// Web has no status bar, so on phone-sized web the screens would start right at the top edge.
// This gap takes the status bar's place.
const WEB_MOBILE_TOP_GAP = 24;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { data: session, isPending } = authClient.useSession();
  const { isWebMobile } = usePlatformLayout();
  const insets = useSafeAreaInsets();
  // Only business accounts get in. Any other session (e.g. a client account from the client app)
  // stays on login, which signs it out.
  const isSignedIn = session?.user.accountType === 'business';

  return (
    // Screens keep clear of the top with the safe area (SafeAreaView or useSafeAreaInsets), so a
    // larger top inset moves every screen down on mobile web.
    <SafeAreaInsetsContext.Provider
      value={isWebMobile ? { ...insets, top: insets.top + WEB_MOBILE_TOP_GAP } : insets}>
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
            <Stack.Protected guard={isSignedIn}>
              {/* The tabs (Kalendarz is `/`) send accounts without a place to onboarding. */}
              <Stack.Screen name="(tabs)" />
              {/* Forms opened with "+"; they cover the tabs, without the bottom menu. */}
              <Stack.Screen name="clients/new" />
              <Stack.Screen name="visits/new" />
              <Stack.Screen name="onboarding" />
            </Stack.Protected>

            <Stack.Protected guard={!isSignedIn}>
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
            </Stack.Protected>
          </Stack>
        )}
      </ThemeProvider>
    </SafeAreaInsetsContext.Provider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
