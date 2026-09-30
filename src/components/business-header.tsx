import { Image } from 'expo-image';
import { type Href, Link } from 'expo-router';
import { Text, View } from 'react-native';

import { AuthLogo } from '@/components/auth-icons';
import { useBusinessHeaderStyles } from '@/components/business-header.styles';
import { SignOutMenuButton } from '@/components/sign-out-menu';

const profileIcon = require('@/assets/app/profile-circle.svg');

export type BusinessSection = 'calendar' | 'clients' | 'employees' | 'sales' | 'profile';

// Only sections with a desktop page link anywhere.
const SECTIONS: { key: BusinessSection; label: string; href?: Href }[] = [
  { key: 'calendar', label: 'Kalendarz', href: '/calendar' },
  { key: 'clients', label: 'Klienci' },
  { key: 'employees', label: 'Pracownicy' },
  { key: 'sales', label: 'Sprzedaż' },
  { key: 'profile', label: 'Profil', href: '/profile' },
];

/**
 * Dark header of the business app's desktop pages: logo, profile button (with sign-out) and the
 * menu. Only Kalendarz and Profil have desktop pages so far, so the other entries and the two
 * buttons do nothing yet.
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
        {SECTIONS.map(({ key, label, href }) => {
          const style = [styles.navigationItem, key === active && styles.navigationItemActive];

          return href ? (
            <Link key={key} href={href} style={style}>
              {label}
            </Link>
          ) : (
            <Text key={key} style={style}>
              {label}
            </Text>
          );
        })}
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
