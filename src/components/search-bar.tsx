import { useState } from 'react';
import {
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

/**
 * Service search field with the orange filter button: translucent on dark headers, or `light`
 * with a grey outline on white pages.
 */
export function SearchBar({
  placeholder = 'Szukaj usług i ofert specjalnych',
  variant = 'dark',
  style,
  inputStyle,
}: {
  placeholder?: string;
  variant?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}) {
  const [focused, setFocused] = useState(false);
  const light = variant === 'light';

  return (
    <View
      style={[
        styles.search,
        light && styles.searchLight,
        focused && styles.searchFocused,
        style,
      ]}>
      <SearchIcon color={light ? '#AAA5A2' : undefined} />
      <TextInput
        accessibilityLabel={placeholder}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        placeholderTextColor={light ? '#AAA5A2' : '#D6D5D4'}
        selectionColor="#E85012"
        style={[styles.searchInput, light && styles.searchInputLight, inputStyle]}
      />
      <View style={styles.filterButton}>
        <FilterIcon />
      </View>
    </View>
  );
}

export function SearchIcon({ color = '#E1DEDD' }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M9.58334 17.5001C13.9556 17.5001 17.5 13.9557 17.5 9.58341C17.5 5.21116 13.9556 1.66675 9.58334 1.66675C5.21108 1.66675 1.66667 5.21116 1.66667 9.58341C1.66667 13.9557 5.21108 17.5001 9.58334 17.5001Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M18.3333 18.3334L16.6667 16.6667" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function FilterIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Rect width={20} height={20} fill="#E64F21" />
      <Path d="M15.8333 18.9584C15.4916 18.9584 15.2083 18.6751 15.2083 18.3334V9.16675C15.2083 8.82508 15.4916 8.54175 15.8333 8.54175C16.175 8.54175 16.4583 8.82508 16.4583 9.16675V18.3334C16.4583 18.6751 16.175 18.9584 15.8333 18.9584Z" fill="#F9F6F2" />
      <Path d="M15.8333 6.45841C15.4916 6.45841 15.2083 6.17508 15.2083 5.83341V1.66675C15.2083 1.32508 15.4916 1.04175 15.8333 1.04175C16.175 1.04175 16.4583 1.32508 16.4583 1.66675V5.83341C16.4583 6.17508 16.175 6.45841 15.8333 6.45841Z" fill="#F9F6F2" />
      <Path d="M10 18.9584C9.65833 18.9584 9.375 18.6751 9.375 18.3334V14.1667C9.375 13.8251 9.65833 13.5417 10 13.5417C10.3417 13.5417 10.625 13.8251 10.625 14.1667V18.3334C10.625 18.6751 10.3417 18.9584 10 18.9584Z" fill="#F9F6F2" />
      <Path d="M10 11.4584C9.65833 11.4584 9.375 11.1751 9.375 10.8334V1.66675C9.375 1.32508 9.65833 1.04175 10 1.04175C10.3417 1.04175 10.625 1.32508 10.625 1.66675V10.8334C10.625 11.1751 10.3417 11.4584 10 11.4584Z" fill="#F9F6F2" />
      <Path d="M4.16669 18.9584C3.82502 18.9584 3.54169 18.6751 3.54169 18.3334V9.16675C3.54169 8.82508 3.82502 8.54175 4.16669 8.54175C4.50835 8.54175 4.79169 8.82508 4.79169 9.16675V18.3334C4.79169 18.6751 4.50835 18.9584 4.16669 18.9584Z" fill="#F9F6F2" />
      <Path d="M4.16669 6.45841C3.82502 6.45841 3.54169 6.17508 3.54169 5.83341V1.66675C3.54169 1.32508 3.82502 1.04175 4.16669 1.04175C4.50835 1.04175 4.79169 1.32508 4.79169 1.66675V5.83341C4.79169 6.17508 4.50835 6.45841 4.16669 6.45841Z" fill="#F9F6F2" />
      <Path d="M5.83333 9.79175H2.5C2.15833 9.79175 1.875 9.50841 1.875 9.16675C1.875 8.82508 2.15833 8.54175 2.5 8.54175H5.83333C6.175 8.54175 6.45833 8.82508 6.45833 9.16675C6.45833 9.50841 6.175 9.79175 5.83333 9.79175Z" fill="#F9F6F2" />
      <Path d="M17.5 9.79175H14.1667C13.825 9.79175 13.5417 9.50841 13.5417 9.16675C13.5417 8.82508 13.825 8.54175 14.1667 8.54175H17.5C17.8417 8.54175 18.125 8.82508 18.125 9.16675C18.125 9.50841 17.8417 9.79175 17.5 9.79175Z" fill="#F9F6F2" />
      <Path d="M11.6666 11.4583H8.33331C7.99165 11.4583 7.70831 11.1749 7.70831 10.8333C7.70831 10.4916 7.99165 10.2083 8.33331 10.2083H11.6666C12.0083 10.2083 12.2916 10.4916 12.2916 10.8333C12.2916 11.1749 12.0083 11.4583 11.6666 11.4583Z" fill="#F9F6F2" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  search: {
    width: '100%',
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E1DEDD',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  searchLight: {
    borderColor: '#AAA5A2',
    backgroundColor: 'transparent',
  },
  searchFocused: {
    borderColor: '#E85012',
  },
  searchInput: {
    flex: 1,
    minHeight: 50,
    color: '#F9F6F2',
    fontSize: 14,
    fontWeight: '500',
    outlineWidth: 0,
  },
  searchInputLight: {
    color: '#201F1E',
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E64F21',
  },
});
