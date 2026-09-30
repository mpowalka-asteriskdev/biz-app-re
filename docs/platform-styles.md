# Platform-specific styles

The application has four explicit styling targets:

- `web-mobile`: web viewport narrower than 768 logical pixels
- `web-desktop`: web viewport at least 768 logical pixels wide
- `android`: native Android application
- `ios`: native iOS application

## Component style files

Keep shared visual rules in `<component>.styles.shared.ts`, then expose the same
style hook from platform-specific modules:

- `<component>.styles.web.ts` handles mobile and desktop web styles at runtime.
- `<component>.styles.android.ts` contains Android-only overrides.
- `<component>.styles.ios.ts` contains iOS-only overrides.
- `<component>.styles.ts` is the native fallback for other targets.

Import the extensionless module from the component. Expo and React Native select
the appropriate platform file automatically:

```ts
import { useExampleStyles } from '@/components/example.styles';
```

Use `usePlatformLayout()` when rendering or styling must react to the current
target. It uses `useWindowDimensions()` so web switches between mobile and
desktop styles when the browser viewport changes. Android and iOS are determined
by `Platform.OS`; a tablet does not become a web target because of its width.

The authentication screen is the reference implementation for this pattern.

## Choosing the separation level

- Use platform style modules when the component structure is shared but styling differs.
- Use `<component>.web.tsx`, `<component>.android.tsx`, or `<component>.ios.tsx`
  when markup, native APIs, or behavior differ.
- Use CSS modules only inside web-specific modules for browser-only features.
- Keep colors, spacing, and other universal design tokens in `src/constants`.