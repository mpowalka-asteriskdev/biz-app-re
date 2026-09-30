import { StyleSheet } from 'react-native';

/** Mobile design of the business photo card and its carousel ("Profile Card" in Figma). */
export const sharedServiceCardStyles = StyleSheet.create({
  rail: {
    gap: 28,
    paddingHorizontal: 27,
    paddingTop: 5,
    paddingBottom: 13,
  },
  card: {
    width: 250,
  },
  imageWrap: {
    height: 215,
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favorite: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F6F2',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  body: {
    gap: 4,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#FFFFFF',
    boxShadow: '3px 3px 2.55px rgba(0, 0, 0, 0.05)',
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flexShrink: 1,
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  address: {
    color: '#AAA5A2',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '200',
  },
  pressed: {
    opacity: 0.7,
  },
});
