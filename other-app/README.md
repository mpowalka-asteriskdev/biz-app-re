# Other app (reference only)

Views copied from another app, kept only as a reference for building this one. Nothing here is
part of the build: TypeScript and ESLint skip this folder, and Expo Router only reads `src/app`.

The folders mirror their original locations: `app`, `components` and `constants` came from
`src/`, `assets` from the project root. Imports still use the original `@/...` paths, so code
copied back into `src/` needs the files it imports moved along with it.

`app/_layout.tsx` is the original root layout. Its web landing pages (`index.web.tsx`,
`dla-biznesu.web.tsx`) and the `/app` route nesting that kept `/` free for them are not needed
here, since this app has no landing page.
