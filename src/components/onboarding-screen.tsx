import { Image } from 'expo-image';
import { type ReactNode } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useOnboardingStyles } from '@/components/onboarding.styles';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

const pageBackground = require('@/assets/auth/background.jpg');
const backIcon = require('@/assets/onboarding/back.svg');
const stepImages = [
  require('@/assets/onboarding/steps-1.svg'),
  require('@/assets/onboarding/steps-2.svg'),
  require('@/assets/onboarding/steps-3.svg'),
  require('@/assets/onboarding/steps-4.svg'),
];
const tickSquareIcon = require('@/assets/onboarding/tick-square.svg');
const minusSquareIcon = require('@/assets/onboarding/minus-square.svg');

type OnboardingScreenProps = {
  /** 1-based step number, shown by the dots at the top. */
  step: number;
  title: string;
  description: string;
  onBack: () => void;
  /** Pinned below the scrolling content, e.g. the step's main button. */
  footer?: ReactNode;
  children: ReactNode;
};

/** Frame shared by the registration steps: back button, step dots, heading and content. */
export function OnboardingScreen({
  step,
  title,
  description,
  onBack,
  footer,
  children,
}: OnboardingScreenProps) {
  const styles = useOnboardingStyles();
  const insets = useSafeAreaInsets();
  const { isWebDesktop } = usePlatformLayout();

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      {/* Desktop web shows the steps as a card, over the same photo as the login page. */}
      {isWebDesktop && (
        <>
          <Image
            accessibilityLabel=""
            contentFit="cover"
            source={pageBackground}
            style={styles.pageBackground}
          />
          <View pointerEvents="none" style={styles.pageOverlay} />
        </>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.column}>
        <View style={styles.header}>
          <View pointerEvents="none" style={styles.stepsBox}>
            <Image
              accessibilityLabel={`Krok ${step} z ${stepImages.length}`}
              source={stepImages[step - 1]}
              style={styles.steps}
            />
          </View>
          <Pressable
            accessibilityLabel="Wstecz"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onBack}
            style={({ pressed }) => pressed && styles.pressed}>
            <Image accessibilityLabel="" source={backIcon} style={styles.backIcon} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.scroll}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {children}
        </ScrollView>

        {footer && (
          // The Figma frames keep 30px under the button; iPhones' home indicator area is larger.
          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 30) }]}>
            {footer}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Large rounded button at the bottom of a step ("Button L" / "Button L blck" in Figma). */
export function OnboardingButton({
  label,
  variant = 'dark',
  busy = false,
  onPress,
}: {
  label: string;
  variant?: 'dark' | 'accent';
  /** Shows a spinner and ignores presses, e.g. while saving. */
  busy?: boolean;
  onPress: () => void;
}) {
  const styles = useOnboardingStyles();

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ busy, disabled: busy }}
      disabled={busy}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'accent' ? styles.buttonAccent : styles.buttonDark,
        pressed && styles.pressed,
      ]}>
      {busy ? (
        <ActivityIndicator color="#F9F6F2" />
      ) : (
        <Text style={styles.buttonLabel}>{label}</Text>
      )}
    </Pressable>
  );
}

/** Checkbox row: a ticked square when checked, the given icon (a minus square) when not. */
export function Checkbox({
  label,
  checked,
  onChange,
  uncheckedIcon = minusSquareIcon,
  style,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  uncheckedIcon?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const styles = useOnboardingStyles();

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => onChange(!checked)}
      style={({ pressed }) => [styles.checkboxRow, style, pressed && styles.pressed]}>
      <Image
        accessibilityLabel=""
        source={checked ? tickSquareIcon : uncheckedIcon}
        style={styles.icon}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}
