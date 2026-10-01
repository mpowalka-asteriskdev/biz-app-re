import type { DirectoryGroup } from '@/constants/sample-clients';

/** Employee list of the desktop Pracownicy page ("Staff desktop" in Figma); no backend yet. */
export const SAMPLE_EMPLOYEE_DIRECTORY: DirectoryGroup[] = [
  {
    letter: null,
    people: [
      { firstName: 'Marcelina', lastName: 'Nożycorękowska' },
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

/** Details shown for every employee; only the name comes from the list. */
export const SAMPLE_EMPLOYEE_PROFILE = {
  role: 'Barber przy Głównej',
  specialOffers: true,
  newOffers: true,
  birthDate: '13/02/1997',
  phone: '501 345 987',
  otherOptions: ['Coś tam', 'Coś tam', 'Coś tam', 'Coś tam'],
};
