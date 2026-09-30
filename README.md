# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Project configuration

- Expo SDK 57.0.16
- React Native 0.86.2
- React 19.2.3
- TypeScript 6.0.3
- Expo Router with typed routes
- Android application ID: `com.ogarnijmyto.bizapp`
- iOS bundle identifier: `com.ogarnijmyto.bizapp`
- Better Auth integration for Google and email/password on native and web

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

### Physical Android phone over USB

Install Expo Go on the phone, enable USB debugging, connect and authorize the phone, then run `npm run android`. The command selects a physical device, configures ADB port forwarding, starts Metro on localhost, and opens the project in Expo Go automatically. Use `npm run android:emulator` when an emulator is intended.

See [Develop on a physical Android phone](docs/android-physical-device.md) for complete setup and troubleshooting instructions.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

The app has three routes: `/login` and `/register` for signed-out users, and `/` once signed in. The **other-app** directory holds views copied from another app for reference only; it is not part of the build.

Validate the project with `npm run lint`, `npx tsc --noEmit`, and `npx expo-doctor`.

## Platform-specific styling

Styles can diverge independently for mobile web, desktop web, Android, and iOS.
See [Platform-specific styles](docs/platform-styles.md) for the file conventions,
responsive breakpoint, and the authentication screen reference implementation.

## Authentication

The app connects to the Better Auth user service on port `3001`. Start that service before using sign-in or registration. See [Authentication integration](docs/authentication.md) for backend environment variables, Google Cloud callback configuration, native/web behavior, and protected API usage.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
