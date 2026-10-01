import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { Link, useRouter } from 'expo-router';
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
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
};

const background = require('@/assets/auth/background.jpg');
const businessWordmark = require('@/assets/auth/logo-business.svg');
const shopIcon = require('@/assets/auth/shop.svg');

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const { refetch } = authClient.useSession();
  const { isWebDesktop: isDesktop } = usePlatformLayout();
  const styles = useAuthScreenStyles();
  const isRegister = mode === 'register';

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
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

    // Accounts created in this app are business accounts (a Better Auth additional field).
    const result = isRegister
      ? await authClient.signUp.email({
          accountType: 'business',
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

    // Sign-up signs the user in too. Home then sends accounts without a filled-in place to
    // onboarding.
    await refetch();
    router.replace('/');
  }

  async function signInWithGoogle() {
    setSubmitting(true);
    clearMessage();

    const callbackURL = getAuthCallbackUrl();
    // additionalData rides the OAuth state; the backend creates new Google users as business
    // accounts from it. Existing accounts keep their type.
    const result = await authClient.signIn.social({
      additionalData: { accountType: 'business' },
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
      router.replace('/');
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
      source={background}
      style={styles.screen}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View
        pointerEvents="none"
        style={styles.backdrop}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.hero}>
              <AuthHeader
                isDesktop={isDesktop}
                onBack={isRegister && !isDesktop ? () => router.replace('/login') : undefined}
                onProfilePress={isRegister ? () => router.replace('/login') : undefined}
              />

              <View style={[styles.formWrap, isRegister && styles.formWrapRegister]}>
                <View style={styles.headingBlock}>
                  <Text style={styles.title}>Dołącz ze swoim biznesem</Text>
                  <Text style={styles.description}>
                    {/* The mobile design breaks the login text after "nami". */}
                    {isRegister
                      ? 'Uzupełnij niezbędne dane, aby utworzyć konto'
                      : `Aby umawiać klientów i ogarniać swój biznes razem z nami${isDesktop ? ' ' : '\n'}zaloguj się lub załóż darmowe konto.`}
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
                    onPress={() => router.replace(isRegister ? '/login' : '/register')}
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
          <Pressable accessibilityLabel="ogarnijmy.to w Twoim biznesie, strona główna">
            <AuthLogo width={isDesktop ? 216 : 277} height={isDesktop ? 38 : 48} />
            {/* Hangs below the logo without making the header taller. */}
            <Image accessibilityLabel="" source={businessWordmark} style={styles.wordmark} />
          </Pressable>
        </Link>

        {isDesktop && (
          <View style={styles.desktopNavigation}>
            <Text style={styles.audienceInactiveText}>Dla Ciebie</Text>
            <View style={styles.audienceActive}>
              <View style={styles.activeDot} />
              <Text style={styles.audienceActiveText}>Dla biznesu</Text>
            </View>
            <Pressable
              accessibilityLabel="Zaloguj się"
              accessibilityRole="link"
              disabled={!onProfilePress}
              onPress={onProfilePress}
              style={({ pressed }) => pressed && styles.pressed}>
              <Image accessibilityLabel="" source={shopIcon} style={styles.profileIcon} />
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
    return `${window.location.origin}/`;
  }

  return Linking.createURL('/');
}
