import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

import { BusinessHeader } from '@/components/business-header';
import { useCompanyProfileScreenStyles } from '@/components/company-profile-screen.styles';
import { SiteFooter } from '@/components/site-footer';
import { WEEK_DAYS } from '@/constants/onboarding';
import { SAMPLE_COMPANY_PROFILE } from '@/constants/sample-profile';
import { authClient } from '@/lib/auth-client';
import { findOwnPlace } from '@/lib/onboarding';
import { getOpeningHours, type OpeningHours, type Place } from '@/lib/places-api';

const addPhotoIcon = require('@/assets/company-profile/add-photo-light.svg');
const editIcon = require('@/assets/company-profile/edit.svg');
const locationIcon = require('@/assets/company-profile/location.svg');
const dividerLine = require('@/assets/company-profile/line.svg');
const dollarIcon = require('@/assets/company-profile/dollar-circle.svg');
const clockIcon = require('@/assets/company-profile/clock.svg');
const mapImage = require('@/assets/company-profile/map-preview.png');
const addMapIcon = require('@/assets/company-profile/add-map.svg');
const callIcon = require('@/assets/company-profile/call.svg');
const smsIcon = require('@/assets/company-profile/sms.svg');
const facebookIcon = require('@/assets/company-profile/facebook.svg');
const instagramIcon = require('@/assets/company-profile/instagram.svg');
const youtubeIcon = require('@/assets/company-profile/youtube.svg');

const THUMBNAIL_COUNT = 6;

type CompanyProfile = { place: Place; hours: OpeningHours };

/**
 * Profil tab on desktop web ("Company profile desktop" in Figma). The name, address, opening
 * hours and company data come from the places service; it has no photos, services, description
 * or contact details yet, so those are empty or sample data. The buttons have no designs for
 * what they open.
 */
export function CompanyProfileScreen() {
  const styles = useCompanyProfileScreenStyles();
  const { data: session } = authClient.useSession();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;

    let active = true;

    loadCompanyProfile(userId)
      .then((loaded) => {
        if (active) setProfile(loaded);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error ? loadError.message : 'Nie udało się wczytać danych firmy.',
          );
        }
      });

    return () => {
      active = false;
    };
  }, [userId, attempt]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
      <BusinessHeader active="profile" />

      <View style={styles.content}>
        {profile ? (
          <View style={styles.columns}>
            <View style={styles.main}>
              <Photos />
              <PlaceSummary place={profile.place} />
              <Services />
            </View>
            <DetailsCard place={profile.place} hours={profile.hours} />
          </View>
        ) : (
          <View style={styles.status}>
            {error ? (
              <>
                <Text style={styles.message}>{error}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setError(null);
                    setAttempt((count) => count + 1);
                  }}
                  style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}>
                  <Text style={styles.buttonLabel}>Spróbuj ponownie</Text>
                </Pressable>
              </>
            ) : (
              <ActivityIndicator color="#AAA5A2" size="large" />
            )}
          </View>
        )}
      </View>

      <SiteFooter />
    </ScrollView>
  );
}

async function loadCompanyProfile(userId: string): Promise<CompanyProfile> {
  const place = await findOwnPlace(userId);

  if (!place) {
    throw new Error('Nie znaleziono Twojej firmy.');
  }

  return { place, hours: await getOpeningHours(place.id) };
}

function Photos() {
  const styles = useCompanyProfileScreenStyles();

  return (
    <>
      <View style={styles.photo}>
        <Image accessibilityLabel="" source={addPhotoIcon} style={styles.addPhotoIcon} />
      </View>
      <View style={styles.thumbnails}>
        {Array.from({ length: THUMBNAIL_COUNT }, (_, index) => (
          <View key={index} style={styles.thumbnail} />
        ))}
      </View>
    </>
  );
}

function PlaceSummary({ place }: { place: Place }) {
  const styles = useCompanyProfileScreenStyles();
  const address = [place.city, place.street].filter(Boolean).join(', ');

  return (
    <>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{place.name}</Text>
        <Image accessibilityLabel="" source={editIcon} style={styles.editIcon} />
      </View>
      {address !== '' && (
        <View style={styles.addressRow}>
          <Image accessibilityLabel="" source={locationIcon} style={styles.smallIcon} />
          <Text style={styles.address}>{address}</Text>
        </View>
      )}
      <View style={styles.bannerButton}>
        <Text style={styles.bannerButtonLabel}>Dodaj baner promocyjny</Text>
      </View>
    </>
  );
}

