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

import { AuthLogo } from '@/components/auth-icons';
import { useOnboardingStyles } from '@/components/onboarding.styles';
import { SignOutMenuButton } from '@/components/sign-out-menu';
import { SiteFooter } from '@/components/site-footer';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

const backIcon = require('@/assets/onboarding/back.svg');
const profileIcon = require('@/assets/app/profile-circle.svg');
const shopIcon = require('@/assets/onboarding/shop.svg');
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
  /** Phones only: the desktop design has no back button (the browser's back works there). */
  onBack: () => void;
  /** The step's main button: pinned to the bottom on phones, right after the content on desktop. */
  footer?: ReactNode;
  /** Desktop only: content under the button (step 2's consents). */
  belowFooter?: ReactNode;
  /** Desktop only: space between the content and the button, which differs per step in Figma. */
  desktopFooterSpacing?: number;
  children: ReactNode;
};

/** Frame shared by the registration steps: heading, step dots, content and the main button. */
export function OnboardingScreen(props: OnboardingScreenProps) {
  const { isWebDesktop } = usePlatformLayout();

  return isWebDesktop ? <DesktopOnboardingScreen {...props} /> : <PhoneOnboardingScreen {...props} />;
}

/** "Company details register" frames: dark header, a centred column and the site footer. */
function DesktopOnboardingScreen({
  step,
  title,
  description,
  footer,
  belowFooter,
  desktopFooterSpacing = 40,
  children,
}: OnboardingScreenProps) {
  const styles = useOnboardingStyles();

  return (
    <ScrollView
      contentContainerStyle={styles.desktopPage}
      keyboardShouldPersistTaps="handled"
      style={styles.screen}>
      <View style={styles.desktopHeader}>
        <View style={styles.desktopTopRow}>
          <AuthLogo width={216} height={38} />
          <SignOutMenuButton accessibilityLabel="Profil">
            <Image accessibilityLabel="" source={profileIcon} style={styles.desktopProfileIcon} />
          </SignOutMenuButton>
        </View>
        <Image
          accessibilityLabel={`Krok ${step} z ${stepImages.length}`}
          source={stepImages[step - 1]}
          style={[styles.steps, styles.desktopSteps]}
        />
      </View>

      <View style={styles.desktopBody}>
        <View style={styles.desktopContent}>
          <View style={styles.desktopHeading}>
            <Image accessibilityLabel="" source={shopIcon} style={styles.desktopHeadingIcon} />
            <Text style={styles.desktopHeadingText}>Załóżmy konto Twojego biznesu</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {children}
          {footer && (
            <View style={[styles.desktopFooter, { marginTop: desktopFooterSpacing }]}>{footer}</View>
          )}
          {belowFooter}
        </View>
      </View>

      <SiteFooter />
    </ScrollView>
  );
}

/** "Branch" frames: back button and dots, scrolling content, and the button pinned below. */
function PhoneOnboardingScreen({
  step,
  title,
  description,
  onBack,
  footer,
  children,
}: OnboardingScreenProps) {
  const styles = useOnboardingStyles();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
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
