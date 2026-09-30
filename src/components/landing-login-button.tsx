import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

/** Orange "Logowanie" pill of the web landing headers ("Button M" in Figma); opens the login. */
export function LandingLoginButton({ compact = false }: { compact?: boolean }) {
  return (
    <Link asChild href="/app/account">
      {/* Link's Slot rejects style arrays on its child, so each size has one style object. */}
      <Pressable accessibilityRole="link" style={compact ? styles.buttonCompact : styles.button}>
        <Text style={[styles.label, compact && styles.labelCompact]}>Logowanie</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  buttonCompact: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
    boxShadow: '0px 4px 2.9px rgba(0, 0, 0, 0.15)',
  },
  label: {
    color: '#F9F6F2',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
  labelCompact: {
    fontSize: 16,
    lineHeight: 20,
  },
});
