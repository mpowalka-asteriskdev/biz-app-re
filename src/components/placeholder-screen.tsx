import { useIsFocused } from 'expo-router';
import { type ReactNode } from 'react';
import { ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BusinessHeader, type BusinessSection } from '@/components/business-header';
import { getBusinessMenuHeight } from '@/components/business-menu';
import { usePlaceholderScreenStyles } from '@/components/placeholder-screen.styles';
import { SiteFooter } from '@/components/site-footer';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

/** Temporary screen for menu sections that are not built yet (from the client app). */
export function PlaceholderScreen({ title, children }: { title: string; children?: ReactNode }) {
  const { width } = useWindowDimensions();
  const styles = usePlaceholderScreenStyles();
  const { isWebDesktop } = usePlatformLayout();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      // Desktop web has no bottom menu, so nothing to keep clear of.
      style={[styles.screen, !isWebDesktop && { paddingBottom: getBusinessMenuHeight(width) }]}>
      {isFocused && <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Ten widok jest w przygotowaniu.</Text>
      {children}
    </SafeAreaView>
  );
}

/** Desktop web page for a section without a design yet: header, a short note and the footer. */
export function DesktopPlaceholderScreen({
  section,
  title,
}: {
  section: BusinessSection;
  title: string;
}) {
  const styles = usePlaceholderScreenStyles();

  return (
    <ScrollView contentContainerStyle={styles.desktopScrollContent} style={styles.desktopScreen}>
      <BusinessHeader active={section} />
      <View style={styles.desktopContent}>
        <Text style={styles.desktopTitle}>{title}</Text>
        <Text style={styles.desktopDescription}>Ten widok jest w przygotowaniu.</Text>
      </View>
      <SiteFooter />
    </ScrollView>
  );
}
