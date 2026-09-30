import * as Linking from 'expo-linking';
import { type Href, Link, useIsFocused, useRouter } from 'expo-router';
import { type ReactNode, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  type TextInputProps,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAppMenuHeight } from '@/components/app-menu';
import { useAuthScreenStyles } from '@/components/auth-screen.styles';
import {
  AppleIcon,
  AuthLogo,
  BackArrowIcon,
  CloseCircleIcon,
  EyeIcon,
  FacebookIcon,
  GoogleIcon,
  MailIcon,
  PasswordIcon,
  PersonIcon,
  PhoneIcon,
  TickSquareIcon,
} from '@/components/auth-icons';
import { SiteFooter } from '@/components/site-footer';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';

type AuthMode = 'login' | 'register';

type AuthScreenProps = {
  mode: AuthMode;
  initialMessage?: string;
};

const mobileBackground = require('@/assets/auth/background.png');
const desktopBackground = require('@/assets/auth/background-desktop.png');

// Where login leads: the web app has its own /app home page, the native app opens on Szukamy.
// The generated route types miss the /app index page, hence the assertion.
const appHomeHref = (Platform.OS === 'web' ? '/app' : '/app/search') as Href;

export function AuthScreen({ mode, initialMessage }: AuthScreenProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { refetch } = authClient.useSession();
  const { isWebDesktop: isDesktop } = usePlatformLayout();
  const styles = useAuthScreenStyles();
  const isRegister = mode === 'register';
  // Login is the Profil tab, so the tab layout draws the app menu over it on mobile.
  const showMenu = !isRegister && !isDesktop;
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(initialMessage ?? null);
  const [isError, setIsError] = useState(false);

  // Desktop fields show a tick once login input is valid, and clear buttons while registering.
  const isEmailValid = email.trim().includes('@');
  const isPasswordValid = password.length >= 8;

  function clearMessage() {
    setMessage(null);
    setIsError(false);
  }

  async function submitEmail() {
    const trimmedEmail = email.trim();
    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      showError('Podaj poprawny adres e-mail.');
      return;
    }

    if (password.length < 8) {
      showError('Hasło musi mieć co najmniej 8 znaków.');
      return;
    }

    if (isRegister && (!trimmedName || !trimmedPhone)) {
      showError('Podaj imię i nazwisko oraz numer telefonu.');
      return;
    }

    setSubmitting(true);
    clearMessage();

    const result = isRegister
      ? await authClient.signUp.email({
          callbackURL: getAuthCallbackUrl(),
          email: trimmedEmail,
          name: trimmedName,
          password,
          phone: trimmedPhone,
        } as Parameters<typeof authClient.signUp.email>[0])
      : await authClient.signIn.email({
          email: trimmedEmail,
          password,
          rememberMe: true,
        });

    setSubmitting(false);

    if (result.error) {
      showError(result.error.message ?? 'Nie udało się uwierzytelnić. Spróbuj ponownie.');
      return;
    }

    if (isRegister) {
      router.replace('/app/account?registered=1');
      return;
    }

    await refetch();
    router.replace(appHomeHref);
  }

  async function signInWithGoogle() {
    setSubmitting(true);
    clearMessage();

    const callbackURL = getAuthCallbackUrl();
    const result = await authClient.signIn.social({
      callbackURL,
      errorCallbackURL: callbackURL,
      provider: 'google',
    });

    setSubmitting(false);

    if (result?.error) {
      showError(result.error.message ?? 'Logowanie przez Google nie powiodło się.');
      return;
    }

    if (Platform.OS !== 'web') {
      await refetch();
      router.replace(appHomeHref);
    }
  }

  function showUnavailable(provider: string) {
    setIsError(false);
    setMessage(`Logowanie przez ${provider} nie jest jeszcze dostępne.`);
  }

  function showError(text: string) {
    setIsError(true);
    setMessage(text);
  }

  return (
    <ImageBackground
      accessibilityLabel=""
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
      source={isDesktop ? desktopBackground : mobileBackground}
      style={styles.screen}>
      {isFocused && <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />}
      <View
        pointerEvents="none"
        style={styles.backdrop}
      />

      <SafeAreaView
        edges={showMenu ? ['top', 'right', 'left'] : undefined}
        style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.hero,
                // The menu overlays the bottom of the screen, so keep the form clear of it.
                showMenu && { paddingBottom: getAppMenuHeight(width) + 28 },
              ]}>
              <AuthHeader
                isDesktop={isDesktop}
                onBack={isRegister && !isDesktop ? () => router.replace('/app/account') : undefined}
                onProfilePress={isRegister ? () => router.replace('/app/account') : undefined}
              />

              <View style={[styles.formWrap, isRegister && styles.formWrapRegister]}>
                <View style={styles.headingBlock}>
                  <Text style={styles.title}>Dołącz do nas</Text>
                  <Text style={styles.description}>
                    {isRegister
                      ? 'Uzupełnij niezbędne dane, aby utworzyć konto'
                      : 'Aby wykorzystać pełną funkcjonalność systemu, zaloguj się lub załóż darmowe konto.'}
                  </Text>
                </View>

                <View style={styles.fields}>
                  {isRegister && (
                    <AuthField
                      autoCapitalize="words"
                      autoComplete="name"
                      editable={!submitting}
                      icon={<PersonIcon />}
                      onChangeText={(value) => {
                        setFullName(value);
                        clearMessage();
                      }}
                      placeholder="Imię i nazwisko"
                      trailing={
                        isDesktop && fullName !== '' && <ClearButton onPress={() => setFullName('')} />
                      }
                      value={fullName}
                    />
                  )}

                  <AuthField
                    autoCapitalize="none"
                    autoComplete="email"
                    editable={!submitting}
                    icon={<MailIcon />}
                    inputMode="email"
                    keyboardType="email-address"
                    onChangeText={(value) => {
                      setEmail(value);
                      clearMessage();
                    }}
                    placeholder="Twój adres e-mail"
                    trailing={
                      isDesktop &&
                      (isRegister
                        ? email !== '' && <ClearButton onPress={() => setEmail('')} />
                        : isEmailValid && <ValidBadge />)
                    }
                    value={email}
                  />

                  {isRegister && (
                    <AuthField
                      autoComplete="tel"
                      editable={!submitting}
                      icon={<PhoneIcon />}
                      inputMode="tel"
                      keyboardType="phone-pad"
                      onChangeText={(value) => {
                        setPhone(value);
                        clearMessage();
                      }}
                      placeholder="Numer telefonu"
                      trailing={
                        isDesktop && phone !== '' && <ClearButton onPress={() => setPhone('')} />
                      }
                      value={phone}
                    />
                  )}

                  <AuthField
                    autoCapitalize="none"
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    editable={!submitting}
                    icon={<PasswordIcon />}
                    onChangeText={(value) => {
                      setPassword(value);
                      clearMessage();
                    }}
                    onSubmitEditing={submitEmail}
                    placeholder="Hasło"
                    returnKeyType="done"
                    secureTextEntry={!passwordVisible}
                    trailing={
                      isDesktop &&
                      (isRegister ? (
                        <>
                          {password !== '' && <ClearButton onPress={() => setPassword('')} />}
                          <PasswordToggle
                            visible={passwordVisible}
                            onPress={() => setPasswordVisible((visible) => !visible)}
                          />
                        </>
                      ) : (
                        isPasswordValid && <ValidBadge />
                      ))
                    }
                    value={password}
                  />
                </View>

                {message && (
                  <Text
                    accessibilityLiveRegion="polite"
                    style={[styles.message, isError ? styles.errorMessage : styles.infoMessage]}>
                    {message}
                  </Text>
                )}

                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ disabled: submitting }}
                  disabled={submitting}
                  onPress={submitEmail}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.pressed,
                    submitting && styles.disabled,
                  ]}>
                  {submitting ? (
                    <ActivityIndicator color="#F9F6F2" />
                  ) : (
                    <Text style={styles.primaryButtonLabel}>
                      {isRegister ? 'Zarejestruj się' : 'Zaloguj się'}
                    </Text>
                  )}
                </Pressable>

                {/* Mobile register goes back to login with the arrow above the logo instead. */}
                {(!isRegister || isDesktop) && (
                  <Pressable
                    accessibilityRole="link"
                    onPress={() => router.replace(isRegister ? '/app/account' : '/app/register')}
                    style={({ pressed }) => [styles.routeSwitch, pressed && styles.pressed]}>
                    <Text style={styles.routeSwitchText}>
                      {isRegister ? 'Masz już konto?' : 'Nie masz jeszcze konta?'}{' '}
                      <Text style={styles.routeSwitchAccent}>
                        {isRegister ? 'Zaloguj się' : 'Zarejestruj się'}
                      </Text>
                    </Text>
                  </Pressable>
                )}

                {!isRegister && (
                  <>
                    <View style={styles.divider} />

                    <View style={styles.socialButtons}>
                      <SocialButton
                        icon={<AppleIcon />}
                        label="Kontynuuj z Apple"
                        onPress={() => showUnavailable('Apple')}
                      />
                      <SocialButton
                        icon={<GoogleIcon />}
                        label="Kontynuuj przez Google"
                        onPress={signInWithGoogle}
                      />
                      <SocialButton
                        icon={<FacebookIcon />}
                        label="Kontynuuj przez Facebook"
                        onPress={() => showUnavailable('Facebook')}
                      />
                    </View>
                  </>
                )}
              </View>
            </View>

            {isDesktop && <SiteFooter />}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

