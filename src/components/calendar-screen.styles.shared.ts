import { StyleSheet } from 'react-native';

/** Mobile design of the "Kalendarz" tab ("Calendar" in Figma). */
export const sharedCalendarScreenStyles = StyleSheet.create({
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
  title: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 4,
    color: '#201F1E',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  picker: {
    marginHorizontal: 18,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderRadius: 13,
    backgroundColor: 'rgba(249, 246, 242, 0.7)',
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
  },
  monthBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monthNameText: {
    color: '#000000',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.408,
  },
  monthChevronOpen: {
    transform: [{ rotate: '90deg' }],
  },
  monthArrows: {
    width: 51,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekdays: {
    marginTop: 2,
    marginBottom: 5,
  },
  weekday: {
    width: 40,
    color: 'rgba(60, 60, 67, 0.3)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: -0.078,
    textAlign: 'center',
  },
  weeks: {
    gap: 6,
  },
  day: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  daySelected: {
    backgroundColor: '#E64F21',
  },
  dayText: {
    color: '#000000',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // The year view has no Figma design; its month pills reuse the day circle's colours.
  yearMonths: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  yearMonth: {
    width: '32%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  yearMonthText: {
    color: '#000000',
    fontSize: 15,
    lineHeight: 20,
  },
  visitDot: {
    position: 'absolute',
    bottom: 1,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E64F21',
  },
  sectionTitle: {
    marginTop: 21,
    paddingHorizontal: 25,
    paddingVertical: 9,
    color: '#201F1E',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  visits: {
    marginTop: -4,
    marginHorizontal: 25,
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 19,
  },
  visitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 43,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 4px 2px rgba(0, 0, 0, 0.08)',
  },
  // The time is a little wider than the column in Figma, so the column may grow.
  visitWhen: {
    minWidth: 58,
  },
  visitTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  visitTimeText: {
    color: '#E64F21',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  visitDate: {
    color: '#AAA5A2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  visitDetails: {
    flexShrink: 1,
    width: 170,
    gap: 3,
  },
  visitPlace: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  visitAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  visitAddressText: {
    color: '#AAA5A2',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '200',
  },
  monthDivider: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  monthDividerLine: {
    width: 100,
    height: 0.8,
    backgroundColor: '#E1DEDD',
  },
  monthDividerText: {
    color: '#D6D5D4',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '200',
  },
  pressed: {
    opacity: 0.7,
  },
});
