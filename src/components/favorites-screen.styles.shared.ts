import { StyleSheet } from 'react-native';

/** Mobile design of the "Ulubione" tab ("Favourites" in Figma). */
export const sharedFavoritesScreenStyles = StyleSheet.create({
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
  search: {
    marginTop: 23,
    paddingHorizontal: 27,
  },
  searchInput: {
    fontSize: 15,
    fontWeight: '300',
  },
  sections: {
    marginTop: 25,
    gap: 4,
  },
  sectionTitle: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    color: '#201F1E',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
