import { createContext, type ReactNode, use, useState } from 'react';

import { WEEK_DAYS } from '@/constants/onboarding';
import type { PlaceExperience } from '@/lib/places-api';

export type DayHours = {
  open: boolean;
  from: string;
  to: string;
};

export type OnboardingData = {
  /** Set once the company step has created the place; later saves update it. */
  placeId: string | null;
  /** Sent with the place when the company step creates it. */
  categoryId: string | null;
  company: {
    name: string;
    nip: string;
    street: string;
    city: string;
    postalCode: string;
  };
  pinConfirmed: boolean;
  consents: {
    terms: boolean;
    marketing: boolean;
  };
  experience: PlaceExperience | null;
  /** One entry per WEEK_DAYS item. */
  hours: DayHours[];
};

type OnboardingContextValue = {
  data: OnboardingData;
  update: (changes: Partial<OnboardingData>) => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

/**
 * Holds the answers of the registration steps while the user moves between them. The steps
 * save them to the user's place; the map location and consents have no backend fields yet.
 */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(() => ({
    placeId: null,
    categoryId: null,
    company: { name: '', nip: '', street: '', city: '', postalCode: '' },
    pinConfirmed: false,
    consents: { terms: false, marketing: false },
    experience: null,
    // Monday to Saturday 8:00-16:00, Sunday closed, as in the Figma frame.
    hours: WEEK_DAYS.map((_, index) => ({ open: index < 6, from: '8:00', to: '16:00' })),
  }));

  function update(changes: Partial<OnboardingData>) {
    setData((current) => ({ ...current, ...changes }));
  }

  return <OnboardingContext value={{ data, update }}>{children}</OnboardingContext>;
}

export function useOnboarding() {
  const value = use(OnboardingContext);

  if (!value) {
    throw new Error('useOnboarding must be used inside OnboardingProvider.');
  }

  return value;
}
