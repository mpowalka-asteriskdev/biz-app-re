import { Image } from 'expo-image';
import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { HoursPopup } from '@/components/hours-popup';
import { MapPopup } from '@/components/map-popup';
import { type DayHours, type OnboardingData, useOnboarding } from '@/components/onboarding-context';
import { Checkbox, OnboardingButton, OnboardingScreen } from '@/components/onboarding-screen';
import { useOnboardingStyles } from '@/components/onboarding.styles';
import { Toggle } from '@/components/toggle';
import { WEEK_DAYS } from '@/constants/onboarding';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { authClient } from '@/lib/auth-client';
import {
  type Category,
  createPlace,
  getCategories,
  type OpeningHoursInput,
  type PlaceExperience,
  updateOpeningHours,
  updatePlace,
} from '@/lib/places-api';

const chevronIcon = require('@/assets/onboarding/chevron-right.svg');
const activityIcon = require('@/assets/onboarding/activity.svg');
const documentIcon = require('@/assets/onboarding/document-text.svg');
const clearIcon = require('@/assets/onboarding/close-circle.svg');
const confirmedIcon = require('@/assets/onboarding/tick-circle.svg');

const SAVE_ERROR = 'Nie udało się zapisać danych. Spróbuj ponownie.';

function errorMessage(error: unknown, fallback = SAVE_ERROR) {
  return error instanceof Error ? error.message : fallback;
}

/** Step 1: the business's category, listed by the places service. Picking one saves it. */
export function IndustryStep() {
  const router = useRouter();
  const styles = useOnboardingStyles();
  const { data, update } = useOnboarding();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getCategories()
      .then((items) => {
        if (active) setCategories(items);
      })
      .catch((error: unknown) => {
        if (active) setMessage(errorMessage(error, 'Nie udało się wczytać kategorii.'));
      });

    return () => {
      active = false;
    };
  }, []);

  // Before the company step creates the place, the category waits to be sent with it.
  async function selectCategory(categoryId: string) {
    if (data.placeId) {
      setSavingId(categoryId);
      setMessage(null);

      try {
        await updatePlace(data.placeId, { categoryId });
      } catch (error) {
        setMessage(errorMessage(error));
        return;
      } finally {
        setSavingId(null);
      }
    }

    update({ categoryId });
    router.push('/onboarding/company');
  }

  return (
    <OnboardingScreen
      step={1}
      title="W jakiej branży działasz?"
      description="Wybierz jedną z poniższych kategorii, która opisuje główną sferę Twojej działalności"
      // Home sends users with an empty place back here, so the way out is signing out.
      onBack={() => authClient.signOut()}>
      {message && (
        <Text accessibilityLiveRegion="polite" style={[styles.message, styles.stepMessage]}>
          {message}
        </Text>
      )}
      {categories === null && !message && (
        <ActivityIndicator color="#AAA5A2" style={styles.stepLoading} />
      )}
      {categories?.length === 0 && (
        <Text style={[styles.message, styles.stepMessage]}>Brak kategorii do wyboru.</Text>
      )}

      <View style={styles.industryList}>
        {categories?.map((category) => {
          const selected = data.categoryId === category.id;
          const saving = savingId === category.id;

          return (
            <Pressable
              key={category.id}
              accessibilityRole="button"
              accessibilityState={{ selected, busy: saving }}
              disabled={savingId !== null}
              onPress={() => selectCategory(category.id)}
              style={({ pressed }) => [styles.industryRow, pressed && styles.pressed]}>
              <Text style={[styles.industryLabel, selected && styles.industryLabelSelected]}>
                {category.name}
              </Text>
              {saving ? (
                <ActivityIndicator color="#AAA5A2" />
              ) : (
                <Image accessibilityLabel="" source={chevronIcon} style={styles.chevron} />
              )}
            </Pressable>
          );
        })}
      </View>
    </OnboardingScreen>
  );
}

type CompanyField = keyof OnboardingData['company'];

