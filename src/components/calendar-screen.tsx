import { router, useIsFocused } from 'expo-router';
import { Fragment, useState } from 'react';
import {
  PanResponder,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CalendarTickIcon, SettingsIcon } from '@/components/account-icons';
import { getAppMenuHeight } from '@/components/app-menu';
import { BackArrowIcon } from '@/components/auth-icons';
import { MonthChevronIcon, NextMonthIcon, PreviousMonthIcon } from '@/components/calendar-icons';
import { useCalendarScreenStyles } from '@/components/calendar-screen.styles';
import { LocationIcon } from '@/components/company-icons';

const MONTHS = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

const WEEKDAYS = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB', 'NIE'];

// Placeholder visits from the Figma design until the visits API exists.
const VISITS = [
  { id: 'visit-1', date: new Date(2025, 11, 13, 12, 30), place: 'BarBarber', address: 'Główna 69, Poznań' },
  { id: 'visit-2', date: new Date(2025, 11, 18, 18, 0), place: 'Thai Massage', address: 'Lokalna 33, Poznań' },
  { id: 'visit-3', date: new Date(2026, 0, 13, 12, 30), place: 'BarBarber', address: 'Główna 69, Poznań' },
];

type Month = { year: number; month: number };

/** What the calendar card shows: one month's days, or the twelve months of a year. */
type CalendarView = Month & { mode: 'month' | 'year' };

// A swipe must travel this far sideways to change the month (or the year).
const SWIPE_DISTANCE = 50;

