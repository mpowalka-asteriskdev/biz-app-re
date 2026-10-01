import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBusinessMenuHeight } from '@/components/business-menu';
import { useClientsScreenStyles } from '@/components/clients-screen.styles';
import { Toggle } from '@/components/toggle';
import { SAMPLE_EMPLOYEES } from '@/constants/sample-employees';

const searchIcon = require('@/assets/clients/search.svg');
const filterIcon = require('@/assets/clients/filter.svg');
const chevronIcon = require('@/assets/onboarding/chevron-right.svg');

/**
 * Pracownicy tab on mobile web: the list of "Staff desktop" in Figma, laid out like the Klienci
 * list, whose styles it shares. The employees are sample data until the backend has them. The
 * search and the rows (employee profiles) work, and the switch responds for this visit only; the
 * filter, the switch and "+" have no designs for what they do.
 */
export function EmployeesScreen() {
  const router = useRouter();
  const styles = useClientsScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [filterOn, setFilterOn] = useState(true);

  const search = query.trim().toLocaleLowerCase('pl');
  // Each employee keeps their list position, which the profile route uses as the id.
  const employees = SAMPLE_EMPLOYEES.map((person, id) => ({ ...person, id })).filter(
    ({ firstName, lastName }) =>
      `${firstName} ${lastName}`.toLocaleLowerCase('pl').includes(search),
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          // The list ends clear of the bottom menu.
          { paddingTop: insets.top, paddingBottom: getBusinessMenuHeight(width) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.search}>
          <Image accessibilityLabel="" source={searchIcon} style={styles.searchIcon} />
          <TextInput
            accessibilityLabel="Znajdź pracownika"
            onChangeText={setQuery}
            placeholder="Znajdź pracownika"
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

        <View style={[styles.row, styles.filterRow]}>
          <Text style={styles.rowLabel}>Włączenie filtra</Text>
          <Toggle label="Włączenie filtra" value={filterOn} onChange={setFilterOn} />
        </View>

        <Text style={styles.title}>Lista pracowników</Text>

        {employees.map(({ firstName, lastName, id }) => (
          <Pressable
            key={id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/employees/[id]', params: { id: String(id) } })}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <Text style={styles.rowLabel}>
              {firstName} {lastName}
            </Text>
            <Image accessibilityLabel="" source={chevronIcon} style={styles.chevron} />
          </Pressable>
        ))}
      </ScrollView>

      <View accessibilityLabel="Dodaj pracownika" style={styles.addClientButton}>
        <Text style={styles.addClientButtonLabel}>+</Text>
      </View>
    </View>
  );
}
