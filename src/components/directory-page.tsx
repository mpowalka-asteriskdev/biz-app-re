import { Image } from 'expo-image';
import { type ReactNode, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { BusinessHeader, type BusinessSection } from '@/components/business-header';
import { useDirectoryPageStyles } from '@/components/directory-page.styles';
import { SiteFooter } from '@/components/site-footer';
import type { DirectoryGroup, DirectoryPerson } from '@/constants/sample-clients';

const searchIcon = require('@/assets/clients/search.svg');
const filterIcon = require('@/assets/clients/filter.svg');
const arrowIcon = require('@/assets/directory/arrow-right.svg');
const selectedArrowIcon = require('@/assets/directory/arrow-right-selected.svg');

export type DirectoryEntry = DirectoryPerson & { id: number };
export type NumberedDirectoryGroup = { letter: string | null; people: DirectoryEntry[] };

/** Gives everyone in the list a number, which the page uses to select them. */
export function numberDirectory(groups: DirectoryGroup[]): NumberedDirectoryGroup[] {
  const offsets = groups.map((_, index) =>
    groups.slice(0, index).reduce((count, group) => count + group.people.length, 0),
  );

  return groups.map((group, index) => ({
    letter: group.letter,
    people: group.people.map((person, position) => ({ ...person, id: offsets[index] + position })),
  }));
}

export function findDirectoryEntry(groups: NumberedDirectoryGroup[], id: number) {
  return groups.flatMap((group) => group.people).find((person) => person.id === id);
}

/** Desktop page with a list panel next to the selected person's details. */
export function DirectoryPage({
  active,
  children,
}: {
  active: BusinessSection;
  children: ReactNode;
}) {
  const styles = useDirectoryPageStyles();

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
      <BusinessHeader active={active} />
      <View style={styles.content}>
        <View style={styles.columns}>{children}</View>
      </View>
      <SiteFooter />
    </ScrollView>
  );
}

/**
 * Left panel: search, the page's own controls, the list (surname first) and the add button.
 * The search filters the list; the filter button and the add button have no designs yet.
 */
export function DirectoryPanel({
  searchLabel,
  controls,
  groups,
  selectedId,
  onSelect,
  buttonLabel,
}: {
  searchLabel: string;
  controls: ReactNode;
  groups: NumberedDirectoryGroup[];
  selectedId: number;
  onSelect: (id: number) => void;
  buttonLabel: string;
}) {
  const styles = useDirectoryPageStyles();
  const [query, setQuery] = useState('');
  const search = query.trim().toLocaleLowerCase('pl');
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      people: group.people.filter((person) =>
        `${person.lastName} ${person.firstName}`.toLocaleLowerCase('pl').includes(search),
      ),
    }))
    .filter((group) => group.people.length > 0);

  return (
    <View style={styles.panel}>
      <View style={styles.panelCard}>
        <View style={styles.search}>
          <Image accessibilityLabel="" source={searchIcon} style={styles.searchIcon} />
          <TextInput
            accessibilityLabel={searchLabel}
            onChangeText={setQuery}
            placeholder={searchLabel}
            placeholderTextColor="#AAA5A2"
            selectionColor="#E64F21"
            style={styles.searchInput}
            value={query}
          />
          <View style={styles.filterButton}>
            <Image accessibilityLabel="" source={filterIcon} style={styles.searchIcon} />
          </View>
        </View>

        {controls}

        <ScrollView contentContainerStyle={styles.listContent} style={styles.list}>
          {visibleGroups.map((group) => (
            <View key={group.letter ?? ''}>
              {group.letter && (
                <View style={styles.listRow}>
                  <Text style={styles.listLetter}>{group.letter}</Text>
                </View>
              )}
              {group.people.map((person) => {
                const selected = person.id === selectedId;

                return (
                  <Pressable
                    key={person.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => onSelect(person.id)}
                    style={({ pressed }) => [styles.listRow, pressed && styles.pressed]}>
                    <Text style={[styles.listName, selected && styles.listNameSelected]}>
                      {person.lastName} {person.firstName}
                    </Text>
                    {selected ? (
                      <View style={styles.arrowSelected}>
                        <Image accessibilityLabel="" source={selectedArrowIcon} style={styles.arrow} />
                      </View>
                    ) : (
                      <Image accessibilityLabel="" source={arrowIcon} style={styles.arrow} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.panelButton}>
        <Text style={styles.panelButtonLabel}>{buttonLabel}</Text>
      </View>
    </View>
  );
}
