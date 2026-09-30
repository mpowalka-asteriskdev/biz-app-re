import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { authClient } from '@/lib/auth-client';

/** Home screen after login; a placeholder until the app's own views are built. */
export default function HomeRoute() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { data: session } = authClient.useSession();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Zalogowano jako {session?.user.email}
      </Text>
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
