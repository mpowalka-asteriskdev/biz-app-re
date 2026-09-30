import { StyleSheet } from 'react-native';

export const MENU_COLORS = {
  bar: '#201F1E',
  label: '#F9F6F2',
};

/**
 * Static parts of the bottom menu ("biz app menu" in Figma); sizes that scale with the screen
 * width live in business-menu.tsx.
 */
export const sharedBusinessMenuStyles = StyleSheet.create({
  // The menu is drawn over the screen; only its tab buttons take touches, the rest passes through.
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    pointerEvents: 'box-none',
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    pointerEvents: 'none',
  },
  activeBubble: {
    position: 'absolute',
    backgroundColor: MENU_COLORS.bar,
    zIndex: 2,
    pointerEvents: 'none',
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
