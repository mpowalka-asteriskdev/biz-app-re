import { Pressable, Text } from 'react-native';

import { CompanyProfileScreen } from '@/components/company-profile-screen';
import { PlaceholderScreen } from '@/components/placeholder-screen';
import { usePlaceholderScreenStyles } from '@/components/placeholder-screen.styles';
import { ProfileScreen } from '@/components/profile-screen';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';

export default function ProfileRoute() {
  const { isAndroid, isWebDesktop, isWebMobile } = usePlatformLayout();

  // Only the Android and desktop web layouts are designed so far; mobile web uses Android's.
  if (isAndroid || isWebMobile) return <ProfileScreen />;
  if (isWebDesktop) return <CompanyProfileScreen />;

  return <ProfilePlaceholder />;
}

function ProfilePlaceholder() {
  const styles = usePlaceholderScreenStyles();

  return (
    <PlaceholderScreen title="Profil">
      {/* iOS has no other way to sign out until its profile screen is designed. */}
      <Pressable
        accessibilityRole="button"
        onPress={() => authClient.signOut()}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonLabel}>Wyloguj się</Text>
      </Pressable>
    </PlaceholderScreen>
  );
}
