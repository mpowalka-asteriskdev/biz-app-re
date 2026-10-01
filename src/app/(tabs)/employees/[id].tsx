import { useLocalSearchParams } from 'expo-router';

import { EmployeeProfileScreen } from '@/components/employee-profile-screen';
import { SAMPLE_EMPLOYEES } from '@/constants/sample-employees';

/** /employees/{index}: the id is the employee's position in the sample list for now. */
export default function EmployeeProfileRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <EmployeeProfileScreen
      employee={SAMPLE_EMPLOYEES[Number(id)] ?? { firstName: '', lastName: '' }}
    />
  );
}
