import { StyleSheet } from 'react-native';

/** Mobile design of the business page ("Company profile" in Figma). */
export const sharedCompanyProfileStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  photo: {
    height: 215,
    marginHorizontal: 27,
    overflow: 'hidden',
    borderRadius: 15,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  // Back and settings buttons sit on the photo's top corners.
  photoBar: {
    position: 'absolute',
    top: 10,
    left: 3,
    right: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    paddingHorizontal: 25,
    paddingVertical: 11,
    color: '#000000',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  meta: {
    marginTop: -3,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingItem: {
    gap: 4,
  },
  metaText: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  tags: {
    marginTop: 18,
    paddingHorizontal: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 7,
  },
  tag: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#B4340D',
    borderRadius: 5,
    backgroundColor: 'rgba(230, 79, 33, 0.2)',
  },
  tagText: {
    color: '#B4340D',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  about: {
    marginTop: 9,
    paddingHorizontal: 25,
    paddingVertical: 10,
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '300',
    textAlign: 'justify',
  },
  sectionTitle: {
    marginTop: 11,
    paddingHorizontal: 25,
    paddingVertical: 4,
    color: '#201F1E',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  services: {
    marginHorizontal: 31,
  },
  service: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1DEDD',
  },
  serviceMeta: {
    width: 70,
    gap: 6,
  },
  serviceMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  serviceMetaText: {
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
  },
  serviceDivider: {
    width: 1,
    height: 86,
    backgroundColor: '#E64F21',
  },
  serviceInfo: {
    flex: 1,
    gap: 7,
  },
  serviceName: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  serviceDescription: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  pressed: {
    opacity: 0.7,
  },
});
