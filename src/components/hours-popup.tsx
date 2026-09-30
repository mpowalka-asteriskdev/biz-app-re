import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { DayHours } from '@/components/onboarding-context';
import { Checkbox } from '@/components/onboarding-screen';
import { useOnboardingStyles } from '@/components/onboarding.styles';
import { TIME_OPTIONS } from '@/constants/onboarding';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

const backIcon = require('@/assets/onboarding/back.svg');
const chevronIcon = require('@/assets/onboarding/chevron-small.svg');
const uncheckedIcon = require('@/assets/onboarding/tick-square-grey.svg');

const TIME_OPTION_HEIGHT = 28;

type HoursPopupProps = {
  /** Lower-case day name, as in the hours list. */
  day: string;
  hours: DayHours;
  onClose: () => void;
  /** The "+" button; with `sameForAll` the hours apply to every day of the week. */
  onSave: (from: string, to: string, sameForAll: boolean) => void;
};

/** "Godziny otwarcia popup": opening and closing time of one day. */
export function HoursPopup({ day, hours, onClose, onSave }: HoursPopupProps) {
  const styles = useOnboardingStyles();
  const insets = useSafeAreaInsets();
  const { isWebDesktop } = usePlatformLayout();
  const [from, setFrom] = useState(hours.from);
  const [to, setTo] = useState(hours.to);
  const [sameForAll, setSameForAll] = useState(false);
  const [openList, setOpenList] = useState<'from' | 'to' | null>(null);

  const fromIndex = TIME_OPTIONS.indexOf(from);
  const toIndex = TIME_OPTIONS.indexOf(to);

  return (
    <Modal animationType="fade" onRequestClose={onClose} statusBarTranslucent transparent visible>
      {/* On phones the card sits just below the status bar, 54px from the top in Figma; desktop
          web centres it over the steps' card. */}
      <View
        style={[
          styles.overlay,
          isWebDesktop ? styles.overlayCentered : { paddingTop: Math.max(insets.top, 54) },
        ]}>
        <Pressable accessibilityLabel="Zamknij" onPress={onClose} style={styles.backdrop} />

        <View style={styles.hoursCard}>
          <View style={styles.hoursCardHeader}>
            <Pressable
              accessibilityLabel="Wstecz"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onClose}
              style={({ pressed }) => pressed && styles.pressed}>
              <Image accessibilityLabel="" source={backIcon} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.hoursCardTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
          </View>

          {/* Each list only offers times that keep opening before closing. */}
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Od</Text>
            <TimeSelect
              label="Od"
              value={from}
              options={TIME_OPTIONS.slice(0, toIndex)}
              open={openList === 'from'}
              onToggle={() => setOpenList(openList === 'from' ? null : 'from')}
              onChange={(value) => {
                setFrom(value);
                setOpenList(null);
              }}
            />
            <Text style={styles.timeLabel}>do</Text>
            <TimeSelect
              label="do"
              value={to}
              options={TIME_OPTIONS.slice(fromIndex + 1)}
              open={openList === 'to'}
              onToggle={() => setOpenList(openList === 'to' ? null : 'to')}
              onChange={(value) => {
                setTo(value);
                setOpenList(null);
              }}
            />
          </View>

          <Checkbox
            checked={sameForAll}
            label="Te same godziny dla każdego dnia"
            onChange={setSameForAll}
            style={styles.sameHoursRow}
            uncheckedIcon={uncheckedIcon}
          />

          <Pressable
            accessibilityLabel="Zapisz godziny"
            accessibilityRole="button"
            onPress={() => onSave(from, to, sameForAll)}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
            <Text style={styles.addButtonLabel}>+</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function TimeSelect({
  label,
  value,
  options,
  open,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  const styles = useOnboardingStyles();
  const listRef = useRef<ScrollView>(null);

  return (
    <View>
      <Pressable
        accessibilityLabel={`${label} ${value}`}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        style={({ pressed }) => [styles.timeSelect, pressed && styles.pressed]}>
        <Image accessibilityLabel="" source={chevronIcon} style={styles.timeSelectIcon} />
        <Text style={styles.timeValue}>{value}</Text>
      </Pressable>

      {open && (
        <ScrollView
          ref={listRef}
          nestedScrollEnabled
          // Opens with the current time in view, two rows from the top.
          onLayout={() =>
            listRef.current?.scrollTo({
              y: Math.max(0, (options.indexOf(value) - 2) * TIME_OPTION_HEIGHT),
              animated: false,
            })
          }
          style={styles.timeOptions}>
          {options.map((option) => (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: option === value }}
              onPress={() => onChange(option)}
              style={({ pressed }) => [styles.timeOption, pressed && styles.pressed]}>
              <Text style={[styles.timeOptionText, option === value && styles.timeOptionSelected]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
