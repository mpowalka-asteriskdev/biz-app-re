import { Image } from 'expo-image';
import { useState } from 'react';
import { Text, View } from 'react-native';

import {
  DirectoryPage,
  DirectoryPanel,
  findDirectoryEntry,
  numberDirectory,
} from '@/components/directory-page';
import { useDirectoryPageStyles } from '@/components/directory-page.styles';
import { Toggle } from '@/components/toggle';
import { SAMPLE_EMPLOYEE_DIRECTORY, SAMPLE_EMPLOYEE_PROFILE } from '@/constants/sample-employees';

const employeePhoto = require('@/assets/calendar/employee.png');
const editIcon = require('@/assets/company-profile/edit.svg');
const trashIcon = require('@/assets/directory/trash.svg');

const EMPLOYEES = numberDirectory(SAMPLE_EMPLOYEE_DIRECTORY);

/**
 * Pracownicy tab on desktop web ("Staff desktop" in Figma): the employee list and the selected
 * employee's details. The employees are sample data until the backend has them; only the name
 * comes from the list. The switches respond for this visit only; the edit icons, removing the
 * employee, the photo's "+" and "Dodaj pracownika" have no designs for what they open.
 */
export function EmployeesDesktopScreen() {
  const styles = useDirectoryPageStyles();
  const profile = SAMPLE_EMPLOYEE_PROFILE;
  const [selectedId, setSelectedId] = useState(0);
  const [filterOn, setFilterOn] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(profile.specialOffers);
  const [newOffers, setNewOffers] = useState(profile.newOffers);
  const employee = findDirectoryEntry(EMPLOYEES, selectedId);

  return (
    <DirectoryPage active="employees">
      <DirectoryPanel
        buttonLabel="Dodaj pracownika"
        controls={
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Włączenie filtra</Text>
            <Toggle label="Włączenie filtra" value={filterOn} onChange={setFilterOn} />
          </View>
        }
        groups={EMPLOYEES}
        onSelect={setSelectedId}
        searchLabel="Znajdź pracownika"
        selectedId={selectedId}
      />

      {employee && (
        <View style={[styles.details, styles.employeeDetails]}>
          <View style={styles.employeeSummary}>
            <View>
              <Image
                accessibilityLabel=""
                contentFit="cover"
                source={employeePhoto}
                style={styles.employeePhoto}
              />
              <View style={[styles.photoButton, styles.employeePhotoButton]}>
                <Text style={[styles.photoButtonLabel, styles.employeePhotoButtonLabel]}>+</Text>
              </View>
            </View>
            <View>
              <Text style={styles.employeeName}>
                {employee.firstName} {employee.lastName}
              </Text>
              <Text style={styles.employeeRole}>{profile.role}</Text>
            </View>
          </View>

          <View style={styles.employeeRows}>
            <View style={styles.employeeRow}>
              <Text style={styles.rowLabel}>Oferty specjalne</Text>
              <Toggle label="Oferty specjalne" value={specialOffers} onChange={setSpecialOffers} />
            </View>
            <View style={styles.employeeRow}>
              <Text style={styles.rowLabel}>Nowe oferty</Text>
              <Toggle label="Nowe oferty" value={newOffers} onChange={setNewOffers} />
            </View>
            <EmployeeField label="Twoje imię" value={employee.firstName} />
            <EmployeeField label="Twoje nazwisko" value={employee.lastName} />
            <EmployeeField label="Data urodzenia" value={profile.birthDate} />
            <EmployeeField label="Nr telefonu" value={profile.phone} />
            {profile.otherOptions.map((value, index) => (
              <EmployeeField key={index} label="Inne opcje" value={value} />
            ))}
            <View style={styles.employeeRow}>
              <Text style={[styles.rowLabel, styles.deleteLabel]}>Usuń profil pracownika</Text>
              <Image accessibilityLabel="" source={trashIcon} style={styles.editIcon} />
            </View>
          </View>
        </View>
      )}
    </DirectoryPage>
  );
}

function EmployeeField({ label, value }: { label: string; value: string }) {
  const styles = useDirectoryPageStyles();

  return (
    <View style={styles.employeeRow}>
      <Text style={[styles.rowLabel, styles.employeeFieldLabel]}>{label}</Text>
      <Text style={styles.employeeValue}>{value}</Text>
      <Image accessibilityLabel="" source={editIcon} style={styles.editIcon} />
    </View>
  );
}
