import { Image } from 'expo-image';
import { useIsFocused, useRouter } from 'expo-router';
import { Fragment, useState } from 'react';
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
import { useSalesScreenStyles } from '@/components/sales-screen.styles';
import { type SampleSale, SAMPLE_SALES } from '@/constants/sample-sales';

const backIcon = require('@/assets/app/back.svg');
const settingsIcon = require('@/assets/calendar/settings.svg');
const arrowDownIcon = require('@/assets/app/arrow-down.svg');
const amountIcon = require('@/assets/sales/amount.svg');
const dollarIcon = require('@/assets/sales/dollar.svg');
const employeeIcon = require('@/assets/sales/employee.svg');

// "Usługa" is not in the Figma frame; it repeats "Klient" with the new visit form's service icon.
const CHOICES = [
  { label: 'Klient', icon: require('@/assets/visits/client.svg') },
  { label: 'Usługa', icon: require('@/assets/visits/service.svg') },
];

/**
 * Sprzedaż tab ("Sales" in Figma): a sale's amount, client and service, and the completed sales.
 * The sales are sample data and there's no sales backend yet, so "Dodaj" does nothing; the
 * dropdowns' lists and the settings aren't designed yet.
 */
export function SalesScreen() {
  const router = useRouter();
  const styles = useSalesScreenStyles();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Tab screens stay mounted, so only the visible one may set the status bar style.
  const isFocused = useIsFocused();
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.screen}>
      {isFocused && <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          // The list ends clear of the bottom menu.
          paddingBottom: getBusinessMenuHeight(width),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* The tabs go back to the first one, Kalendarz. */}
          <Pressable
            accessibilityLabel="Wstecz"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => router.back()}
            style={({ pressed }) => pressed && styles.pressed}>
            <Image accessibilityLabel="" source={backIcon} style={styles.headerIcon} />
          </Pressable>
          <Image accessibilityLabel="" source={settingsIcon} style={styles.headerIcon} />
        </View>

        <View style={styles.addRow}>
          <View style={[styles.field, styles.amountField]}>
            <Image accessibilityLabel="" source={amountIcon} style={styles.fieldIcon} />
            <TextInput
              accessibilityLabel="Kwota"
              inputMode="decimal"
              keyboardType="decimal-pad"
              onChangeText={setAmount}
              placeholder="0,00"
              placeholderTextColor="#201F1E"
              selectionColor="#E64F21"
              style={[styles.fieldText, styles.amountInput]}
              value={amount}
            />
          </View>
          <View style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Dodaj</Text>
          </View>
        </View>

        <View style={styles.choices}>
          {CHOICES.map((choice) => (
            <View key={choice.label} style={styles.field}>
              <Image accessibilityLabel="" source={choice.icon} style={styles.fieldIcon} />
              <Text style={styles.fieldText}>{choice.label}</Text>
              <Image accessibilityLabel="" source={arrowDownIcon} style={styles.fieldIcon} />
            </View>
          ))}
        </View>

        <Text style={styles.title}>Zrealizowane sprzedaże</Text>

        <View style={styles.list}>
          {SAMPLE_SALES.map((group, groupIndex) => (
            <Fragment key={group.month ?? groupIndex}>
              {group.month && (
                <View style={styles.monthSeparator}>
                  <View style={styles.monthLine} />
                  <Text style={styles.monthLabel}>{group.month}</Text>
                  <View style={styles.monthLine} />
                </View>
              )}
              {group.sales.map((sale, index) => (
                <SaleCard key={index} sale={sale} />
              ))}
            </Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function SaleCard({ sale }: { sale: SampleSale }) {
  const styles = useSalesScreenStyles();

  return (
    <View style={styles.card}>
      <View style={styles.cardPayment}>
        <View style={styles.cardAmountRow}>
          <Image accessibilityLabel="" source={dollarIcon} style={styles.dollarIcon} />
          <Text style={styles.cardAmount}>{sale.amount}</Text>
        </View>
        <Text style={styles.cardDate}>{sale.date}</Text>
      </View>
      <View style={styles.cardDetails}>
        <Text numberOfLines={1} style={styles.cardService}>
          {sale.service}
        </Text>
        <View style={styles.cardEmployeeRow}>
          <Image accessibilityLabel="" source={employeeIcon} style={styles.employeeIcon} />
          <Text style={styles.cardEmployee}>{sale.employee}</Text>
        </View>
      </View>
    </View>
  );
}
