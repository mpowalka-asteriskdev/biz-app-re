import { StyleSheet } from 'react-native';

const TEXT = '#201F1E';
const MUTED = '#AAA5A2';
const ACCENT = '#E64F21';

/**
 * Calendar page of the business app: "Calendar desktop" (desktop web) and "Main calendar"
 * (web-mobile and Android) in Figma. The day columns are the same in both.
 */
export const sharedCalendarScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Phones: the employee on top, then the days one page at a time.
  phoneEmployee: {
    paddingLeft: 33,
    paddingRight: 26,
  },
  phoneDays: {
    flex: 1,
    marginTop: 18,
  },
  phoneDay: {
    flex: 1,
  },
  addVisitButton: {
    position: 'absolute',
    right: 39,
    bottom: 90,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT,
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  addVisitButtonLabel: {
    color: '#F9F6F2',
    fontSize: 24,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.72,
  },

  // Desktop web.
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 64,
    paddingTop: 57,
    paddingBottom: 64,
  },
  columns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1226,
    gap: 43,
  },

  // Employee panel.
  sidebar: {
    width: 382,
  },
  panel: {
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingTop: 24,
    paddingBottom: 60,
    paddingLeft: 34,
    paddingRight: 14,
  },
  employeeRow: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Employees other than the shown one are greyed out, as in Figma.
  employeeRowInactive: {
    mixBlendMode: 'luminosity',
    opacity: 0.8,
  },
  employeePhoto: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  employeeDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  employeePlace: {
    color: '#000000',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  employeeName: {
    marginTop: 3,
    color: '#000000',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
  },
  employeeOccupancy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  smallIcon: {
    width: 12,
    height: 12,
  },
  employeeOccupancyText: {
    color: TEXT,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  employeeArrow: {
    width: 36,
    height: 36,
    marginLeft: 10,
  },
  employeeMenu: {
    marginTop: 15,
    marginHorizontal: 4,
  },
  employeeMenuRow: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: MUTED,
  },
  employeeMenuLabel: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '300',
  },
  employeeMenuLabelActive: {
    color: ACCENT,
    fontWeight: '700',
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowActive: {
    width: 24,
    height: 24,
    borderRadius: 5,
    backgroundColor: ACCENT,
  },
  otherEmployees: {
    gap: 24,
    marginTop: 30,
  },
  addButton: {
    height: 50,
    marginTop: 23,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEXT,
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  addButtonLabel: {
    color: '#F9F6F2',
    fontSize: 20,
    fontWeight: '600',
  },

  // Days.
  days: {
    flexDirection: 'row',
    gap: 14,
  },
  day: {
    width: 393,
  },
  dayHeader: {
    height: 70,
    paddingTop: 18,
    paddingLeft: 45,
  },
  dayTitle: {
    color: TEXT,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  daySubtitle: {
    marginTop: 1,
    color: TEXT,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '200',
  },
  daySettings: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 36,
    height: 36,
  },
  // Every 15 minutes is a 20px row; its label sits just above the line.
  grid: {
    height: 660,
  },
  gridLabel: {
    position: 'absolute',
    left: 0,
    width: 35,
    color: MUTED,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '200',
    textAlign: 'right',
  },
  gridLabelHour: {
    color: TEXT,
  },
  gridLine: {
    position: 'absolute',
    left: 47,
    right: 26,
    borderTopWidth: 0.5,
    borderTopColor: '#E1DEDD',
  },
  gridLineHour: {
    borderTopColor: MUTED,
  },
  appointment: {
    position: 'absolute',
    left: 59,
    width: 119,
    overflow: 'hidden',
    borderLeftWidth: 3,
    borderRadius: 3,
    paddingTop: 2,
    paddingLeft: 5,
  },
  appointmentTime: {
    color: '#000000',
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
  },
  appointmentClient: {
    marginTop: 1,
    color: '#000000',
    fontSize: 8,
    lineHeight: 10,
    fontWeight: '200',
  },
  appointmentService: {
    marginTop: 2,
    color: '#000000',
    fontSize: 8,
    lineHeight: 10,
    fontWeight: '200',
  },
  appointmentIcons: {
    position: 'absolute',
    left: 5,
    bottom: 3,
    flexDirection: 'row',
    gap: 1,
  },
  nowLine: {
    position: 'absolute',
    left: 47,
    right: 26,
    height: 2,
    backgroundColor: ACCENT,
  },
  nowDot: {
    position: 'absolute',
    left: 42,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ACCENT,
    backgroundColor: '#FFFFFF',
  },
});

/** Background and left border of an appointment, by kind of service. */
export const APPOINTMENT_COLORS = {
  haircut: { backgroundColor: 'rgba(174, 231, 155, 0.5)', borderLeftColor: '#6FAE5A' },
  combo: { backgroundColor: 'rgba(127, 204, 211, 0.5)', borderLeftColor: '#5C979C' },
  beard: { backgroundColor: 'rgba(231, 76, 76, 0.5)', borderLeftColor: '#AD4747' },
};
