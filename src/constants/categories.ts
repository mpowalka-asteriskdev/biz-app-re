/** Service categories shown in the desktop top menu; each opens /app/{slug}. Placeholder list from Figma. */
export const CATEGORIES = [
  { label: 'Barber', slug: 'barber' },
  { label: 'Trening', slug: 'trening' },
  { label: 'Tatuaż', slug: 'tatuaz' },
  { label: 'Paznokcie', slug: 'paznokcie' },
  { label: 'Fryzjer', slug: 'fryzjer' },
  { label: 'Fizjoterapia', slug: 'fizjoterapia' },
  { label: 'Solarium', slug: 'solarium' },
  { label: 'Glazurnik', slug: 'glazurnik' },
  { label: 'Trener personalny', slug: 'trener-personalny' },
  { label: 'Masaż', slug: 'masaz' },
] as const;

export function getCategoryLabel(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug;
}
