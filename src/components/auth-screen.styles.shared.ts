import { StyleSheet } from 'react-native';

/** Mobile design of the login/register screen (Android, mobile web, and iOS until it gets its own). */
export const sharedAuthScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#11110F',
  },
  // react-native-web sizes a required image to its file dimensions (e.g. 1500x1000), which
  // overrides `cover` and leaves the rest of wider screens empty.
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  // The photo itself is not darkened; the Figma frames lay 70% black over it.
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    gap: 72,
  },
  header: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  headerRow: {},
  // "w Twoim biznesie" under the logo, desktop only; offsets from the Figma frame.
  wordmark: {
    position: 'absolute',
    top: 40.55,
    left: 74.07,
    width: 162.93,
    height: 24.64,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  desktopNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  audienceActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E64F21',
  },
  audienceActiveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  audienceInactiveText: {
    color: '#AAA5A2',
    fontSize: 14,
    fontWeight: '700',
  },
  profileIcon: {
    width: 48,
    height: 48,
  },
  formWrap: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 594,
    gap: 14,
  },
  formWrapRegister: {
    marginBottom: 48,
  },
  headingBlock: {
    gap: 6,
    marginBottom: 8,
  },
  title: {
    color: '#F9F6F2',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  description: {
    color: '#F9F6F2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  fields: {
    gap: 12,
  },
  field: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E1DEDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(7, 8, 8, 0.16)',
  },
  // Only web highlights the focused field, in place of the browser's outline around the input.
  fieldFocused: {},
  input: {
    flex: 1,
    minHeight: 50,
    paddingVertical: 0,
    color: '#F9F6F2',
    fontSize: 15,
  },
  validBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
  },
  passwordHidden: {
    opacity: 0.6,
  },
  message: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#FFB4A0',
  },
  infoMessage: {
    color: '#F9F6F2',
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#E85012',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonLabel: {
    color: '#F9F6F2',
    fontSize: 15,
    fontWeight: '600',
  },
  routeSwitch: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  routeSwitchText: {
    color: '#D6D5D4',
    fontSize: 12,
    fontWeight: '300',
  },
  routeSwitchAccent: {
    color: '#F16B3F',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 4,
    backgroundColor: 'rgba(225, 222, 221, 0.82)',
  },
  socialButtons: {
    gap: 10,
  },
  socialButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E1DEDD',
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: 'rgba(7, 8, 8, 0.12)',
  },
  socialButtonLabel: {
    color: '#D6D5D4',
    fontSize: 15,
    fontWeight: '300',
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.58,
  },
});
