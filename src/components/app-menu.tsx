import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { type ComponentType, useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path, type SvgProps } from 'react-native-svg';

import { useAppMenuStyles } from '@/components/app-menu.styles';
import { MENU_COLORS } from '@/components/app-menu.styles.shared';
import {
  CalendarActiveIcon,
  CalendarInactiveIcon,
  HeartActiveIcon,
  HeartInactiveIcon,
  ProfileActiveIcon,
  ProfileInactiveIcon,
  SearchActiveIcon,
  SearchInactiveIcon,
} from '@/components/menu-icons';

// Tab routes that get a menu button, in menu order. Other tab routes (the /app home and category
// pages) have no button; while one of them is open, no button is active.
const MENU_ROUTES = ['search', 'favorites', 'calendar', 'account'] as const;

type AppMenuRoute = (typeof MENU_ROUTES)[number];

// Tab routes without a button that still mark one as active: company profiles open from search.
const ROUTE_PARENTS: Record<string, AppMenuRoute> = {
  '[category]/[slug]': 'search',
};

const TAB_LABELS: Record<AppMenuRoute, string> = {
  search: 'Szukamy',
  favorites: 'Ulubione',
  calendar: 'Kalendarz',
  account: 'Profil',
};

const TAB_ICON_ACTIVE: Record<AppMenuRoute, ComponentType<SvgProps>> = {
  search: SearchActiveIcon,
  favorites: HeartActiveIcon,
  calendar: CalendarActiveIcon,
  account: ProfileActiveIcon,
};

const TAB_ICON_INACTIVE: Record<AppMenuRoute, ComponentType<SvgProps>> = {
  search: SearchInactiveIcon,
  favorites: HeartInactiveIcon,
  calendar: CalendarInactiveIcon,
  account: ProfileInactiveIcon,
};

const TAB_ICON_ACTIVE_SIZE: Record<AppMenuRoute, number> = {
  search: 28,
  favorites: 30,
  calendar: 32,
  account: 34,
};

const TAB_ICON_INACTIVE_SIZE = 24;

const DESIGN_SIZES = {
  width: 356,
  height: 105.5,
  barTop: 44.5,
  bubbleSize: 59,
  activeBubbleCenterY: 29.5,
  labelTop: 74,
  labelWidth: 90,
};

const DESIGN_ICON_CENTERS_X = [62, 139, 216, 293];
const DESIGN_HIT_BOUNDS_X = [0, 100.5, 177.5, 254.5, 356];

const BUBBLE_SPRING = { damping: 17, stiffness: 220, mass: 0.85 };

const AnimatedPath = Animated.createAnimatedComponent(Path);

/** Bar outline without a notch, used when no menu tab is active. */
const FLAT_BAR_PATH = 'M0 105.5V44.5H356V105.5H0Z';

/** Bar outline with the notch under the active tab, in design units (356 × 105.5). */
function buildTabBackgroundPath(activeCenterX: number) {
  'worklet';
  const leftShoulder = activeCenterX - 47;
  const leftControl1 = activeCenterX - 34;
  const leftControl2 = activeCenterX - 26;
  const rightControl1 = activeCenterX + 25.5;
  const rightControl2 = activeCenterX + 34;
  const rightShoulder = activeCenterX + 47.5;

  return `M0 105.5V44.5H${leftShoulder}C${leftControl1} 44.5 ${leftControl2} 70.5 ${activeCenterX} 70.5C${rightControl1} 70.5 ${rightControl2} 44.5 ${rightShoulder} 44.5H356V105.5H0Z`;
}

/** Height of the menu at a given screen width; screens use it to keep content clear of the bar. */
export function getAppMenuHeight(width: number) {
  return (DESIGN_SIZES.height * width) / DESIGN_SIZES.width;
}

