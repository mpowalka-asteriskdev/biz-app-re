import { StyleSheet } from 'react-native';

/** Mobile design of the logged-in account screen ("User profile" in Figma). */
export const sharedAccountScreenStyles = StyleSheet.create({
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
  profile: {
    flexDirection: 'row',
    gap: 33,
    marginTop: 31,
    paddingHorizontal: 35,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#AAA5A2',
  },
  avatarImage: {
    width: 90,
    height: 90,
  },
  avatarButton: {
    position: 'absolute',
    right: -3,
    bottom: -6,
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  profileDetails: {
    flexShrink: 1,
    paddingTop: 14,
    gap: 10,
  },
  name: {
    color: '#000000',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  contactRows: {
    gap: 7,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  content: {
    paddingHorizontal: 25,
  },
  sectionLabel: {
    marginTop: 52,
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '300',
  },
  visitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 43,
    marginTop: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 4px 2px rgba(0, 0, 0, 0.08)',
  },
  visitWhen: {
    width: 58,
    alignItems: 'flex-end',
  },
  visitTime: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  visitTimeText: {
    color: '#E64F21',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  visitDate: {
    width: '100%',
    color: '#D6D5D4',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  visitDetails: {
    flexShrink: 1,
    width: 170,
    gap: 3,
  },
  visitPlace: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  visitAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  visitAddressText: {
    color: '#D6D5D4',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '200',
  },
  menu: {
    marginTop: 39,
  },
  menuItem: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  menuLabel: {
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '300',
  },
  pressed: {
    opacity: 0.72,
  },
});
