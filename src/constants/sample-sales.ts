/** Sample completed sales of the Sprzedaż screen, taken from the Figma frame; no backend yet. */
export interface SampleSale {
  amount: string;
  date: string;
  service: string;
  employee: string;
}

/** Grouped by month; the newest group has no month heading, as in Figma. */
export const SAMPLE_SALES: { month: string | null; sales: SampleSale[] }[] = [
  {
    month: null,
    sales: [
      { amount: '90 zł', date: '13.12.2025', service: 'Strzyżenie męskie', employee: 'Pracownik ABC' },
      {
        amount: '150 zł',
        date: '18.12.2025',
        service: 'Strzyżenie i golenie combo',
        employee: 'Pracownik BDR',
      },
    ],
  },
  {
    month: 'Listopad 2025',
    sales: [
      { amount: '90 zł', date: '29.11.2025', service: 'Strzyżenie', employee: 'Pracownik ABC' },
    ],
  },
];
