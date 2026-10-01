import { StyleSheet } from 'react-native';

const TEXT = '#201F1E';
const MUTED = '#AAA5A2';
const ACCENT = '#E64F21';
const DIVIDER = '#EBEBEB';
const BUTTON_SHADOW = '0px 4px 2.9px rgba(0, 0, 0, 0.15)';

/**
 * Desktop Klienci and Pracownicy pages ("Clients desktop" and "Staff desktop" in Figma): a list
 * panel on the left and the selected person's details on the right.
 */
export const sharedDirectoryPageStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 64,
    paddingTop: 57,
    paddingBottom: 64,
  },
  // Same width as the header's logo row.
  columns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1226,
  },
  pressed: {
    opacity: 0.72,
  },

  // List panel: search, the page's controls, the list and the add button.
  panel: {
    width: 382,
  },
  panelCard: {
    height: 608,
    paddingTop: 19,
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
  },
  search: {
    height: 54,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: MUTED,
    borderRadius: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  // The browser outlines only the inner <input>; the field has its own border.
  searchInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    color: TEXT,
    fontSize: 14,
    fontWeight: '500',
    outlineWidth: 0,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT,
  },
  // Klienci: the Lista / Grupy klientów switch.
  picker: {
    height: 32,
    marginTop: 25,
    marginHorizontal: 20,
    flexDirection: 'row',
    padding: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
  },
  pickerOption: {
    flex: 1,
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
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: -0.08,
  },
  pickerLabelSelected: {
    fontWeight: '600',
  },
  // Pracownicy: the filter switch.
  filterRow: {
    width: 300,
    height: 65,
    marginTop: 18,
    marginLeft: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  filterLabel: {
    color: MUTED,
    fontSize: 15,
    fontWeight: '300',
  },
  // At the same place on both pages, whatever the controls above it; it scrolls on its own.
  // Wider than its 300px rows, so the scrollbar sits clear of the arrows.
  list: {
    position: 'absolute',
    top: 153,
    left: 38,
    width: 330,
    height: 453,
  },
  listContent: {
    width: 300,
  },
  listRow: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: MUTED,
  },
  listName: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },
  listNameSelected: {
    color: ACCENT,
    fontWeight: '700',
  },
  listLetter: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '700',
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowSelected: {
    borderRadius: 5,
    backgroundColor: ACCENT,
  },
  panelButton: {
    height: 50,
    marginTop: 23,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEXT,
    boxShadow: BUTTON_SHADOW,
  },
  panelButtonLabel: {
    color: '#F9F6F2',
    fontSize: 20,
    fontWeight: '600',
  },

  // Details of the selected person.
  details: {
    flex: 1,
    minWidth: 0,
  },
  photoButton: {
    position: 'absolute',
    left: 58,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT,
    boxShadow: BUTTON_SHADOW,
  },
  photoButtonLabel: {
    color: '#F9F6F2',
  },
  editIcon: {
    width: 24,
    height: 24,
  },

  // Klienci.
  clientDetails: {
    marginLeft: 56,
  },
  clientSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 33,
    marginLeft: 4,
  },
  clientPhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  clientPhotoButton: {
    top: 61,
  },
  clientPhotoButtonLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
  clientName: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '700',
  },
  tags: {
    flexDirection: 'row',
    gap: 13,
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
    fontWeight: '200',
  },
  clientRows: {
    marginTop: 22,
  },
  clientRow: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  rowLabel: {
    color: MUTED,
    fontSize: 15,
    fontWeight: '300',
  },
  clientValue: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionTitle: {
    height: 45,
    marginTop: 13,
    marginBottom: 3,
    paddingLeft: 3,
    color: TEXT,
    fontSize: 20,
    lineHeight: 45,
    fontWeight: '700',
  },
  notesTitle: {
    marginTop: 26,
    paddingLeft: 3,
    color: TEXT,
    fontSize: 20,
    fontWeight: '700',
  },
  note: {
    marginTop: 21,
    paddingLeft: 3,
    color: MUTED,
    fontSize: 15,
    fontWeight: '400',
  },

  // Pracownicy.
  employeeDetails: {
    marginLeft: 71,
  },
  employeeSummary: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  employeePhoto: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  employeePhotoButton: {
    top: 59,
  },
  employeePhotoButtonLabel: {
    fontSize: 24,
    fontWeight: '700',
  },
  employeeName: {
    marginTop: 1,
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  employeeRole: {
    marginTop: 5,
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
  },
  employeeRows: {
    marginTop: 23,
  },
  employeeRow: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  // The value sits centred between the label and the edit icon.
  employeeFieldLabel: {
    width: 520,
    flexShrink: 1,
  },
  employeeValue: {
    flex: 1,
    color: MUTED,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  deleteLabel: {
    flex: 1,
  },
});
