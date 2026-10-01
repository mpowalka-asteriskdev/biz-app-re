import { StyleSheet } from 'react-native';

/** Temporary menu screens: the mobile design, and `desktop…` for desktop web. */
export const sharedPlaceholderScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    backgroundColor: '#11110F',
  },
  title: {
    color: '#F9F6F2',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  description: {
    color: '#D6D5D4',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
  // Temporary sign-out on the Profil tab, until the profile screen is designed.
  button: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#E64F21',
  },
  buttonLabel: {
    color: '#F9F6F2',
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.72,
  },

  // Desktop web: the business header and site footer around a light page (no Figma design).
  desktopScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  desktopScrollContent: {
    flexGrow: 1,
  },
  desktopContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 64,
    paddingVertical: 120,
  },
  desktopTitle: {
    color: '#201F1E',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  desktopDescription: {
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
});
