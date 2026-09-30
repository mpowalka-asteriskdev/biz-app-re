import { useLocalSearchParams } from 'expo-router';

import { ClientProfileScreen } from '@/components/client-profile-screen';
import { SAMPLE_CLIENTS } from '@/constants/sample-clients';

/** /clients/{index}: the id is the client's position in the sample list for now. */
export default function ClientProfileRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ClientProfileScreen name={SAMPLE_CLIENTS[Number(id)] ?? ''} />;
}
