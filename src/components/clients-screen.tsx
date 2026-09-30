import { Image } from 'expo-image';
import { useIsFocused, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBusinessMenuHeight } from '@/components/business-menu';
import { useClientsScreenStyles } from '@/components/clients-screen.styles';
import { SAMPLE_CLIENTS } from '@/constants/sample-clients';

const searchIcon = require('@/assets/clients/search.svg');
const filterIcon = require('@/assets/clients/filter.svg');
const chevronIcon = require('@/assets/onboarding/chevron-right.svg');

/**
 * Klienci tab ("Clients list" in Figma): search, the Lista / Grupy klientów switch and the client
 * list. The clients are sample data until the backend has them. The search, the rows (client
 * profiles) and "+" (the new client form) work; the filter and the groups have no designs yet.
 */
export function ClientsScreen() {
  const router = useRouter();
  const styles = useClientsScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();
  const [query, setQuery] = useState('');

  const search = query.trim().toLocaleLowerCase('pl');
  // Each client keeps its list position, which the profile route uses as the id.
  const clients = SAMPLE_CLIENTS.map((name, id) => ({ name, id })).filter(({ name }) =>
    name.toLocaleLowerCase('pl').includes(search),
  );

  return (
    <View style={styles.screen}>
      {isFocused && <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      <ScrollView
        contentContainerStyle={[
          styles.content,
          // Starts right under the status bar; the list ends clear of the bottom menu.
          { paddingTop: insets.top, paddingBottom: getBusinessMenuHeight(width) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.search}>
          <Image accessibilityLabel="" source={searchIcon} style={styles.searchIcon} />
          <TextInput
            accessibilityLabel="Znajdź klienta"
            onChangeText={setQuery}
            placeholder="Znajdź klienta"
            placeholderTextColor="#AAA5A2"
            returnKeyType="search"
            selectionColor="#E64F21"
            style={styles.searchInput}
            value={query}
          />
          <View style={styles.filterButton}>
            <Image accessibilityLabel="" source={filterIcon} style={styles.searchIcon} />
          </View>
        </View>

        <View style={styles.picker}>
          <View style={[styles.pickerOption, styles.pickerOptionSelected]}>
            <Text style={[styles.pickerLabel, styles.pickerLabelSelected]}>Lista</Text>
          </View>
          <View style={styles.pickerOption}>
            <Text style={styles.pickerLabel}>Grupy klientów</Text>
          </View>
        </View>

        <Text style={styles.title}>Lista klientów</Text>

        {clients.map(({ name, id }) => (
          <Pressable
            key={id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/clients/[id]', params: { id: String(id) } })}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <Text style={styles.rowLabel}>{name}</Text>
            <Image accessibilityLabel="" source={chevronIcon} style={styles.chevron} />
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        accessibilityLabel="Dodaj klienta"
        accessibilityRole="button"
        onPress={() => router.push('/clients/new')}
        style={({ pressed }) => [styles.addClientButton, pressed && styles.pressed]}>
        <Text style={styles.addClientButtonLabel}>+</Text>
      </Pressable>
    </View>
  );
}