const COMPANY_FIELDS: {
  key: CompanyField;
  placeholder: string;
  icon: number;
  inputProps?: TextInputProps;
}[] = [
  { key: 'name', placeholder: 'Nazwa firmy', icon: activityIcon },
  { key: 'nip', placeholder: 'Numer NIP', icon: documentIcon, inputProps: { inputMode: 'numeric' } },
  {
    key: 'street',
    placeholder: 'Ulica i numer',
    icon: documentIcon,
    inputProps: { autoComplete: 'street-address' },
  },
  { key: 'city', placeholder: 'Miejscowość', icon: documentIcon },
  {
    key: 'postalCode',
    placeholder: 'Kod pocztowy',
    icon: documentIcon,
    inputProps: { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 6 },
  },
];

const ADDRESS_FIELDS: CompanyField[] = ['street', 'city', 'postalCode'];

function validateCompany({ company, consents }: OnboardingData): string | null {
  if (Object.values(company).some((value) => value.trim() === '')) {
    return 'Uzupełnij wszystkie dane firmy.';
  }

  if (company.nip.replace(/\D/g, '').length !== 10) {
    return 'Numer NIP musi mieć 10 cyfr.';
  }

  if (company.postalCode.replace(/\D/g, '').length !== 5) {
    return 'Podaj kod pocztowy w formacie 00-000.';
  }

  if (!consents.terms) {
    return 'Zaakceptuj regulamin, aby przejść dalej.';
  }

  return null;
}

/**
 * Step 2: company details and consents. The main button confirms the location on the map
 * first; once the pin is confirmed it saves the place and moves on.
 */
export function CompanyStep() {
  const router = useRouter();
  const styles = useOnboardingStyles();
  const { data, update } = useOnboarding();
  const { isWebDesktop } = usePlatformLayout();
  const [mapVisible, setMapVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { company, consents, pinConfirmed } = data;

  function setField(key: CompanyField, value: string) {
    const nextCompany = { ...company, [key]: value };

    // A changed address has to be confirmed on the map again.
    update(
      ADDRESS_FIELDS.includes(key)
        ? { company: nextCompany, pinConfirmed: false }
        : { company: nextCompany },
    );
    setMessage(null);
  }

  async function goNext() {
    const error = validateCompany(data);

    if (error) {
      setMessage(error);
      return;
    }

    setSaving(true);
    setMessage(null);

    // The first visit creates the place, with the category from step 1; coming back updates it.
    try {
      const place = data.placeId
        ? await updatePlace(data.placeId, company)
        : await createPlace({ ...company, categoryId: data.categoryId });

      update({ placeId: place.id });
      router.push('/onboarding/about');
    } catch (error) {
      setMessage(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  // At the end of the content on phones; the desktop design puts them under the button.
  const consentRows = (
    <View style={styles.consents}>
      <Checkbox
        checked={consents.terms && consents.marketing}
        label="Zgodna na wszystkie poniższe"
        onChange={(checked) => {
          update({ consents: { terms: checked, marketing: checked } });
          setMessage(null);
        }}
      />
      <Checkbox
        checked={consents.terms}
        label="Akceptuję regulamin"
        onChange={(terms) => {
          update({ consents: { ...consents, terms } });
          setMessage(null);
        }}
        style={styles.checkboxRowNested}
      />
      <Checkbox
        checked={consents.marketing}
        label="Chcę otrzymywać informacje o ..."
        onChange={(marketing) => update({ consents: { ...consents, marketing } })}
        style={styles.checkboxRowNested}
      />
    </View>
  );

  return (
    <>
      <OnboardingScreen
        step={2}
        title={isWebDesktop ? 'Coś więcej o Twojej firmie' : 'Coś o Twojej firmie'}
        description="Uzupełnij dane identyfikacyjne swojej firmy"
        onBack={() => router.back()}
        belowFooter={isWebDesktop && consentRows}
        desktopFooterSpacing={27}
        footer={
          <>
            {message && (
              <Text accessibilityLiveRegion="polite" style={styles.message}>
                {message}
              </Text>
            )}
            {pinConfirmed ? (
              <OnboardingButton busy={saving} label="Przechodzę dalej" onPress={goNext} />
            ) : (
              <OnboardingButton
                label="Potwierdź lokalizację na mapie"
                onPress={() => setMapVisible(true)}
              />
            )}
          </>
        }>
        <View style={styles.fields}>
          {COMPANY_FIELDS.map((field) => (
            <CompanyInput
              key={field.key}
              {...field.inputProps}
              icon={field.icon}
              onChangeText={(value) => setField(field.key, value)}
              placeholder={field.placeholder}
              value={company[field.key]}
            />
          ))}

          <Pressable
            accessibilityRole="button"
            onPress={() => setMapVisible(true)}
            style={({ pressed }) => [styles.field, pressed && styles.pressed]}>
            <Image accessibilityLabel="" source={documentIcon} style={styles.icon} />
            <Text style={styles.fieldText}>
              {pinConfirmed ? 'Pinezka potwierdzona' : 'Pinezka niepotwierdzona'}
            </Text>
            {pinConfirmed && <Image accessibilityLabel="" source={confirmedIcon} style={styles.icon} />}
          </Pressable>
        </View>

        {!isWebDesktop && consentRows}
      </OnboardingScreen>

      <MapPopup
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        onConfirm={() => {
          update({ pinConfirmed: true });
          setMapVisible(false);
        }}
      />
    </>
  );
}

function CompanyInput({
  icon,
  value,
  onChangeText,
  ...props
}: TextInputProps & { icon: number; value: string; onChangeText: (value: string) => void }) {
  const styles = useOnboardingStyles();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.field, focused && styles.fieldFocused]}>
      <Image accessibilityLabel="" source={icon} style={styles.icon} />
      <TextInput
        {...props}
        accessibilityLabel={props.placeholder}
        onBlur={() => setFocused(false)}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        placeholderTextColor="#AAA5A2"
        selectionColor="#E64F21"
        style={styles.input}
        value={value}
      />
      {value !== '' && (
        <Pressable
          accessibilityLabel="Wyczyść pole"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => onChangeText('')}
          style={({ pressed }) => pressed && styles.pressed}>
          <Image accessibilityLabel="" source={clearIcon} style={styles.icon} />
        </Pressable>
      )}
    </View>
  );
}

