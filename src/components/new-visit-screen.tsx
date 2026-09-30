import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { FormField, FormScreen } from '@/components/form-screen';
import { useFormScreenStyles } from '@/components/form-screen.styles';

const FIELDS = [
  { label: 'Wybierz usługę', icon: require('@/assets/visits/service.svg') },
  { label: 'Godzina rozpoczęcia', icon: require('@/assets/visits/clock.svg') },
  { label: 'Pracownik', icon: require('@/assets/visits/employee.svg') },
  { label: 'Klient', icon: require('@/assets/visits/client.svg') },
];

/**
 * "New visit", opened with the calendar's "+" (Android design). The fields are choices whose
 * lists aren't designed yet, and the backend has no visits, so "Zatwierdź" only closes the form.
 */
export function NewVisitScreen() {
  const router = useRouter();
  const styles = useFormScreenStyles();

  return (
    <FormScreen largeTitle title="Dodajesz nową wizytę" onSubmit={() => router.back()}>
      {FIELDS.map((field) => (
        <FormField key={field.label} icon={field.icon}>
          <Text style={styles.fieldText}>{field.label}</Text>
        </FormField>
      ))}
    </FormScreen>
  );
}
