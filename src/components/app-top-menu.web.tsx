import { type Href, Link, useGlobalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthLogo, PersonIcon } from '@/components/auth-icons';
import { SearchBar } from '@/components/search-bar';
import { CATEGORIES } from '@/constants/categories';

/**
 * Top menu of every desktop web page under /app. It replaces the mobile bottom menu there and is
 * separate from the landing page header.
 */
export function AppTopMenu() {
  // Set on /app/{category} pages, where that category is highlighted.
  const { category: activeCategory } = useGlobalSearchParams<{ category?: string }>();

  return (
    <View style={styles.menu}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          {/* The logo leads to the app home; the generated route types miss /app. */}
          <Link asChild href={'/app' as Href}>
            <Pressable accessibilityLabel="ogarnijmy.to, strona główna aplikacji">
              <AuthLogo width={216} height={38} />
            </Pressable>
          </Link>

          <SearchBar style={styles.search} />

          <Link asChild href="/app/account">
            {/* The circle sits on an inner View: on web, Link passes the child's style to <a>. */}
            <Pressable accessibilityLabel="Profil">
              <View style={styles.profileCircle}>
                <PersonIcon width={24} height={24} />
              </View>
            </Pressable>
          </Link>
        </View>

        <View style={styles.categories}>
          {CATEGORIES.map((category, index) => (
            // The generated route types miss /app/{category}, hence the assertion.
            <Link key={`${category.slug}-${index}`} asChild href={`/app/${category.slug}` as Href}>
              <Pressable accessibilityRole="link">
                <Text
                  style={[
                    styles.category,
                    category.slug === activeCategory && styles.categoryActive,
                  ]}>
                  {category.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    paddingHorizontal: 64,
    paddingTop: 36,
    paddingBottom: 21,
    backgroundColor: '#201F1E',
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1226,
    gap: 36,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32,
  },
  search: {
    flexShrink: 1,
    maxWidth: 600,
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    columnGap: 32,
    minHeight: 45,
    alignItems: 'center',
  },
  category: {
    color: '#AAA5A2',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  categoryActive: {
    color: '#F9F6F2',
  },
});
