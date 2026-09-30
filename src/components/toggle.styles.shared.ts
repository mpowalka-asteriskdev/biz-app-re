import { StyleSheet } from 'react-native';

export const TOGGLE_COLORS = {
  off: '#E1DEDD',
  on: '#E64F21',
};

const TOGGLE_WIDTH = 47;
const TOGGLE_PADDING = 3;
const TOGGLE_KNOB_SIZE = 19;
export const TOGGLE_KNOB_TRAVEL = TOGGLE_WIDTH - 2 * TOGGLE_PADDING - TOGGLE_KNOB_SIZE;

/** On/off switch ("Switch on/off" in Figma); the same on every platform. */
export const sharedToggleStyles = StyleSheet.create({
  track: {
    width: TOGGLE_WIDTH,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    paddingHorizontal: TOGGLE_PADDING,
  },
  knob: {
    width: TOGGLE_KNOB_SIZE,
    height: TOGGLE_KNOB_SIZE,
    borderRadius: TOGGLE_KNOB_SIZE / 2,
    backgroundColor: '#F9F6F2',
  },
});
