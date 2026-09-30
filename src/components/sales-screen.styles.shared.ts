import { StyleSheet } from 'react-native';

const TEXT = '#201F1E';
const MUTED = '#AAA5A2';

/** Sprzedaż screen ("Sales" in Figma); only the Android design exists so far. */
export const sharedSalesScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  headerIcon: {
    width: 36,
    height: 36,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 19,
    marginTop: 23,
    paddingLeft: 27,
  },
  field: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 10,
    paddingRight: 18,
    borderWidth: 1,
    borderColor: MUTED,
    borderRadius: 10,
  },
  amountField: {
    width: 164,
    paddingRight: 12,
  },
  fieldIcon: {
    width: 20,
    height: 20,
  },
  fieldText: {
    flex: 1,
    paddingVertical: 0,
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },
  amountInput: {
    height: '100%',
    textAlign: 'right',
  },
  addButton: {
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  addButtonLabel: {
    color: '#F9F6F2',
    fontSize: 20,
    fontWeight: '600',
  },
  // "Klient" and "Usługa", which the Figma frame doesn't have yet.
  choices: {
    gap: 15,
    marginTop: 15,
    paddingHorizontal: 26,
  },
  title: {
    height: 38,
    marginTop: 57,
    paddingHorizontal: 25,
    color: TEXT,
    fontSize: 20,
    lineHeight: 38,
    fontWeight: '700',
  },
  list: {
    gap: 19,
    marginTop: 7,
    paddingHorizontal: 33,
    paddingVertical: 10,
  },
  card: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 43,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 4px 2px rgba(0, 0, 0, 0.08)',
  },
  cardPayment: {
    width: 58,
  },
  cardAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  dollarIcon: {
    width: 18,
    height: 18,
  },
  cardAmount: {
    color: TEXT,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  cardDate: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  cardDetails: {
    flex: 1,
    gap: 3,
  },
  cardService: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  cardEmployeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  employeeIcon: {
    width: 12,
    height: 12,
  },
  cardEmployee: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '200',
  },
  monthSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 15,
  },
  monthLine: {
    width: 100,
    borderTopWidth: 0.8,
    borderTopColor: '#E1DEDD',
  },
  monthLabel: {
    color: '#D6D5D4',
    fontSize: 10,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.72,
  },
});