/** "Kalendarz" tab of the mobile layout ("Calendar" in Figma). */
export function CalendarScreen() {
  const styles = useCalendarScreenStyles();
  const { width } = useWindowDimensions();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [view, setView] = useState<CalendarView>(() => ({
    mode: 'month',
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth(),
  }));
  const shownMonth: Month = { year: view.year, month: view.month };
  const isYearView = view.mode === 'year';

  // Swiping left goes forward, swiping right goes back; only clearly sideways drags count, so
  // the page still scrolls and taps on days still work.
  const [swipe] = useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, { dx, dy }) =>
        Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.5,
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, { dx }) => {
        if (Math.abs(dx) >= SWIPE_DISTANCE) {
          setView((current) => shiftView(current, dx < 0 ? 1 : -1));
        }
      },
    }),
  );

  function goBack() {
    if (router.canGoBack()) router.back();
  }

  const visitDays = new Set(
    VISITS.filter((visit) => isInMonth(visit.date, shownMonth)).map((visit) => visit.date.getDate()),
  );

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      {isFocused && <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      <ScrollView contentContainerStyle={{ paddingBottom: getAppMenuHeight(width) + 24 }}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Wróć"
            accessibilityRole="button"
            onPress={goBack}
            style={({ pressed }) => pressed && styles.pressed}>
            <BackArrowIcon />
          </Pressable>
          {/* There is no settings screen yet. */}
          <Pressable
            accessibilityLabel="Ustawienia"
            accessibilityRole="button"
            style={({ pressed }) => pressed && styles.pressed}>
            <SettingsIcon />
          </Pressable>
        </View>

        <Text style={styles.title}>Kalendarz</Text>

        <View style={styles.picker} {...swipe.panHandlers}>
          <View style={styles.monthBar}>
            <Pressable
              accessibilityLabel={isYearView ? 'Wróć do miesiąca' : 'Wybierz miesiąc'}
              accessibilityRole="button"
              hitSlop={8}
              onPress={() =>
                setView((current) => ({ ...current, mode: isYearView ? 'month' : 'year' }))
              }
              style={({ pressed }) => [styles.monthName, pressed && styles.pressed]}>
              <Text style={styles.monthNameText}>
                {isYearView ? view.year : formatMonth(shownMonth)}
              </Text>
              {/* Points down while the year is open, like the iOS date picker. */}
              <MonthChevronIcon style={isYearView && styles.monthChevronOpen} />
            </Pressable>
            <View style={styles.monthArrows}>
              <Pressable
                accessibilityLabel={isYearView ? 'Poprzedni rok' : 'Poprzedni miesiąc'}
                accessibilityRole="button"
                hitSlop={12}
                onPress={() => setView((current) => shiftView(current, -1))}
                style={({ pressed }) => pressed && styles.pressed}>
                <PreviousMonthIcon />
              </Pressable>
              <Pressable
                accessibilityLabel={isYearView ? 'Następny rok' : 'Następny miesiąc'}
                accessibilityRole="button"
                hitSlop={12}
                onPress={() => setView((current) => shiftView(current, 1))}
                style={({ pressed }) => pressed && styles.pressed}>
                <NextMonthIcon />
              </Pressable>
            </View>
          </View>

          {isYearView ? (
            <View style={styles.yearMonths}>
              {MONTHS.map((name, month) => {
                // Marks the month of the selected day, as the day circle does in the month view.
                const selected = isInMonth(selectedDate, { year: view.year, month });

                return (
                  <Pressable
                    key={name}
                    accessibilityLabel={`${name} ${view.year}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => setView({ mode: 'month', year: view.year, month })}
                    style={[styles.yearMonth, selected && styles.daySelected]}>
                    <Text style={[styles.yearMonthText, selected && styles.dayTextSelected]}>
                      {name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <>
              <View style={[styles.week, styles.weekdays]}>
                {WEEKDAYS.map((weekday) => (
                  <Text key={weekday} style={styles.weekday}>
                    {weekday}
                  </Text>
                ))}
              </View>

              <View style={styles.weeks}>
                {getWeeks(shownMonth).map((week, weekIndex) => (
                  <View key={weekIndex} style={styles.week}>
                    {week.map((day, dayIndex) => {
                      if (day === null) {
                        return <View key={dayIndex} style={styles.day} />;
                      }

                      const date = new Date(shownMonth.year, shownMonth.month, day);
                      const selected = isSameDay(date, selectedDate);

                      return (
                        <Pressable
                          key={dayIndex}
                          accessibilityLabel={`${day} ${formatMonth(shownMonth)}`}
                          accessibilityRole="button"
                          accessibilityState={{ selected }}
                          onPress={() => setSelectedDate(date)}
                          style={[styles.day, selected && styles.daySelected]}>
                          <Text style={[styles.dayText, selected && styles.dayTextSelected]}>
                            {day}
                          </Text>
                          {visitDays.has(day) && <View style={styles.visitDot} />}
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>Twoje wizyty i spotkania</Text>
        <View style={styles.visits}>
          {VISITS.map((visit, index) => {
            const previous = VISITS[index - 1];
            // A divider marks where the list moves on to the next month.
            const newMonth = previous && !isInMonth(visit.date, monthOf(previous.date));

            return (
              <Fragment key={visit.id}>
                {newMonth && (
                  <View style={styles.monthDivider}>
                    <View style={styles.monthDividerLine} />
                    <Text style={styles.monthDividerText}>{formatMonth(monthOf(visit.date))}</Text>
                    <View style={styles.monthDividerLine} />
                  </View>
                )}
                <View style={styles.visitCard}>
                  <View style={styles.visitWhen}>
                    <View style={styles.visitTime}>
                      <CalendarTickIcon color="#E64F21" />
                      <Text style={styles.visitTimeText}>{formatTime(visit.date)}</Text>
                    </View>
                    <Text style={styles.visitDate}>{formatDate(visit.date)}</Text>
                  </View>
                  <View style={styles.visitDetails}>
                    <Text style={styles.visitPlace}>{visit.place}</Text>
                    <View style={styles.visitAddress}>
                      <LocationIcon color="#AAA5A2" width={12} height={12} />
                      <Text style={styles.visitAddressText}>{visit.address}</Text>
                    </View>
                  </View>
                </View>
              </Fragment>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/** Moves the calendar by `step` months, or by `step` years while the year is shown. */
function shiftView(view: CalendarView, step: number): CalendarView {
  if (view.mode === 'year') {
    return { ...view, year: view.year + step };
  }

  const date = new Date(view.year, view.month + step, 1);
  return { ...view, year: date.getFullYear(), month: date.getMonth() };
}

/** Days of the month in Monday-first weeks; `null` fills the days outside the month. */
function getWeeks({ year, month }: Month) {
  const leadingDays = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(leadingDays).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return Array.from({ length: cells.length / 7 }, (_, week) => cells.slice(week * 7, week * 7 + 7));
}

function monthOf(date: Date): Month {
  return { year: date.getFullYear(), month: date.getMonth() };
}

function isInMonth(date: Date, { year, month }: Month) {
  return date.getFullYear() === year && date.getMonth() === month;
}

function isSameDay(a: Date, b: Date) {
  return isInMonth(a, monthOf(b)) && a.getDate() === b.getDate();
}

function formatMonth({ year, month }: Month) {
  return `${MONTHS[month]} ${year}`;
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatDate(date: Date) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}
