import { Platform, Pressable, Text } from 'react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { usePlaceholderScreenStyles } from '@/components/placeholder-screen.styles';
import { ProfileScreen } from '@/components/profile-screen';
import { authClient } from '@/lib/auth-client';

export default function ProfileRoute() {
  // Only the Android layout is designed so far.
  return Platform.OS === 'android' ? <ProfileScreen /> : <ProfilePlaceholder />;
}

function ProfilePlaceholder() {
  const styles = usePlaceholderScreenStyles();

  return (
    <PlaceholderScreen title="Profil">
      {/* Web phones have no other way to sign out until their profile screen is designed. */}
      <Pressable
        accessibilityRole="button"
        onPress={() => authClient.signOut()}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonLabel}>Wyloguj się</Text>
      </Pressable>
    </PlaceholderScreen>
  );
}