const EXPERIENCE_OPTIONS: { value: PlaceExperience; title: string; description: string }[] = [
  {
    value: 'beginner',
    title: 'Dopiero zaczynam swój biznes',
    description: 'Nie mam jeszcze regularnych klientów',
  },
  {
    value: 'established',
    title: 'Mam już stałych klientów',
    description: 'Potrzebuję lepiej zarządzać wizytami',
  },
  {
    value: 'firstTime',
    title: 'Pierwszy raz w tego typu app’ce',
    description: 'Czy to Twój pierwszy kontakt z takim serwisem',
  },
];

/**
 * Step 3: the business's experience. The place stores a single value, so switching one option
 * on switches the others off.
 */
export function AboutStep() {
  const router = useRouter();
  const styles = useOnboardingStyles();
  const { data, update } = useOnboarding();
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { placeId } = data;

  // Opened without the company step (e.g. by its URL), there is no place to update yet.
  if (!placeId) {
    return <Redirect href="/onboarding" />;
  }

  const goNext = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await updatePlace(placeId, { experience: data.experience });
      router.push('/onboarding/hours');
    } catch (error) {
      setMessage(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingScreen
      step={3}
      title="Daj nam poznać się lepiej"
      description="Abyśmy mogli dopasować ofertę do Twoich potrzeb"
      onBack={() => router.back()}
      footer={
        <>
          {message && (
            <Text accessibilityLiveRegion="polite" style={styles.message}>
              {message}
            </Text>
          )}
          <OnboardingButton busy={saving} label="Przechodzę dalej" onPress={goNext} />
        </>
      }>
      <View style={styles.profileList}>
        {EXPERIENCE_OPTIONS.map((option) => (
          <View key={option.value} style={styles.profileRow}>
            <View style={styles.profileText}>
              <Text style={styles.profileTitle}>{option.title}</Text>
              <Text style={styles.profileDescription}>{option.description}</Text>
            </View>
            <Toggle
              label={option.title}
              value={data.experience === option.value}
              onChange={(on) => update({ experience: on ? option.value : null })}
            />
          </View>
        ))}
      </View>
    </OnboardingScreen>
  );
}

