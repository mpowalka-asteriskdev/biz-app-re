import { StyleSheet } from 'react-native';

const ACCENT = '#E64F21';
const TEXT = '#201F1E';
const MUTED = '#AAA5A2';
const DIVIDER = '#EBEBEB';
const BUTTON_SHADOW = '0px 4px 2.9px rgba(0, 0, 0, 0.15)';

/**
 * Registration steps and their popups: "Branch" frames (mobile design) and "Company details
 * register" frames (desktop web, the `desktop…` styles).
 */
export const sharedOnboardingStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Desktop web page: dark header, a centred column and the site footer.
  desktopPage: {
    flexGrow: 1,
  },
  desktopHeader: {
    backgroundColor: TEXT,
    paddingTop: 39,
    paddingBottom: 27,
    paddingHorizontal: 64,
  },
  desktopTopRow: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1226,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desktopProfileIcon: {
    width: 48,
    height: 48,
  },
  // Just under the logo row, centred.
  desktopSteps: {
    alignSelf: 'center',
    marginTop: -1,
  },
  desktopBody: {
    flexGrow: 1,
    paddingHorizontal: 64,
  },
  desktopContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 786,
    paddingTop: 91,
    paddingBottom: 96,
  },
  desktopHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  desktopHeadingIcon: {
    width: 32,
    height: 29.23,
  },
  desktopHeadingText: {
    color: '#000000',
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '700',
  },
  // The button keeps its 339px maximum width, on the left.
  desktopFooter: {
    alignItems: 'flex-start',
    gap: 10,
  },

  column: {
    flex: 1,
    width: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Centred on the whole row rather than next to the back button.
  stepsBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  steps: {
    width: 92,
    height: 13,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 24,
  },
  title: {
    marginTop: 28,
    color: TEXT,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  description: {
    marginTop: 6,
    color: TEXT,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  footer: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 25,
    paddingTop: 12,
  },
  message: {
    color: ACCENT,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 339,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: BUTTON_SHADOW,
  },
  buttonDark: {
    backgroundColor: TEXT,
  },
  buttonAccent: {
    backgroundColor: ACCENT,
  },
  buttonLabel: {
    color: '#F9F6F2',
    fontSize: 20,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.72,
  },

  // Loading and error states inside a step's content.
  stepMessage: {
    marginTop: 24,
  },
  stepLoading: {
    marginTop: 32,
  },

  // Step 1: industry list, inset from the text above it.
  industryList: {
    marginTop: 15,
    marginHorizontal: 22,
  },
  industryRow: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  industryLabel: {
    color: MUTED,
    fontSize: 15,
    fontWeight: '300',
  },
  industryLabelSelected: {
    color: TEXT,
  },
  chevron: {
    width: 24,
    height: 24,
  },

  // Step 2: company details and consents.
  fields: {
    marginTop: 35,
    gap: 16,
  },
  field: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: MUTED,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  // Only web highlights the focused field, in place of the browser's outline around the input.
  fieldFocused: {},
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },
  fieldText: {
    flex: 1,
    color: MUTED,
    fontSize: 15,
    fontWeight: '300',
  },
  // Sits at the bottom of the scroll area when the screen is tall enough.
  consents: {
    marginTop: 'auto',
    paddingTop: 40,
  },
  checkboxRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
  },
  checkboxRowNested: {
    marginLeft: 12,
  },
  checkboxLabel: {
    flexShrink: 1,
    color: MUTED,
    fontSize: 15,
    fontWeight: '300',
  },

  // Step 3: profile switches.
  profileList: {
    marginTop: 32,
  },
  profileRow: {
    minHeight: 83,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  profileText: {
    flex: 1,
  },
  profileTitle: {
    color: MUTED,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  profileDescription: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '200',
  },

  // Step 4: opening hours.
  hoursList: {
    marginTop: 33,
  },
  hoursRow: {
    height: 59,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  hoursDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 27,
  },
  hoursDay: {
    width: 123,
    color: MUTED,
    fontSize: 15,
    fontWeight: '300',
  },
  hoursRange: {
    flex: 1,
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },

  // Popups.
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.11)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  hoursCard: {
    alignSelf: 'center',
    width: 335,
    maxWidth: '92%',
    minHeight: 260,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 76,
  },
  hoursCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingLeft: 14,
  },
  hoursCardTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '700',
  },
  // Top-aligned, so an open time list grows the row downwards without moving the labels.
  timeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    marginTop: 25,
    paddingLeft: 22,
  },
  // Lines up with the text inside the time boxes (border + vertical padding).
  timeLabel: {
    paddingTop: 9,
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },
  timeSelect: {
    width: 93,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D6D5D4',
    borderRadius: 5,
  },
  timeSelectIcon: {
    width: 16,
    height: 16,
    transform: [{ rotate: '90deg' }],
  },
  timeValue: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },
  // Opens in the layout rather than floating: Android ignores touches outside a view's parent.
  timeOptions: {
    width: 93,
    maxHeight: 136,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D6D5D4',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  timeOption: {
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  timeOptionText: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'right',
  },
  timeOptionSelected: {
    color: ACCENT,
  },
  sameHoursRow: {
    marginTop: 7,
    paddingLeft: 20,
  },
  addButton: {
    position: 'absolute',
    right: 21,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT,
    boxShadow: BUTTON_SHADOW,
  },
  addButtonLabel: {
    color: '#F9F6F2',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '600',
  },
  overlayCentered: {
    justifyContent: 'center',
  },
  // Sits 33px above the centre, as in the Figma frame.
  map: {
    alignSelf: 'center',
    borderRadius: 23,
    overflow: 'hidden',
    transform: [{ translateY: -33 }],
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  // The pin's tip marks the centre of the map.
  mapPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    marginTop: -37,
    marginLeft: -20,
  },
  mapButton: {
    position: 'absolute',
    bottom: 33,
    left: '50%',
    marginLeft: -75,
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEXT,
    boxShadow: BUTTON_SHADOW,
  },
});
