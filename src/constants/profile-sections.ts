import { SAMPLE_PROFILE } from '@/constants/sample-profile';

export type ProfileOption =
  /** Opens a further screen; none is designed yet. */
  | { kind: 'link'; label: string }
  | { kind: 'value'; label: string; value: string }
  /** A detail of the signed-in account. */
  | { kind: 'account'; label: string; field: 'name' | 'email' }
  | { kind: 'toggle'; label: string; initial: boolean };

export interface ProfileSection {
  /** The route segment: /profile/{slug}. */
  slug: string;
  title: string;
  options: ProfileOption[];
}

/**
 * Rows of the Profil screen that open a sub menu, and the sub menus' options. Figma has no designs
 * for the sub menus, so the options are placeholders.
 */
export const PROFILE_SECTIONS: ProfileSection[] = [
  {
    slug: 'twoje-dane',
    title: 'Twoje dane',
    options: [
      { kind: 'account', label: 'Imię i nazwisko', field: 'name' },
      { kind: 'account', label: 'E-mail', field: 'email' },
      { kind: 'value', label: 'Nr telefonu', value: SAMPLE_PROFILE.phone },
      { kind: 'value', label: 'Data urodzenia', value: SAMPLE_PROFILE.birthDate },
      { kind: 'link', label: 'Zmień hasło' },
    ],
  },
  {
    slug: 'wystawione-opinie',
    title: 'Wystawione opinie',
    options: [
      { kind: 'link', label: 'Wszystkie opinie' },
      { kind: 'link', label: 'Najnowsze opinie' },
      { kind: 'toggle', label: 'Powiadomienia o nowych opiniach', initial: true },
    ],
  },
  {
    slug: 'karty-podarunkowe',
    title: 'Karty podarunkowe',
    options: [
      { kind: 'link', label: 'Aktywne karty' },
      { kind: 'link', label: 'Wykorzystane karty' },
      { kind: 'link', label: 'Kup kartę podarunkową' },
    ],
  },
  {
    slug: 'program-lojalnosciowy',
    title: 'Program lojalnościowy',
    options: [
      { kind: 'value', label: 'Zebrane punkty', value: '120' },
      { kind: 'link', label: 'Dostępne nagrody' },
      { kind: 'link', label: 'Historia punktów' },
      { kind: 'link', label: 'Regulamin programu' },
    ],
  },
];
