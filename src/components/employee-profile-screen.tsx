import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBusinessMenuHeight } from '@/components/business-menu';
import { useClientsScreenStyles } from '@/components/clients-screen.styles';
import { Toggle } from '@/components/toggle';
import type { DirectoryPerson } from '@/constants/sample-clients';
import { SAMPLE_EMPLOYEE_PROFILE } from '@/constants/sample-employees';

const backIcon = require('@/assets/app/back.svg');
const employeePhoto = require('@/assets/calendar/employee.png');
const editIcon = require('@/assets/company-profile/edit.svg');
const trashIcon = require('@/assets/directory/trash.svg');

/**
 * Employee profile on mobile web, opened from the Pracownicy list: the details of "Staff desktop"
 * in Figma, laid out like the Klienci client profile. The details are sample data until the
 * backend has employees; only the name comes from the list. The switches respond for this visit
 * only; the edit icons, removing the employee and the photo's "+" have no designs for what they
 * open.
 */
export function EmployeeProfileScreen({ employee }: { employee: DirectoryPerson }) {
  const router = useRouter();
  const styles = useClientsScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const profile = SAMPLE_EMPLOYEE_PROFILE;
  const [specialOffers, setSpecialOffers] = useState(profile.specialOffers);
  const [newOffers, setNewOffers] = useState(profile.newOffers);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          // The last row ends clear of the bottom menu.
          paddingBottom: getBusinessMenuHeight(width),
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Pressable
            accessibilityLabel="Wstecz"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => router.back()}
            style={({ pressed }) => pressed && styles.pressed}>
            <Image accessibilityLabel="" source={backIcon} style={styles.backIcon} />
          </Pressable>
        </View>

        <View style={styles.profileSummary}>
          <View>
            <Image
              accessibilityLabel=""
              contentFit="cover"
              source={employeePhoto}
              style={styles.photo}
            />
            <View style={styles.photoButton}>
              <Text style={styles.photoButtonLabel}>+</Text>
            </View>
          </View>
          <View>
            <Text style={styles.clientName}>
              {employee.firstName} {employee.lastName}
            </Text>
            <Text style={styles.employeeRole}>{profile.role}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Oferty specjalne</Text>
            <Toggle label="Oferty specjalne" value={specialOffers} onChange={setSpecialOffers} />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nowe oferty</Text>
            <Toggle label="Nowe oferty" value={newOffers} onChange={setNewOffers} />
          </View>
          <EmployeeField label="Twoje imię" value={employee.firstName} />
          <EmployeeField label="Twoje nazwisko" value={employee.lastName} />
          <EmployeeField label="Data urodzenia" value={profile.birthDate} />
          <EmployeeField label="Nr telefonu" value={profile.phone} />
          {profile.otherOptions.map((value, index) => (
            <EmployeeField key={index} label="Inne opcje" value={value} />
          ))}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Usuń profil pracownika</Text>
            <Image accessibilityLabel="" source={trashIcon} style={styles.editIcon} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function EmployeeField({ label, value }: { label: string; value: string }) {
  const styles = useClientsScreenStyles();

  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.employeeField}>
        <Text style={styles.employeeValue}>{value}</Text>
        <Image accessibilityLabel="" source={editIcon} style={styles.editIcon} />
      </View>
    </View>
  );
}
