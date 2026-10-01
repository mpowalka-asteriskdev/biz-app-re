import { Redirect, useLocalSearchParams } from 'expo-router';

import { ProfileSectionScreen } from '@/components/profile-section-screen';
import { PROFILE_SECTIONS } from '@/constants/profile-sections';

/** /profile/{slug}: a sub menu opened from a Profil row. */
export default function ProfileSectionRoute() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const profileSection = PROFILE_SECTIONS.find(({ slug }) => slug === section);

  if (!profileSection) {
    return <Redirect href="/profile" />;
  }

  return <ProfileSectionScreen section={profileSection} />;
}