function Services() {
  const styles = useCompanyProfileScreenStyles();

  return (
    <>
      <Text style={styles.servicesTitle}>Dodaj usługi</Text>
      <View style={styles.serviceRow}>
        <View style={styles.serviceText}>
          <Text style={styles.serviceName}>Nazwa</Text>
          <Text style={styles.serviceDescription}>Tutaj dodaj opis usługi</Text>
        </View>
        <View style={styles.serviceDivider}>
          <Image accessibilityLabel="" source={dividerLine} style={styles.serviceDividerLine} />
        </View>
        <View style={styles.serviceDetails}>
          <View style={styles.serviceDetail}>
            <Image accessibilityLabel="" source={dollarIcon} style={styles.serviceDetailIcon} />
            <Text style={styles.serviceDetailText}>0,00zł</Text>
          </View>
          <View style={styles.serviceDetail}>
            <Image accessibilityLabel="" source={clockIcon} style={styles.serviceDetailIcon} />
            <Text style={styles.serviceDetailText}>0 min.</Text>
          </View>
        </View>
        <View style={styles.serviceButton}>
          <Text style={styles.buttonLabel}>Dodaj usługę</Text>
        </View>
      </View>
    </>
  );
}

/** The places service sends HH:MM:SS; the design shows HH:MM. */
function formatTime(time: string | null) {
  return time?.slice(0, 5) ?? '';
}

function DetailsCard({ place, hours }: CompanyProfile) {
  const styles = useCompanyProfileScreenStyles();
  const companyData = [
    place.name,
    place.nip && `NIP ${place.nip}`,
    [place.street, [place.postalCode, place.city].filter(Boolean).join(' ')]
      .filter(Boolean)
      .join(', '),
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <View style={styles.card}>
      <View style={styles.map}>
        <Image
          accessibilityLabel=""
          contentFit="cover"
          source={mapImage}
          style={styles.mapImage}
        />
        {/* The icon's cross is cut out of the circle; Figma shows it white, not the map. */}
        <View style={styles.addMapBacking} />
        <Image accessibilityLabel="" source={addMapIcon} style={styles.addMapIcon} />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardLabel}>O NAS</Text>
        <Text style={styles.cardText}>{SAMPLE_COMPANY_PROFILE.about}</Text>

        <View style={styles.cardSection}>
          <Text style={styles.cardLabel}>GODZINY OTWARCIA</Text>
          <View style={styles.hoursList}>
            {WEEK_DAYS.map(({ key, label }) => (
              <View key={key} style={styles.hoursRow}>
                <Text style={styles.detailText}>{label[0].toUpperCase() + label.slice(1)}</Text>
                <Text style={styles.detailText}>
                  {hours[`${key}Open`]
                    ? `${formatTime(hours[`${key}OpensAt`])} - ${formatTime(hours[`${key}ClosesAt`])}`
                    : 'zamknięte'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.cardLabel}>DANE FIRMY</Text>
          <Text style={styles.cardText}>{companyData}</Text>
          <View style={styles.contacts}>
            <View style={styles.contactRow}>
              <Image accessibilityLabel="" source={callIcon} style={styles.smallIcon} />
              <Text style={styles.detailText}>{SAMPLE_COMPANY_PROFILE.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Image accessibilityLabel="" source={smsIcon} style={styles.smallIcon} />
              <Text style={styles.detailText}>{SAMPLE_COMPANY_PROFILE.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.cardLabel}>SOCIAL MEDIA</Text>
          <View style={styles.socialIcons}>
            <Image accessibilityLabel="Facebook" source={facebookIcon} style={styles.socialIcon} />
            <Image accessibilityLabel="Instagram" source={instagramIcon} style={styles.socialIcon} />
            <Image accessibilityLabel="YouTube" source={youtubeIcon} style={styles.socialIconLarge} />
          </View>
        </View>
      </View>
    </View>
  );
}
