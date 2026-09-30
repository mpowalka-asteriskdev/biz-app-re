import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { AuthLogo } from '@/components/auth-icons';
import { useBusinessHeaderStyles } from '@/components/business-header.styles';
import { SignOutMenuButton } from '@/components/sign-out-menu';

const profileIcon = require('@/assets/app/profile-circle.svg');

export type BusinessSection = 'calendar' | 'clients' | 'employees' | 'sales' | 'profile';

const SECTIONS: { key: BusinessSection; label: string }[] = [
  { key: 'calendar', label: 'Kalendarz' },
  { key: 'clients', label: 'Klienci' },
  { key: 'employees', label: 'Pracownicy' },
  { key: 'sales', label: 'Sprzedaż' },
  { key: 'profile', label: 'Profil' },
];

/**
 * Dark header of the business app's desktop pages: logo, profile button (with sign-out) and the
 * menu. Only the calendar exists so far, so the other entries and the two buttons do nothing yet.
 */
export function BusinessHeader({ active }: { active: BusinessSection }) {
  const styles = useBusinessHeaderStyles();

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <AuthLogo width={216} height={38} />
        <SignOutMenuButton accessibilityLabel="Profil">
          <Image accessibilityLabel="" source={profileIcon} style={styles.profileIcon} />
        </SignOutMenuButton>
      </View>

      <View style={styles.navigation}>
        {SECTIONS.map((section) => (
          <Text
            key={section.key}
            style={[styles.navigationItem, section.key === active && styles.navigationItemActive]}>
            {section.label}
          </Text>
        ))}
        <View style={styles.navigationButton}>
          <Text style={styles.navigationButtonLabel}>Dodaj wizytę</Text>
        </View>
        <View style={styles.navigationButton}>
          <Text style={styles.navigationButtonLabel}>Dodaj klienta</Text>
        </View>
      </View>
    </View>
  );
}
