import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  CalendarTickIcon,
  CallIcon,
  ChevronRightIcon,
  EditIcon,
  LogoutIcon,
  PlusIcon,
  StarIcon,
  TickCircleIcon,
} from '@/components/account-icons';
import { PersonIcon } from '@/components/auth-icons';
import { SiteFooter } from '@/components/site-footer';
import { Toggle } from '@/components/toggle';
import { authClient } from '@/lib/auth-client';

const visitPlaceholder = require('@/assets/account/visit-placeholder.png');

type Visit = { id: string; place: string; date: string; rating: number };

// Placeholder visits from the Figma design until the visits API exists.
const VISITS_TO_RATE: Visit[] = [
  { id: 'recent-1', place: 'Barber przy Głównej', date: '12.01.2026', rating: 4 },
  { id: 'recent-2', place: 'Barber przy Głównej', date: '12.01.2026', rating: 4 },
];
const OLDER_VISITS: Visit[] = [
  { id: 'older-1', place: 'Barber przy Głównej', date: '12.01.2026', rating: 0 },
  { id: 'older-2', place: 'Barber przy Głównej', date: '12.01.2026', rating: 0 },
  { id: 'older-3', place: 'Barber przy Głównej', date: '12.01.2026', rating: 0 },
];

// Each sidebar option opens its own section in the right pane. "Twoje dane" and "Wizyty do oceny"
// have designs so far; the rest are placeholders.
const SECTIONS = [
  'Twoje dane',
  'Zaplanowane wizyty',
  'Wizyty do oceny',
  'Program lojalnościowy',
  'Oceń nas',
  'Polityka prywatności',
] as const;

type AccountSection = (typeof SECTIONS)[number];

const NOTIFICATION_SETTINGS = ['Powiadomienia', 'Oferty specjalne', 'Nowe oferty'];

// Placeholder rows from the Figma design until the remaining profile fields are defined.
const OTHER_OPTIONS_COUNT = 5;

/** Logged-in account page of the desktop web layout ("Login screen desktop - visits" in Figma). */
export function AccountDesktop() {
  const { data: session } = authClient.useSession();
  const phone = (session?.user as { phone?: string } | undefined)?.phone;
  const [activeSection, setActiveSection] = useState<AccountSection>('Wizyty do oceny');

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.sidebar}>
          <View style={styles.profile}>
            <View>
              <View style={styles.avatar}>
                <PersonIcon width={48} height={48} />
              </View>
              <View style={styles.avatarButton}>
                <PlusIcon />
              </View>
            </View>

            <View style={styles.profileDetails}>
              <Text style={styles.name}>{session?.user.name}</Text>
              {phone ? (
                <View style={styles.detailRow}>
                  <CallIcon />
                  <Text style={styles.detailText}>{phone}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.menu}>
            {SECTIONS.map((section) => {
              const active = section === activeSection;

              return (
                <Pressable
                  key={section}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setActiveSection(section)}
                  style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
                  <Text style={[styles.menuLabel, active && styles.menuLabelActive]}>
                    {section}
                  </Text>
                  <ChevronRightIcon active={active} />
                </Pressable>
              );
            })}

            <Pressable
              accessibilityRole="button"
              onPress={() => authClient.signOut()}
              style={({ pressed }) => [styles.menuItem, styles.menuItemLast, pressed && styles.pressed]}>
              <Text style={styles.menuLabel}>Wyloguj się</Text>
              <LogoutIcon />
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionPane}>
          {activeSection === 'Twoje dane' ? (
            <YourDetails />
          ) : activeSection === 'Wizyty do oceny' ? (
            <VisitsToRate />
          ) : (
            <SectionPlaceholder title={activeSection} />
          )}
        </View>
      </View>

      <SiteFooter />
    </ScrollView>
  );
}

/** "Twoje dane" ("Login screen desktop" in Figma). Settings and edit buttons don't save yet. */
function YourDetails() {
  const { data: session } = authClient.useSession();
  const user = session?.user as { name?: string; phone?: string } | undefined;
  const [firstName = '', ...lastNames] = (user?.name ?? '').split(' ');
  const [enabledSettings, setEnabledSettings] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFICATION_SETTINGS.map((setting) => [setting, true])),
  );

  const details = [
    { label: 'Twoje imię', value: firstName },
    { label: 'Twoje nazwisko', value: lastNames.join(' ') },
    // The account has no birth date yet.
    { label: 'Data urodzenia', value: undefined },
    { label: 'Nr telefonu', value: user?.phone },
    ...Array.from({ length: OTHER_OPTIONS_COUNT }, () => ({
      label: 'Inne opcje',
      value: 'Coś tam',
    })),
  ];

  return (
    <View>
      {NOTIFICATION_SETTINGS.map((setting) => (
        <View key={setting} style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>{setting}</Text>
          <Toggle
            label={setting}
            value={enabledSettings[setting]}
            onChange={(value) =>
              setEnabledSettings((current) => ({ ...current, [setting]: value }))
            }
          />
        </View>
      ))}

      {details.map((row, index) => (
        <View key={`${row.label}-${index}`} style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>{row.label}</Text>
          <Text style={styles.detailsValue}>{row.value || '—'}</Text>
          <EditIcon />
        </View>
      ))}
    </View>
  );
}

