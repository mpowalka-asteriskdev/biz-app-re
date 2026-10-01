import { Stack } from 'expo-router';

/** Pracownicy tab: the list, and employee profiles opened from it above the bottom menu. */
export default function EmployeesLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
