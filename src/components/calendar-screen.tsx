import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  type StyleProp,
  Text,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BusinessHeader } from '@/components/business-header';
import { getBusinessMenuHeight } from '@/components/business-menu';
import { useCalendarScreenStyles } from '@/components/calendar-screen.styles';
import { APPOINTMENT_COLORS } from '@/components/calendar-screen.styles.shared';
import { SiteFooter } from '@/components/site-footer';
import {
  type AppointmentKind,
  SAMPLE_APPOINTMENTS,
  SAMPLE_EMPLOYEES,
  type SampleAppointment,
  type SampleEmployee,
} from '@/constants/sample-calendar';
import { usePlatformLayout } from '@/hooks/use-platform-layout';

const employeePhoto = require('@/assets/calendar/employee.png');
const documentIcon = require('@/assets/calendar/document.svg');
const arrowLargeIcon = require('@/assets/calendar/arrow-large.svg');
const arrowIcon = require('@/assets/calendar/arrow.svg');
const arrowActiveIcon = require('@/assets/calendar/arrow-active.svg');
const settingsIcon = require('@/assets/calendar/settings.svg');

const PAYMENT_ICONS: Record<AppointmentKind, number> = {
  haircut: require('@/assets/calendar/dollar-green.svg'),
  combo: require('@/assets/calendar/dollar-blue.svg'),
  beard: require('@/assets/calendar/dollar-red.svg'),
};

// The design has no blue tick, so a confirmed combo shows only the payment icon.
const CONFIRMED_ICONS: Partial<Record<AppointmentKind, number>> = {
  haircut: require('@/assets/calendar/tick-green.svg'),
  beard: require('@/assets/calendar/tick-red.svg'),
};

const EMPLOYEE_MENU = ['Harmonogram', 'Dane pracownika', 'Wizyty do oceny'];

const WEEKDAY_NAMES = [
  'niedziela',
  'poniedziałek',
  'wtorek',
  'środa',
  'czwartek',
  'piątek',
  'sobota',
];

const MONTH_NAMES = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia',
];

// The grid runs 8:00-16:00 in 15-minute rows of 20px; the 8:00 line is 10px from the top.
const DAY_START = 8 * 60;
const DAY_END = 16 * 60;
const SLOT_MINUTES = 15;
const SLOT_HEIGHT = 20;
const GRID_TOP = 10;
const SLOTS = Array.from(
  { length: (DAY_END - DAY_START) / SLOT_MINUTES + 1 },
  (_, index) => DAY_START + index * SLOT_MINUTES,
);

function toMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function offsetFor(minutes: number) {
  return GRID_TOP + ((minutes - DAY_START) / SLOT_MINUTES) * SLOT_HEIGHT;
}

/** Full hours as "9:00", quarters as "15", "30", "45". */
function slotLabel(minutes: number) {
  const quarter = minutes % 60;
  return quarter === 0 ? `${minutes / 60}:00` : String(quarter);
}

/** E.g. "poniedziałek, 1. grudnia". */
function formatDay(date: Date) {
  return `${WEEKDAY_NAMES[date.getDay()]}, ${date.getDate()}. ${MONTH_NAMES[date.getMonth()]}`;
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Updated every minute, for the current-time line. */
function useCurrentTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  return now;
}

/**
 * Calendar of the business app, its page after login. The employees and appointments are sample
 * data until the backend has them; the entries and buttons do nothing yet.
 */
export function CalendarScreen() {
  const { isWebDesktop } = usePlatformLayout();
  const now = useCurrentTime();

  return isWebDesktop ? <DesktopCalendar now={now} /> : <PhoneCalendar now={now} />;
}

/** "Main calendar": the employee on top and one day per page; swiping shows the next days. */
function PhoneCalendar({ now }: { now: Date }) {
  const router = useRouter();
  const styles = useCalendarScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Today, tomorrow and the day after, as in the Figma frame.
  const days = [0, 1, 2].map((offset) => addDays(now, offset));

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={[styles.phoneEmployee, { paddingTop: insets.top + 3 }]}>
        <EmployeeRow employee={SAMPLE_EMPLOYEES[0]} />
      </View>

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.phoneDays}>
        {days.map((day, index) => (
          <DayColumn
            key={index}
            appointments={index === 0 ? SAMPLE_APPOINTMENTS : []}
            date={day}
            now={index === 0 ? now : null}
            // The grid scrolls under the day's heading and ends clear of the bottom menu.
            scrollBottomInset={getBusinessMenuHeight(width)}
            style={[styles.phoneDay, { width }]}
          />
        ))}
      </ScrollView>

      {/* The new visit form is designed for Android only so far. */}
      <Pressable
        accessibilityLabel="Dodaj wizytę"
        accessibilityRole="button"
        disabled={Platform.OS !== 'android'}
        onPress={() => router.push('/visits/new')}
        style={({ pressed }) => [styles.addVisitButton, pressed && styles.pressed]}>
        <Text style={styles.addVisitButtonLabel}>+</Text>
      </Pressable>
    </View>
  );
}

/** "Calendar desktop": header, employee panel next to the days, and the site footer. */
function DesktopCalendar({ now }: { now: Date }) {
  const styles = useCalendarScreenStyles();
  const { width } = useWindowDimensions();

  // Figma shows today and tomorrow; a window too narrow for both (the panel, two days and the
  // page margins take 1353px) shows today only.
  const dayCount = width >= 1353 ? 2 : 1;
  const days = Array.from({ length: dayCount }, (_, index) => addDays(now, index));

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <BusinessHeader active="calendar" />

      <View style={styles.content}>
        <View style={styles.columns}>
          <EmployeePanel />
          <View style={styles.days}>
            {days.map((day, index) => (
              <DayColumn
                key={index}
                appointments={index === 0 ? SAMPLE_APPOINTMENTS : []}
                date={day}
                now={index === 0 ? now : null}
              />
            ))}
          </View>
        </View>
      </View>

      <SiteFooter />
    </ScrollView>
  );
}

