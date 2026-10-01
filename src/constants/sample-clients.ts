/** Sample client list of the Klienci screen, taken from the Figma frame; the backend has no clients yet. */
export const SAMPLE_CLIENTS = [
  'Marcin Marcinowski',
  'Konstanty Włóczko',
  'Assan Hebda',
  'Paulian Rzymski',
  'Brajan Klimeczko',
  'Adrian Jechowski',
  'Kamil Karlemicz',
  'Lucjan Grzybowski',
  'Konstanty Włóczko',
];

/**
 * Details shown on every client's profile ("Client profile page" in Figma); only the name comes
 * from the list.
 */
export const SAMPLE_CLIENT_PROFILE = {
  discount: 20,
  cancellations: 0,
  nextVisit: '04.01.2026 | 15:30',
  trusted: true,
  visits: 7,
  absences: 0,
  lastVisit: '20.11.2025',
  revenue: '630 zł',
  joined: '13.02.2025',
  notes: ['Lubi muzykę heavy metalową'],
  // Shown on desktop only ("Clients desktop" in Figma).
  birthDate: '20.11.2001',
  phone: '501 234 655',
};

/** A person in the desktop Klienci and Pracownicy lists, which show the surname first. */
export interface DirectoryPerson {
  firstName: string;
  lastName: string;
}

/** Groups of the desktop lists; as in Figma, the first group has no letter heading. */
export type DirectoryGroup = { letter: string | null; people: DirectoryPerson[] };

/** Client list of the desktop Klienci page ("Clients desktop" in Figma). */
export const SAMPLE_CLIENT_DIRECTORY: DirectoryGroup[] = [
  {
    letter: null,
    people: [
      { firstName: 'Paweł', lastName: 'Adamczewski' },
      { firstName: 'Grześ', lastName: 'Armanowski' },
      { firstName: 'Mohamed', lastName: 'Azul' },
    ],
  },
  {
    letter: 'B',
    people: [
      { firstName: 'Fryderyk', lastName: 'Baranowski' },
      { firstName: 'Krzysztof', lastName: 'Bojanowski' },
      { firstName: 'Ariel', lastName: 'Bytomski' },
      { firstName: 'Patrycjusz', lastName: 'Bzyk' },
    ],
  },
  { letter: 'C', people: [{ firstName: 'Marek', lastName: 'Cejrowski' }] },
];
