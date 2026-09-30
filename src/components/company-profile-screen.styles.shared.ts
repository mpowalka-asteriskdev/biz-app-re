import { StyleSheet } from 'react-native';

const TEXT = '#201F1E';
const MUTED = '#AAA5A2';
const TILE_BORDER = 'rgba(0, 0, 0, 0.12)';
const TILE_BACKGROUND = '#FAFAFA';
const BUTTON_SHADOW = '0px 4px 2.9px rgba(0, 0, 0, 0.15)';

/** Profil page of the desktop web design ("Company profile desktop" in Figma). */
export const sharedCompanyProfileScreenStyles = StyleSheet.create({
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
    paddingTop: 58,
    paddingBottom: 79,
  },
  // The page's photos and services, next to the details card.
  columns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1217,
    gap: 34,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },

  // Loading and error states.
  status: {
    alignItems: 'center',
    gap: 16,
    paddingTop: 40,
  },
  message: {
    color: TEXT,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    height: 44,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: TEXT,
    boxShadow: BUTTON_SHADOW,
  },
  pressed: {
    opacity: 0.72,
  },

  // Photos: an empty main photo with its "+" and a row of empty thumbnails.
  photo: {
    height: 360,
    borderWidth: 1,
    borderColor: TILE_BORDER,
    borderRadius: 15,
    backgroundColor: TILE_BACKGROUND,
  },
  // A 60px button; the image is larger for its shadow.
  addPhotoIcon: {
    position: 'absolute',
    left: 24.7,
    bottom: 18.8,
    width: 62.5376,
    height: 62.5376,
  },
  thumbnails: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 18,
  },
  thumbnail: {
    flex: 1,
    height: 125,
    borderWidth: 1,
    borderColor: TILE_BORDER,
    borderRadius: 15,
    backgroundColor: TILE_BACKGROUND,
  },

  // Name, address and the banner button.
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 21,
  },
  name: {
    flexShrink: 1,
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 13,
  },
  smallIcon: {
    width: 15,
    height: 15,
  },
  address: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '200',
  },
  bannerButton: {
    alignSelf: 'flex-start',
    marginTop: 27,
    padding: 5,
    borderWidth: 1,
    borderColor: '#B4340D',
    borderRadius: 5,
    backgroundColor: 'rgba(230, 79, 33, 0.1)',
  },
  bannerButtonLabel: {
    color: '#B4340D',
    fontSize: 12,
    fontWeight: '200',
  },

  // Services: an empty row to fill in.
  servicesTitle: {
    marginTop: 77,
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 35,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1DEDD',
  },
  serviceText: {
    flex: 1,
    gap: 6,
  },
  serviceName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  serviceDescription: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '200',
  },
  // The divider is a horizontal line turned upright.
  serviceDivider: {
    width: 2,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceDividerLine: {
    width: 86,
    height: 2,
    transform: [{ rotate: '90deg' }],
  },
  serviceDetails: {
    gap: 6,
  },
  serviceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  serviceDetailIcon: {
    width: 20,
    height: 20,
  },
  serviceDetailText: {
    color: TEXT,
    fontSize: 12,
    fontWeight: '600',
  },
  serviceButton: {
    width: 125,
    height: 44,
    marginLeft: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEXT,
    boxShadow: BUTTON_SHADOW,
  },
  buttonLabel: {
    color: '#F9F6F2',
    fontSize: 14,
    fontWeight: '400',
  },

  // Details card: map, description, opening hours, company data and social media.
  card: {
    width: 382,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: TILE_BACKGROUND,
  },
  map: {
    height: 199,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  // White behind the icon's 50px circle, which is centred 30px below the icon's top.
  addMapBacking: {
    position: 'absolute',
    top: 65,
    left: '50%',
    marginLeft: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  // A 60px button; the image is larger for its shadow.
  addMapIcon: {
    position: 'absolute',
    top: 60,
    left: '50%',
    marginLeft: -33,
    width: 66,
    height: 67,
  },
  cardBody: {
    paddingTop: 34,
    paddingLeft: 28,
    paddingRight: 24,
    paddingBottom: 30,
  },
  cardSection: {
    marginTop: 34,
  },
  cardLabel: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '700',
  },
  cardText: {
    marginTop: 6,
    color: TEXT,
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'justify',
  },
  hoursList: {
    gap: 6,
    marginTop: 9,
  },
  hoursRow: {
    height: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    color: TEXT,
    fontSize: 12,
    fontWeight: '200',
  },
  contacts: {
    gap: 10,
    marginTop: 19,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 10,
    marginLeft: 4,
  },
  socialIcon: {
    width: 36,
    height: 36,
  },
  socialIconLarge: {
    width: 48,
    height: 48,
  },
});
