import { useIsFocused } from 'expo-router';
import { StatusBar, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAppMenuHeight } from '@/components/app-menu';
import { usePlaceholderScreenStyles } from '@/components/placeholder-screen.styles';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

/** Temporary screen for menu sections that are not built yet. */
export function PlaceholderScreen({ title }: { title: string }) {
  const { width } = useWindowDimensions();
  const styles = usePlaceholderScreenStyles();
  const { isWebDesktop } = usePlatformLayout();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      // Desktop web has the top menu instead of the bottom one, so nothing to keep clear of.
      style={[styles.screen, !isWebDesktop && { paddingBottom: getAppMenuHeight(width) }]}>
      {isFocused && <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Ten widok jest w przygotowaniu.</Text>
    </SafeAreaView>
  );
}
