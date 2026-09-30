import { Image } from 'expo-image';
import { Modal, Pressable, Text, useWindowDimensions, View } from 'react-native';

import { useOnboardingStyles } from '@/components/onboarding.styles';

const mapImage = require('@/assets/onboarding/map.png');
const pinIcon = require('@/assets/onboarding/location.svg');

/**
 * "Map popup" of the company step. For now the map is a static picture: "To tutaj!" only marks
 * the location as confirmed, without coordinates.
 */
export function MapPopup({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const styles = useOnboardingStyles();
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}>
      <View style={[styles.overlay, styles.overlayCentered]}>
        <Pressable accessibilityLabel="Zamknij" onPress={onClose} style={styles.backdrop} />

        {/* 331x716 in Figma; smaller screens get a smaller map. */}
        <View
          style={[
            styles.map,
            { width: Math.min(331, width - 62), height: Math.min(716, height - 136) },
          ]}>
          <Image
            accessibilityLabel="Mapa"
            contentFit="cover"
            contentPosition="left"
            source={mapImage}
            style={styles.mapImage}
          />
          <Image accessibilityLabel="" source={pinIcon} style={styles.mapPin} />
          <Pressable
            accessibilityRole="button"
            onPress={onConfirm}
            style={({ pressed }) => [styles.mapButton, pressed && styles.pressed]}>
            <Text style={styles.buttonLabel}>To tutaj!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
