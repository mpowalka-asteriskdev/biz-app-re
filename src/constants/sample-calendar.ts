/**
 * Sample data of the calendar screen, taken from the Figma frame; the backend has no employees
 * or appointments yet.
 */

/** The colour of an appointment follows its kind of service. */
export type AppointmentKind = 'haircut' | 'combo' | 'beard';

export interface SampleAppointment {
  start: string;
  end: string;
  client: string;
  service: string;
  kind: AppointmentKind;
  /** Shows the tick next to the payment icon. */
  confirmed: boolean;
}

export interface SampleEmployee {
  name: string;
  place: string;
  /** Percentage of the working time that is booked. */
  occupancy: number;
}

/** Shown on today's column. */
export const SAMPLE_APPOINTMENTS: SampleAppointment[] = [
  {
    start: '8:00',
    end: '8:45',
    client: 'Assan Hebda',
    service: 'strzyżenie męskie',
    kind: 'haircut',
    confirmed: true,
  },
  {
    start: '9:00',
    end: '9:45',
    client: 'Paulian Rzymski',
    service: 'combo',
    kind: 'combo',
    confirmed: false,
  },
  {
    start: '9:45',
    end: '10:30',
    client: 'Adrian Jechowski',
    service: 'broda',
    kind: 'beard',
    confirmed: true,
  },
  {
    start: '10:30',
    end: '11:15',
    client: 'Kamil Karlewicz',
    service: 'strzyżenie męskie',
    kind: 'haircut',
    confirmed: false,
  },
  {
    start: '11:30',
    end: '12:15',
    client: 'Brajan Klimeczko',
    service: 'combo',
    kind: 'combo',
    confirmed: false,
  },
  {
    start: '12:15',
    end: '13:00',
    client: 'Lucjan Grzybowski',
    service: 'broda',
    kind: 'beard',
    confirmed: false,
  },
];

/** The first one is the employee whose calendar is shown. */
export const SAMPLE_EMPLOYEES: SampleEmployee[] = [
  { name: 'Marcelina Nożycorękowska', place: 'Barber przy Głównej', occupancy: 60 },
  { name: 'Kasia Kędziorowska', place: 'Barber przy Głównej', occupancy: 20 },
  { name: 'Marek Nowotarski', place: 'Barber przy Głównej', occupancy: 40 },
  { name: 'Kamil Jabłoński', place: 'Barber przy Głównej', occupancy: 90 },
];
