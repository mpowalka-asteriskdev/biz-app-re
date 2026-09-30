import { StyleSheet } from 'react-native';

export const TOGGLE_COLORS = {
  off: '#AAA5A2',
  on: '#E64F21',
  knobOff: '#FFFFFF',
  knobOn: '#F9F6F2',
};

const TOGGLE_WIDTH = 47;
const TOGGLE_HEIGHT = 25.64;
const TOGGLE_KNOB_SIZE = 18.8;
const TOGGLE_PADDING = (TOGGLE_HEIGHT - TOGGLE_KNOB_SIZE) / 2;
export const TOGGLE_KNOB_TRAVEL = TOGGLE_WIDTH - 2 * TOGGLE_PADDING - TOGGLE_KNOB_SIZE;

/** On/off switch ("Switch On Off" in Figma); the same on every platform. */
export const sharedToggleStyles = StyleSheet.create({
  track: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: TOGGLE_HEIGHT / 2,
    justifyContent: 'center',
    paddingHorizontal: TOGGLE_PADDING,
  },
  knob: {
    width: TOGGLE_KNOB_SIZE,
    height: TOGGLE_KNOB_SIZE,
    borderRadius: TOGGLE_KNOB_SIZE / 2,
  },
});
