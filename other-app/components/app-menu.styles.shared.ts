import { StyleSheet } from 'react-native';

export const MENU_COLORS = {
  bar: '#E64F21',
  label: '#F9F6F2',
};

/** Static parts of the bottom menu; sizes that scale with the screen width live in app-menu.tsx. */
export const sharedAppMenuStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
  },
  activeBubble: {
    position: 'absolute',
    backgroundColor: MENU_COLORS.bar,
    zIndex: 2,
  },
  visualLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 3,
    pointerEvents: 'none',
  },
  hitTab: {
    position: 'absolute',
    top: 0,
    zIndex: 4,
  },
  iconWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 14,
    color: MENU_COLORS.label,
  },
});
