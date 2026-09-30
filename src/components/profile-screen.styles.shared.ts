import { StyleSheet } from 'react-native';

const MUTED = '#AAA5A2';
const FAINT = '#D6D5D4';

/** Profil tab ("User profile" in Figma); only the Android design exists so far. */
export const sharedProfileScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  headerIcon: {
    width: 36,
    height: 36,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 33,
    marginTop: 31,
    paddingLeft: 35,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  // Sits over the photo's lower right edge.
  photoButton: {
    position: 'absolute',
    left: 58,
    top: 61,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  photoButtonLabel: {
    color: '#F9F6F2',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '600',
  },
  name: {
    marginTop: 14,
    color: '#000000',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  contactRows: {
    gap: 7,
    marginTop: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  smallIcon: {
    width: 12,
    height: 12,
  },
  contactText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
  },
  content: {
    paddingHorizontal: 25,
  },
  upcomingLabel: {
    marginTop: 52,
    color: MUTED,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
  },
  visitCard: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 43,
    marginTop: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 4px 2px rgba(0, 0, 0, 0.08)',
  },
  visitWhen: {
    width: 58,
  },
  visitTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  visitIcon: {
    width: 18,
    height: 18,
  },
  visitTime: {
    color: '#E64F21',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
  },
  visitDate: {
    color: FAINT,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
  },
  visitPlace: {
    flex: 1,
    gap: 3,
  },
  visitPlaceName: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  visitAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  visitAddress: {
    color: FAINT,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
  },
  rows: {
    marginTop: 40,
  },
  row: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  rowLabel: {
    color: MUTED,
    fontSize: 15,
    fontWeight: '400',
  },
  chevron: {
    width: 24,
    height: 24,
  },
  pressed: {
    opacity: 0.72,
  },
});