function AuthHeader({
  isDesktop,
  onBack,
  onProfilePress,
}: {
  isDesktop: boolean;
  onBack?: () => void;
  onProfilePress?: () => void;
}) {
  const styles = useAuthScreenStyles();

  return (
    <View style={styles.header}>
      {onBack && (
        <Pressable
          accessibilityLabel="Wróć do logowania"
          accessibilityRole="button"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <BackArrowIcon />
        </Pressable>
      )}

      <View style={styles.headerRow}>
        <Link asChild href="/">
          <Pressable accessibilityLabel="ogarnijmy.to, strona główna">
            <AuthLogo width={isDesktop ? 216 : 277} height={isDesktop ? 38 : 48} />
          </Pressable>
        </Link>

        {isDesktop && (
          <View style={styles.desktopNavigation}>
            <View style={styles.audienceActive}>
              <View style={styles.activeDot} />
              <Text style={styles.audienceActiveText}>Dla Ciebie</Text>
            </View>
            <Text style={styles.audienceInactiveText}>Dla biznesu</Text>
            <Pressable
              accessibilityLabel="Zaloguj się"
              accessibilityRole="link"
              disabled={!onProfilePress}
              onPress={onProfilePress}
              style={({ pressed }) => [styles.profileCircle, pressed && styles.pressed]}>
              <PersonIcon width={24} height={24} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

function AuthField({
  icon,
  trailing,
  ...props
}: TextInputProps & { icon: ReactNode; trailing?: ReactNode }) {
  const styles = useAuthScreenStyles();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.field, focused && styles.fieldFocused]}>
      {icon}
      <TextInput
        {...props}
        accessibilityLabel={props.placeholder}
        onBlur={(event) => {
          setFocused(false);
          props.onBlur?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        placeholderTextColor="#D6D5D4"
        selectionColor="#E85012"
        style={styles.input}
      />
      {trailing}
    </View>
  );
}

function ValidBadge() {
  const styles = useAuthScreenStyles();

  return (
    <View style={styles.validBadge}>
      <TickSquareIcon />
    </View>
  );
}

function ClearButton({ onPress }: { onPress: () => void }) {
  const styles = useAuthScreenStyles();

  return (
    <Pressable
      accessibilityLabel="Wyczyść pole"
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}>
      <CloseCircleIcon />
    </Pressable>
  );
}

function PasswordToggle({ visible, onPress }: { visible: boolean; onPress: () => void }) {
  const styles = useAuthScreenStyles();

  return (
    <Pressable
      accessibilityLabel={visible ? 'Ukryj hasło' : 'Pokaż hasło'}
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [!visible && styles.passwordHidden, pressed && styles.pressed]}>
      <EyeIcon />
    </Pressable>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: ReactNode;
  label: string;
  onPress: () => void | Promise<void>;
}) {
  const styles = useAuthScreenStyles();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}>
      {icon}
      <Text style={styles.socialButtonLabel}>{label}</Text>
    </Pressable>
  );
}

function getAuthCallbackUrl(): string {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return `${window.location.origin}/app`;
  }

  return Linking.createURL('/app/search');
}
