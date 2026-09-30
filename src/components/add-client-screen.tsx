import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { FormField, FormScreen } from '@/components/form-screen';
import { useFormScreenStyles } from '@/components/form-screen.styles';

type ClientField = 'firstName' | 'lastName' | 'phone' | 'email';

const FIELDS: { key: ClientField; label: string; icon: number; inputProps?: TextInputProps }[] = [
  {
    key: 'firstName',
    label: 'Imię',
    icon: require('@/assets/clients/profile.svg'),
    inputProps: { autoCapitalize: 'words', autoComplete: 'given-name' },
  },
  {
    key: 'lastName',
    label: 'Nazwisko',
    icon: require('@/assets/clients/profile.svg'),
    inputProps: { autoCapitalize: 'words', autoComplete: 'family-name' },
  },
  {
    key: 'phone',
    label: 'Telefon',
    icon: require('@/assets/clients/phone.svg'),
    inputProps: { autoComplete: 'tel', inputMode: 'tel', keyboardType: 'phone-pad' },
  },
  {
    key: 'email',
    label: 'Email',
    icon: require('@/assets/clients/email.svg'),
    inputProps: {
      autoCapitalize: 'none',
      autoComplete: 'email',
      inputMode: 'email',
      keyboardType: 'email-address',
    },
  },
];

/**
 * "Add new client", opened with the Klienci tab's "+" (Android design). The backend has no
 * clients yet, so "Zatwierdź" only closes the form.
 */
export function AddClientScreen() {
  const router = useRouter();
  const styles = useFormScreenStyles();
  const [values, setValues] = useState<Record<ClientField, string>>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  return (
    <FormScreen title="Dodajesz nowego klienta" onSubmit={() => router.back()}>
      {FIELDS.map((field) => (
        <FormField key={field.key} icon={field.icon}>
          {/* The labels are dark in Figma, not greyed out like other placeholders. */}
          <TextInput
            {...field.inputProps}
            accessibilityLabel={field.label}
            onChangeText={(value) => setValues({ ...values, [field.key]: value })}
            placeholder={field.label}
            placeholderTextColor="#201F1E"
            selectionColor="#E64F21"
            style={[styles.fieldText, { height: '100%' }]}
            value={values[field.key]}
          />
        </FormField>
      ))}
    </FormScreen>
  );
}
