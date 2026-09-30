import type { ServiceCardData } from '@/components/service-card';

// Placeholder listings from the Figma designs until the services API exists.

export const MASAZ_GOTU_HAN: ServiceCardData = {
  id: 'masaz-gotu-han',
  category: 'masaz',
  image: require('@/assets/landing/home/massage.jpg'),
  name: 'Masaż Gotu Han',
  rating: '4,98',
  address: 'Krzywa 13, Poznań',
};

export const BARBER_PRZY_GLOWNEJ: ServiceCardData = {
  id: 'barber-przy-glownej',
  category: 'barber',
  image: require('@/assets/search/barber-shave.png'),
  name: 'Barber przy Głównej',
  rating: '4,98',
  address: 'Krzywa 13, Poznań',
};

export const MAR_TATTOO: ServiceCardData = {
  id: 'mar-tattoo',
  category: 'tatuaz',
  image: require('@/assets/landing/home/tattoo.jpg'),
  name: 'MarTattoo',
  rating: '4,98',
  address: 'Krzywa 13, Poznań',
};

export const BAR_BARBER: ServiceCardData = {
  id: 'bar-barber',
  category: 'barber',
  image: require('@/assets/landing/home/haircut.jpg'),
  name: 'BarBarber',
  rating: '5,00',
  address: 'Główna 69, Poznań',
};

/** Figma shows BarBarber with a second photo in the first row of cards. */
export const BAR_BARBER_ALT_PHOTO: ServiceCardData = {
  ...BAR_BARBER,
  image: require('@/assets/landing/home/personal-trainer.jpg'),
};

export const CRAZY_ONE: ServiceCardData = {
  id: 'crazy-one',
  category: 'barber',
  image: require('@/assets/landing/home/barber-portrait.jpg'),
  name: 'CrazyOne',
  rating: '4,70',
  address: 'Poznańska 2, Poznań',
};
