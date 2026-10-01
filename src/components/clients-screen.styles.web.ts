import { StyleSheet } from 'react-native';

import { sharedClientsScreenStyles } from '@/components/clients-screen.styles.shared';

/** Mobile web uses the Android design ("Clients list" in Figma); desktop web has its own page. */
const webStyles = StyleSheet.create({
  ...sharedClientsScreenStyles,
  // Web has no status bar inset; this keeps the gap Android has above the search.
  search: {
    ...sharedClientsScreenStyles.search,
    marginTop: 24,
  },
  // The browser outlines only the inner <input>; the field has its own border.
  searchInput: {
    ...sharedClientsScreenStyles.searchInput,
    outlineWidth: 0,
  },
});

export function useClientsScreenStyles() {
  return webStyles;
}
