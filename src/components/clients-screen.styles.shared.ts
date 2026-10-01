import { StyleSheet } from 'react-native';

const TEXT = '#201F1E';
const MUTED = '#AAA5A2';

/** Klienci screen ("Clients list" in Figma); the Android design, also used on mobile web. */
export const sharedClientsScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 25,
  },
  search: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: MUTED,
    borderRadius: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    color: TEXT,
    fontSize: 14,
    fontWeight: '500',
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
  },
  // "SegmentedPicker" from the iOS kit in Figma.
  picker: {
    height: 32,
    flexDirection: 'row',
    marginTop: 19,
    padding: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
  },
  pickerOption: {
    flex: 1,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  pickerOptionSelected: {
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.12), 0px 3px 0.5px rgba(0, 0, 0, 0.04)',
  },
  pickerLabel: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
  },
  pickerLabelSelected: {
    fontWeight: '600',
  },
  title: {
    height: 45,
    marginTop: 22,
    color: TEXT,
    fontSize: 20,
    lineHeight: 45,
    fontWeight: '700',
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
    fontWeight: '300',
  },
  chevron: {
    width: 24,
    height: 24,
  },
  addClientButton: {
    position: 'absolute',
    right: 39,
    bottom: 88,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  addClientButtonLabel: {
    color: '#F9F6F2',
    fontSize: 24,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.72,
  },

  // Back arrow and settings icon of the client profile.
  backIcon: {
    width: 36,
    height: 36,
  },

  // "Client profile page".
  profileHeader: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 33,
    marginTop: 21,
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
    fontSize: 20,
    fontWeight: '600',
  },
  clientName: {
    color: TEXT,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  tags: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 9,
  },
  tag: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#B4340D',
    borderRadius: 5,
    backgroundColor: 'rgba(230, 79, 33, 0.2)',
  },
  tagLabel: {
    color: '#B4340D',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  details: {
    marginTop: 22,
    paddingHorizontal: 31,
  },
  detailRow: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  detailLabel: {
    color: MUTED,
    fontSize: 15,
    fontWeight: '300',
  },
  detailValue: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionTitle: {
    height: 45,
    marginTop: 23,
    paddingLeft: 3,
    color: TEXT,
    fontSize: 20,
    lineHeight: 45,
    fontWeight: '700',
  },
  // Figma leaves 16px above Notatki instead of 23.
  notesTitle: {
    marginTop: 16,
  },
  // The Statystyki title's row ends 3px above its first row.
  sectionRows: {
    marginTop: 3,
  },
  note: {
    color: MUTED,
    fontSize: 15,
    fontWeight: '400',
  },
});
