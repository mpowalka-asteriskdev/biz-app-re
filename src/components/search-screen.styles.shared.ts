import { StyleSheet } from 'react-native';

/** Mobile design of the "Szukamy" tab ("Main screen" in Figma). */
export const sharedSearchScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // The top inset is added in the component, so the header photo also fills the status bar.
  header: {
    overflow: 'hidden',
    paddingHorizontal: 22,
    paddingBottom: 25,
  },
  headerImage: {
    position: 'absolute',
    top: -9.5,
    left: -73,
    width: 540,
    height: 368.5,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  headerBar: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 8,
  },
  searchInput: {
    fontSize: 15,
    fontWeight: '300',
  },
  introTitle: {
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 9,
  },
  sectionTitle: {
    color: '#201F1E',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  categoryRail: {
    gap: 15,
    paddingHorizontal: 21,
    paddingVertical: 15,
  },
  category: {
    width: 73,
    alignItems: 'center',
    gap: 5,
  },
  categoryImage: {
    width: 73,
    height: 73,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  categoryLabel: {
    width: '100%',
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
    textAlign: 'center',
  },
  serviceSections: {
    gap: 22,
  },
  serviceTitle: {
    paddingHorizontal: 25,
    paddingVertical: 12.5,
  },
  pressed: {
    opacity: 0.7,
  },
});
