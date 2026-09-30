import { type ReactNode, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { authClient } from '@/lib/auth-client';

/**
 * Button (e.g. the desktop profile icon or the phone profile's settings icon) that opens a
 * small "Wyloguj się" menu just under it. The menu is a modal, so it's tappable everywhere.
 */
export function SignOutMenuButton({
  accessibilityLabel,
  children,
}: {
  accessibilityLabel: string;
  children: ReactNode;
}) {
  const { width } = useWindowDimensions();
  const buttonRef = useRef<View>(null);
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);

  function openMenu() {
    buttonRef.current?.measureInWindow((x, y, buttonWidth, buttonHeight) => {
      setPosition({ top: y + buttonHeight + 8, right: width - x - buttonWidth });
    });
  }

  return (
    <>
      <Pressable
        ref={buttonRef}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        onPress={openMenu}
        style={({ pressed }) => pressed && styles.pressed}>
        {children}
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setPosition(null)}
        // Measured positions include the status bar, so the modal has to cover it too.
        statusBarTranslucent
        transparent
        visible={position !== null}>
        <Pressable
          accessibilityLabel="Zamknij menu"
          onPress={() => setPosition(null)}
          style={styles.backdrop}
        />
        {position && (
          <View style={[styles.menu, position]}>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setPosition(null);
                // The layout's guards then send the user to the login screen.
                authClient.signOut();
              }}
              style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
              <Text style={styles.menuItemLabel}>Wyloguj się</Text>
            </Pressable>
          </View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  menu: {
    position: 'absolute',
    minWidth: 160,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  menuItemLabel: {
    color: '#201F1E',
    fontSize: 15,
    fontWeight: '300',
  },
  pressed: {
    opacity: 0.72,
  },
});