function VisitsToRate() {
  return (
    <View style={styles.visits}>
      {VISITS_TO_RATE.map((visit) => (
        <VisitRow key={visit.id} visit={visit} awaitingRating />
      ))}

      <Text style={styles.sectionTitle}>Starsze niż 3 miesiące</Text>

      {OLDER_VISITS.map((visit) => (
        <VisitRow key={visit.id} visit={visit} faded />
      ))}
    </View>
  );
}

function SectionPlaceholder({ title }: { title: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderText}>Ten widok jest w przygotowaniu.</Text>
    </View>
  );
}

function VisitRow({
  visit,
  awaitingRating,
  faded,
}: {
  visit: Visit;
  awaitingRating?: boolean;
  faded?: boolean;
}) {
  return (
    <View style={styles.visit}>
      <Image
        accessibilityLabel=""
        contentFit="cover"
        source={visitPlaceholder}
        style={[styles.visitImage, faded && styles.visitImageFaded]}
      />

      <View style={styles.visitDetails}>
        <Text style={styles.visitPlace}>{visit.place}</Text>

        <View style={styles.visitMeta}>
          <View style={styles.visitDate}>
            <CalendarTickIcon />
            <Text style={styles.visitDateText}>{visit.date}</Text>
          </View>

          {awaitingRating && (
            <View style={styles.visitStatus}>
              <TickCircleIcon />
              <Text style={styles.visitStatusText}>Oczekuje na ocenę</Text>
            </View>
          )}
        </View>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= visit.rating} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1354,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 66,
    paddingHorizontal: 69,
    paddingTop: 57,
    paddingBottom: 100,
  },
  sidebar: {
    width: 382,
    minHeight: 834,
    borderRadius: 15,
    paddingHorizontal: 38,
    paddingTop: 21,
    paddingBottom: 32,
    backgroundColor: '#FAFAFA',
  },
  profile: {
    flexDirection: 'row',
    gap: 33,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA5A2',
  },
  avatarButton: {
    position: 'absolute',
    right: -3,
    bottom: -6,
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  profileDetails: {
    flexShrink: 1,
    paddingTop: 14,
    gap: 11,
  },
  name: {
    color: '#000000',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#201F1E',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  menu: {
    marginTop: 45,
  },
  menuItem: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA5A2',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    color: '#201F1E',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '300',
  },
  menuLabelActive: {
    color: '#E64F21',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.72,
  },
  sectionPane: {
    flex: 1,
  },
  visits: {
    maxWidth: 497,
    paddingTop: 5,
  },
  detailsRow: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  detailsLabel: {
    flex: 1,
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '300',
  },
  detailsValue: {
    width: 150,
    marginRight: 37,
    color: '#AAA5A2',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    textAlign: 'center',
  },
  placeholder: {
    gap: 8,
    paddingTop: 25,
  },
  placeholderTitle: {
    color: '#000000',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  placeholderText: {
    color: '#AAA5A2',
    fontSize: 14,
    lineHeight: 17,
  },
  sectionTitle: {
    marginTop: 40,
    marginBottom: 14,
    color: '#AAA5A2',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
  },
  visit: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 38,
    borderBottomWidth: 1,
    borderBottomColor: '#E1DEDD',
  },
  visitImage: {
    width: 91,
    height: 91,
    borderRadius: 15,
  },
  visitImageFaded: {
    opacity: 0.6,
    filter: 'grayscale(1)',
  },
  visitDetails: {
    flexShrink: 1,
    gap: 6,
  },
  visitPlace: {
    color: '#000000',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  visitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  visitDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  visitDateText: {
    color: '#AAA5A2',
    fontSize: 14,
    lineHeight: 17,
  },
  visitStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  visitStatusText: {
    color: '#48B35E',
    fontSize: 12,
    lineHeight: 15,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 6,
  },
});
