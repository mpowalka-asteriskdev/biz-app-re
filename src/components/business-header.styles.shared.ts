import { StyleSheet } from 'react-native';

const BUTTON_SHADOW = '0px 4px 2.9px rgba(0, 0, 0, 0.15)';

/** Header of the business app's pages; desktop web design ("Calendar desktop" in Figma). */
export const sharedBusinessHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#201F1E',
    paddingTop: 39,
    paddingBottom: 21,
    paddingHorizontal: 64,
  },
  // Same width as the page content below it.
  topRow: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1226,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileIcon: {
    width: 48,
    height: 48,
  },
  navigation: {
    height: 45,
    marginTop: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 43,
    paddingHorizontal: 25,
  },
  navigationItem: {
    color: '#AAA5A2',
    fontSize: 20,
    fontWeight: '700',
  },
  navigationItemActive: {
    color: '#F9F6F2',
  },
  navigationButton: {
    width: 160,
    height: 35,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: BUTTON_SHADOW,
  },
  navigationButtonLabel: {
    color: '#F9F6F2',
    fontSize: 16,
    fontWeight: '700',
  },
});
