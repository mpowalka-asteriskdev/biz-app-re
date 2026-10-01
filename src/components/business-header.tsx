import { Image } from 'expo-image';
import { type Href, Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { AuthLogo } from '@/components/auth-icons';
import { useBusinessHeaderStyles } from '@/components/business-header.styles';
import { SignOutMenuButton } from '@/components/sign-out-menu';

const profileIcon = require('@/assets/app/profile-circle.svg');

export type BusinessSection = 'calendar' | 'clients' | 'employees' | 'sales' | 'profile';

const SECTIONS: { key: BusinessSection; label: string; href: Href }[] = [
  { key: 'calendar', label: 'Kalendarz', href: '/' },
  { key: 'clients', label: 'Klienci', href: '/clients' },
  { key: 'employees', label: 'Pracownicy', href: '/employees' },
  { key: 'sales', label: 'Sprzedaż', href: '/sales' },
  { key: 'profile', label: 'Profil', href: '/profile' },
];

/**
 * Dark header of the business app's desktop pages: logo (back to Kalendarz, at `/`), profile
 * button (with sign-out) and the menu. The two buttons have no desktop forms yet, so they do
 * nothing yet.
 */
export function BusinessHeader({ active }: { active: BusinessSection }) {
  const styles = useBusinessHeaderStyles();

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Link href="/" asChild>
          <Pressable accessibilityLabel="Kalendarz" accessibilityRole="link">
            <AuthLogo width={216} height={38} />
          </Pressable>
        </Link>
        <SignOutMenuButton accessibilityLabel="Profil">
          <Image accessibilityLabel="" source={profileIcon} style={styles.profileIcon} />
        </SignOutMenuButton>
      </View>

      <View style={styles.navigation}>
        {SECTIONS.map(({ key, label, href }) => (
          <Link
            key={key}
            href={href}
            style={[styles.navigationItem, key === active && styles.navigationItemActive]}>
            {label}
          </Link>
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
