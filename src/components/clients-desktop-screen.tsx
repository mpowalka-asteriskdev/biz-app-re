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
import { SAMPLE_CLIENT_DIRECTORY, SAMPLE_CLIENT_PROFILE } from '@/constants/sample-clients';

const clientPhoto = require('@/assets/clients/client-photo.png');

const CLIENTS = numberDirectory(SAMPLE_CLIENT_DIRECTORY);

/**
 * Klienci tab on desktop web ("Clients desktop" in Figma): the client list and the selected
 * client's details. The clients are sample data until the backend has them; only the name comes
 * from the list. "Grupy klientów", the photo's "+" and "Dodaj klienta" have no desktop designs.
 */
export function ClientsDesktopScreen() {
  const styles = useDirectoryPageStyles();
  const [selectedId, setSelectedId] = useState(0);
  const [trusted, setTrusted] = useState(SAMPLE_CLIENT_PROFILE.trusted);
  const client = findDirectoryEntry(CLIENTS, selectedId);
  const profile = SAMPLE_CLIENT_PROFILE;

  return (
    <DirectoryPage active="clients">
      <DirectoryPanel
        buttonLabel="Dodaj klienta"
        controls={
          <View style={styles.picker}>
            <View style={[styles.pickerOption, styles.pickerOptionSelected]}>
              <Text style={[styles.pickerLabel, styles.pickerLabelSelected]}>Lista</Text>
            </View>
            <View style={styles.pickerOption}>
              <Text style={styles.pickerLabel}>Grupy klientów</Text>
            </View>
          </View>
        }
        groups={CLIENTS}
        onSelect={setSelectedId}
        searchLabel="Znajdź klienta"
        selectedId={selectedId}
      />

      {client && (
        <View style={[styles.details, styles.clientDetails]}>
          <View style={styles.clientSummary}>
            <View>
              <Image
                accessibilityLabel=""
                contentFit="cover"
                source={clientPhoto}
                style={styles.clientPhoto}
              />
              <View style={[styles.photoButton, styles.clientPhotoButton]}>
                <Text style={[styles.photoButtonLabel, styles.clientPhotoButtonLabel]}>+</Text>
              </View>
            </View>
            <View>
              <Text style={styles.clientName}>
                {client.firstName} {client.lastName}
              </Text>
              <View style={styles.tags}>
                <View style={styles.tag}>
                  <Text style={styles.tagLabel}>Rabat {profile.discount}%</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagLabel}>Odwołania {profile.cancellations}%</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.clientRows}>
            <ClientRow label="Najbliższa wizyta" value={profile.nextVisit} />
            <ClientRow label="Stały rabat" value={`${profile.discount}%`} />
            <View style={styles.clientRow}>
              <Text style={styles.rowLabel}>Zaufany klient</Text>
              <Toggle label="Zaufany klient" value={trusted} onChange={setTrusted} />
            </View>

            <Text style={styles.sectionTitle}>Dane klienta</Text>
            <ClientRow label="Imię" value={client.firstName} />
            <ClientRow label="Nazwisko" value={client.lastName} />
            <ClientRow label="Data urodzenia" value={profile.birthDate} />
            <ClientRow label="Nr telefonu" value={profile.phone} />

            <Text style={styles.sectionTitle}>Statystyki</Text>
            <ClientRow label="Wizyty" value={String(profile.visits)} />
            <ClientRow label="Nieobecności" value={String(profile.absences)} />
            <ClientRow label="Ostatnia wizyta" value={profile.lastVisit} />
            <ClientRow label="Całkowity przychód" value={profile.revenue} />
            <ClientRow label="Data dołączenia" value={profile.joined} />
          </View>

          <Text style={styles.notesTitle}>Notatki</Text>
          {profile.notes.map((note) => (
            <Text key={note} style={styles.note}>
              {note}
            </Text>
          ))}
        </View>
      )}
    </DirectoryPage>
  );
}

function ClientRow({ label, value }: { label: string; value: string }) {
  const styles = useDirectoryPageStyles();

  return (
    <View style={styles.clientRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.clientValue}>{value}</Text>
    </View>
  );
}
