import { StyleSheet } from 'react-native';

const TEXT = '#201F1E';

/**
 * Full-screen forms opened with a "+" ("Add new client" and "New visit" in Figma); only the
 * Android design exists so far.
 */
export const sharedFormScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 46,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 30,
  },
  backIcon: {
    width: 36,
    height: 36,
  },
  title: {
    position: 'absolute',
    top: 4,
    right: 35,
    color: TEXT,
    fontSize: 20,
    lineHeight: 38,
    fontWeight: '700',
  },
  titleLarge: {
    fontSize: 24,
  },
  fields: {
    gap: 15,
    marginTop: 46,
    paddingHorizontal: 27,
  },
  field: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 10,
    paddingRight: 18,
    borderWidth: 1,
    borderColor: '#AAA5A2',
    borderRadius: 10,
  },
  fieldIcon: {
    width: 20,
    height: 20,
  },
  // Used both by text inputs and by plain labels.
  fieldText: {
    flex: 1,
    paddingVertical: 0,
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 27,
  },
  submitButton: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEXT,
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  submitButtonLabel: {
    color: '#F9F6F2',
    fontSize: 20,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.72,
  },
});
