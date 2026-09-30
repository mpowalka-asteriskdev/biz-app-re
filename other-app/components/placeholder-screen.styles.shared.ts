import { StyleSheet } from 'react-native';

/** Mobile design of the temporary menu screens. */
export const sharedPlaceholderScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    backgroundColor: '#11110F',
  },
  title: {
    color: '#F9F6F2',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  description: {
    color: '#D6D5D4',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
});
