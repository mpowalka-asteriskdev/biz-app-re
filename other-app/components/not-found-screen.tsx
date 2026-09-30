import { Link } from 'expo-router';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNotFoundScreenStyles } from '@/components/not-found-screen.styles';

/** 404 page of the native apps, shown for links that match no route. */
export function NotFoundScreen() {
  const styles = useNotFoundScreenStyles();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.content}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Nie znaleźliśmy tej strony</Text>
        <Text style={styles.text}>
          Strona, której szukasz, nie istnieje albo została przeniesiona.
        </Text>
        <Link asChild replace href="/app/search">
          <Pressable accessibilityRole="link" style={styles.button}>
            <Text style={styles.buttonText}>Wróć do aplikacji</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
