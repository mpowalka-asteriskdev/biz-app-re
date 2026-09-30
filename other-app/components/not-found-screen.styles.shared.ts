import { StyleSheet } from 'react-native';

/** Mobile design of the 404 page (no Figma frame exists for it). */
export const sharedNotFoundScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Web only: dark band behind the landing header.
  headerBand: {
    backgroundColor: '#11110F',
  },
  headerContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1352,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 72,
  },
  code: {
    color: '#E64F21',
    fontSize: 88,
    lineHeight: 96,
    fontWeight: '700',
  },
  title: {
    color: '#201F1E',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    maxWidth: 520,
    color: '#AAA5A2',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    textAlign: 'center',
  },
  // Orange pill like the landing "Logowanie" button.
  button: {
    marginTop: 20,
    height: 50,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  buttonText: {
    color: '#F9F6F2',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  },
});