function EmployeePanel() {
  const styles = useCalendarScreenStyles();
  const [current, ...others] = SAMPLE_EMPLOYEES;

  return (
    <View style={styles.sidebar}>
      <View style={styles.panel}>
        <EmployeeRow employee={current} />

        <View style={styles.employeeMenu}>
          {EMPLOYEE_MENU.map((label, index) => {
            // The calendar is the employee's schedule.
            const active = index === 0;

            return (
              <View key={label} style={styles.employeeMenuRow}>
                <Text style={[styles.employeeMenuLabel, active && styles.employeeMenuLabelActive]}>
                  {label}
                </Text>
                {active ? (
                  <View style={styles.arrowActive}>
                    <Image accessibilityLabel="" source={arrowActiveIcon} style={styles.arrow} />
                  </View>
                ) : (
                  <Image accessibilityLabel="" source={arrowIcon} style={styles.arrow} />
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.otherEmployees}>
          {others.map((employee) => (
            <EmployeeRow key={employee.name} employee={employee} inactive />
          ))}
        </View>
      </View>

      <View style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Dodaj wizytę</Text>
      </View>
    </View>
  );
}

function EmployeeRow({ employee, inactive = false }: { employee: SampleEmployee; inactive?: boolean }) {
  const styles = useCalendarScreenStyles();

  return (
    <View style={[styles.employeeRow, inactive && styles.employeeRowInactive]}>
      <Image
        accessibilityLabel=""
        contentFit="cover"
        source={employeePhoto}
        style={styles.employeePhoto}
      />
      <View style={styles.employeeDetails}>
        <Text style={styles.employeePlace}>{employee.place}</Text>
        <Text style={styles.employeeName}>{employee.name}</Text>
        <View style={styles.employeeOccupancy}>
          <Image accessibilityLabel="" source={documentIcon} style={styles.smallIcon} />
          <Text style={styles.employeeOccupancyText}>obłożenie {employee.occupancy}%</Text>
        </View>
      </View>
      <Image accessibilityLabel="" source={arrowLargeIcon} style={styles.employeeArrow} />
    </View>
  );
}

function DayColumn({
  date,
  now,
  appointments,
  scrollBottomInset,
  style,
}: {
  date: Date;
  /** Only today's column shows the current-time line. */
  now: Date | null;
  appointments: SampleAppointment[];
  /** On phones the grid scrolls under the heading; this keeps its end clear of the menu. */
  scrollBottomInset?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const styles = useCalendarScreenStyles();
  const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : null;
  const nowOffset =
    nowMinutes !== null && nowMinutes >= DAY_START && nowMinutes <= DAY_END
      ? offsetFor(nowMinutes)
      : null;

  const grid = (
    <View style={styles.grid}>
      {SLOTS.map((minutes) => {
        const hour = minutes % 60 === 0;
        const top = offsetFor(minutes);

        return (
          <Fragment key={minutes}>
            <Text style={[styles.gridLabel, hour && styles.gridLabelHour, { top: top - 10 }]}>
              {slotLabel(minutes)}
            </Text>
            <View style={[styles.gridLine, hour && styles.gridLineHour, { top }]} />
          </Fragment>
        );
      })}

      {appointments.map((appointment) => (
        <AppointmentBlock key={appointment.start} appointment={appointment} />
      ))}

      {nowOffset !== null && (
        <>
          <View style={[styles.nowLine, { top: nowOffset - 1 }]} />
          <View style={[styles.nowDot, { top: nowOffset - 5 }]} />
        </>
      )}
    </View>
  );

  return (
    <View style={[styles.day, style]}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayTitle}>{formatDay(date)}</Text>
        <Text style={styles.daySubtitle}>otwarte zgodnie z harmonogramem</Text>
        <Image accessibilityLabel="" source={settingsIcon} style={styles.daySettings} />
      </View>

      {scrollBottomInset === undefined ? (
        grid
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: scrollBottomInset }}
          showsVerticalScrollIndicator={false}>
          {grid}
        </ScrollView>
      )}
    </View>
  );
}

function AppointmentBlock({ appointment }: { appointment: SampleAppointment }) {
  const styles = useCalendarScreenStyles();
  const top = offsetFor(toMinutes(appointment.start));
  const bottom = offsetFor(toMinutes(appointment.end));
  const confirmedIcon = CONFIRMED_ICONS[appointment.kind];

  return (
    <View
      style={[
        styles.appointment,
        APPOINTMENT_COLORS[appointment.kind],
        { top, height: bottom - top },
      ]}>
      <Text style={styles.appointmentTime}>
        {appointment.start} - {appointment.end}
      </Text>
      <Text style={styles.appointmentClient}>{appointment.client}</Text>
      <Text style={styles.appointmentService}>{appointment.service}</Text>
      <View style={styles.appointmentIcons}>
        <Image
          accessibilityLabel=""
          source={PAYMENT_ICONS[appointment.kind]}
          style={styles.smallIcon}
        />
        {appointment.confirmed && confirmedIcon && (
          <Image accessibilityLabel="" source={confirmedIcon} style={styles.smallIcon} />
        )}
      </View>
    </View>
  );
}