/** The places service wants HH:MM, the popup offers H:MM. */
function toOpeningHoursInput(hours: DayHours[]): OpeningHoursInput {
  const input: OpeningHoursInput = {};

  WEEK_DAYS.forEach(({ key }, index) => {
    const day = hours[index];

    input[`${key}Open`] = day.open;
    input[`${key}OpensAt`] = day.from.padStart(5, '0');
    input[`${key}ClosesAt`] = day.to.padStart(5, '0');
  });

  return input;
}

/** Step 4: opening hours. The row's chevron opens the hours popup for that day. */
export function HoursStep() {
  const router = useRouter();
  const styles = useOnboardingStyles();
  const { data, update } = useOnboarding();
  const { isWebDesktop } = usePlatformLayout();
  const [editedDay, setEditedDay] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { placeId } = data;

  // Opened without the company step (e.g. by its URL), there is no place to update yet.
  if (!placeId) {
    return <Redirect href="/onboarding" />;
  }

  const applyHours = (dayIndex: number, from: string, to: string, sameForAll: boolean) => {
    update({
      hours: data.hours.map((day, index) => {
        // Setting hours opens the edited day; other days keep their open/closed switch.
        if (index === dayIndex) return { open: true, from, to };
        return sameForAll ? { ...day, from, to } : day;
      }),
    });
    setEditedDay(null);
  };

  const finish = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await updateOpeningHours(placeId, toOpeningHoursInput(data.hours));
      router.replace('/');
    } catch (error) {
      setMessage(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <OnboardingScreen
        step={4}
        // The desktop design words the heading differently and ends with a black button.
        title={isWebDesktop ? 'W jakich godzinach obsługujesz klientów?' : 'Godziny otwarcia'}
        description={
          isWebDesktop
            ? 'Zaznacz wybrane dni tygodnia i kliknij na godzinę, aby ją edytować'
            : 'W jakich godzinach obsługujesz klientów?'
        }
        onBack={() => router.back()}
        desktopFooterSpacing={47}
        footer={
          <>
            {message && (
              <Text accessibilityLiveRegion="polite" style={styles.message}>
                {message}
              </Text>
            )}
            <OnboardingButton
              busy={saving}
              label={isWebDesktop ? 'Zaczynamy' : 'Zaczynamy!'}
              variant={isWebDesktop ? 'dark' : 'accent'}
              onPress={finish}
            />
          </>
        }>
        <View style={styles.hoursList}>
          {WEEK_DAYS.map(({ key, label }, index) => {
            const day = data.hours[index];
            const range = day.open ? `${day.from} - ${day.to}` : 'zamknięte';

            return (
              <View key={key} style={styles.hoursRow}>
                <Toggle
                  label={label}
                  value={day.open}
                  onChange={(open) =>
                    update({
                      hours: data.hours.map((item, i) => (i === index ? { ...item, open } : item)),
                    })
                  }
                />
                <Pressable
                  accessibilityHint="Zmień godziny otwarcia"
                  accessibilityLabel={`${label}, ${range}`}
                  accessibilityRole="button"
                  onPress={() => setEditedDay(index)}
                  style={({ pressed }) => [styles.hoursDetails, pressed && styles.pressed]}>
                  <Text style={styles.hoursDay}>{label}</Text>
                  <Text style={styles.hoursRange}>{range}</Text>
                  <Image accessibilityLabel="" source={chevronIcon} style={styles.chevron} />
                </Pressable>
              </View>
            );
          })}
        </View>
      </OnboardingScreen>

      {editedDay !== null && (
        <HoursPopup
          day={WEEK_DAYS[editedDay].label}
          hours={data.hours[editedDay]}
          onClose={() => setEditedDay(null)}
          onSave={(from, to, sameForAll) => applyHours(editedDay, from, to, sameForAll)}
        />
      )}
    </>
  );
}