export function AppMenu({ state, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const keyboardVisible = useKeyboardVisible();
  const styles = useAppMenuStyles();
  const scale = width / DESIGN_SIZES.width;
  const menuRoutes = MENU_ROUTES.map((name) => state.routes.find((route) => route.name === name));
  const currentRoute = state.routes[state.index].name;
  const activeIndex = MENU_ROUTES.indexOf(
    ROUTE_PARENTS[currentRoute] ?? (currentRoute as AppMenuRoute),
  );
  const hasActive = activeIndex !== -1;

  // Bubble and notch share one value in design units, so a resize needs no re-sync.
  const activeCenterX = useSharedValue(DESIGN_ICON_CENTERS_X[Math.max(activeIndex, 0)]);

  useEffect(() => {
    if (activeIndex !== -1) {
      activeCenterX.set(withSpring(DESIGN_ICON_CENTERS_X[activeIndex], BUBBLE_SPRING));
    }
  }, [activeCenterX, activeIndex]);

  const backgroundProps = useAnimatedProps(
    () => ({
      d: hasActive ? buildTabBackgroundPath(activeCenterX.get()) : FLAT_BAR_PATH,
    }),
    [hasActive],
  );

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: activeCenterX.get() * scale }],
  }));

  if (keyboardVisible) {
    return null;
  }

  const menuHeight = getAppMenuHeight(width);
  const barTop = DESIGN_SIZES.barTop * scale;
  const bubbleSize = DESIGN_SIZES.bubbleSize * scale;
  const bubbleTop = DESIGN_SIZES.activeBubbleCenterY * scale - bubbleSize / 2;
  const inactiveIconsCenterY = (barTop + menuHeight) / 2;
  const labelTop = DESIGN_SIZES.labelTop * scale;
  const labelWidth = DESIGN_SIZES.labelWidth * scale;

  return (
    <View style={[styles.container, { height: menuHeight }]}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${DESIGN_SIZES.width} ${DESIGN_SIZES.height}`}
        preserveAspectRatio="none"
        style={styles.backgroundSvg}>
        <AnimatedPath animatedProps={backgroundProps} fill={MENU_COLORS.bar} />
      </Svg>

      {hasActive && (
        <Animated.View
          style={[
            styles.activeBubble,
            {
              width: bubbleSize,
              height: bubbleSize,
              borderRadius: bubbleSize / 2,
              left: -bubbleSize / 2,
              top: bubbleTop,
            },
            bubbleStyle,
          ]}
        />
      )}

      {MENU_ROUTES.map((routeName, index) => {
        const focused = activeIndex === index;
        const Icon = focused ? TAB_ICON_ACTIVE[routeName] : TAB_ICON_INACTIVE[routeName];
        const iconSize = focused ? TAB_ICON_ACTIVE_SIZE[routeName] : TAB_ICON_INACTIVE_SIZE;
        const centerX = DESIGN_ICON_CENTERS_X[index] * scale;
        const iconTop = focused
          ? DESIGN_SIZES.activeBubbleCenterY * scale - iconSize / 2
          : inactiveIconsCenterY - iconSize / 2;

        return (
          <View key={`${routeName}-visual`} style={styles.visualLayer}>
            <View
              style={[
                styles.iconWrapper,
                { top: iconTop, left: centerX - iconSize / 2, width: iconSize, height: iconSize },
              ]}>
              <Icon width={iconSize} height={iconSize} />
            </View>

            {focused && (
              <Text
                style={[
                  styles.label,
                  { top: labelTop, left: centerX - labelWidth / 2, width: labelWidth },
                ]}>
                {TAB_LABELS[routeName]}
              </Text>
            )}
          </View>
        );
      })}

      {menuRoutes.map((route, index) => {
        if (!route) {
          return null;
        }

        const focused = activeIndex === index;
        const hitLeft = DESIGN_HIT_BOUNDS_X[index] * scale;
        const hitRight = DESIGN_HIT_BOUNDS_X[index + 1] * scale;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          // Compare with the open route, not the active button, so Szukamy leaves a company profile.
          if (route.name !== currentRoute && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityLabel={TAB_LABELS[MENU_ROUTES[index]]}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            onPress={onPress}
            style={[
              styles.hitTab,
              { left: hitLeft, width: Math.max(0, hitRight - hitLeft), height: menuHeight },
            ]}
          />
        );
      })}
    </View>
  );
}

// `tabBarHideOnKeyboard` only applies to the navigator's default tab bar, so a custom one has to
// hide itself.
function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSubscription = Keyboard.addListener(showEvent, () => setVisible(true));
    const hideSubscription = Keyboard.addListener(hideEvent, () => setVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return visible;
}
