# Develop on a physical Android phone

This project runs as a development build (not Expo Go) on a physical Android phone connected to a Windows computer by USB. The project command detects the phone, forwards Metro's port through ADB, starts Expo in localhost mode, and opens the project in the development build.

Expo Go can't be used: it always reserves the system navigation bar's space at the bottom of the screen, so the bottom menu can't reach the screen edge when the bar is hidden.

## Prerequisites

- A Windows computer with Node.js and the project dependencies installed.
- Android SDK Platform-Tools. The expected ADB location is `%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe`.
- An Android phone and a USB cable that supports data transfer.
- JDK 17 (`JAVA_HOME` set) and the Android SDK (`ANDROID_HOME` set) to build the app.

## One-time phone setup

### 1. Enable Developer options

1. Open **Settings** on the phone.
2. Open **About phone** and then **Software information**. The exact path varies by manufacturer.
3. Tap **Build number** seven times.
4. Enter the phone PIN if requested.

### 2. Enable USB debugging

1. Return to **Settings**.
2. Open **Developer options**.
3. Enable **USB debugging**.
4. If available, set **Default USB configuration** to **File transfer / Android Auto**.

### 3. Authorize the computer

1. Connect the unlocked phone with a data-capable USB cable.
2. Select **File transfer / Android Auto** from the USB notification.
3. Accept **Allow USB debugging?** on the phone.
4. Enable **Always allow from this computer** before confirming.

## Verify the connection

Open a new PowerShell terminal and run:

```powershell
adb devices -l
```

A working connection resembles:

```text
RF8MC0890JE    device product:beyond2lteeea model:SM_G975F device:beyond2
```

The status must be `device`.

- `unauthorized`: unlock the phone and accept the USB debugging prompt.
- `offline`: reconnect the cable and restart ADB.
- No device: check USB debugging, USB mode, cable, port, and Windows drivers.

If PowerShell cannot find `adb`, close and reopen the terminal after adding this directory to the user `PATH`:

```text
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

ADB can also be invoked directly:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices -l
```

## Install the development build

With the phone connected, build the app and install it on the phone:

```powershell
npx expo run:android
```

The Metro port (`8082`) comes from `RCT_METRO_PORT` in `.env`. Don't add `--no-bundler`: without the bundler Expo ignores the configured port and falls back to `8081`.

Rebuild the same way after installing a library with native code, changing `app.json`, or upgrading the Expo SDK. If the native project gets out of sync, run `npx expo prebuild --clean` first. JavaScript changes don't need a rebuild.

## Start development

From the project root, run:

```powershell
npm run android
```

The project script automatically:

1. Finds an authorized physical Android device.
2. Ignores Android emulators.
3. Forwards Metro (`8082`), the auth service (`3001`), and the places service (`3002`) through ADB.
4. Starts Expo with `--localhost`, `--android`, and `--dev-client`.
5. Opens the project in the development build.

Keep this terminal open while developing. Source changes should appear through Fast Refresh.

To stop Metro, press **Ctrl+C**.

## Manual fallback

If automatic launching fails, run these commands in separate terminals:

```powershell
adb reverse tcp:8082 tcp:8082
npm start -- --localhost --dev-client
```

Then open the BizApp development build on the phone. Through USB forwarding, the local Metro address is:

```text
http://127.0.0.1:8082
```

## Common problems

### The development build is not installed

Follow [Install the development build](#install-the-development-build), then run `npm run android` again.

### More than one physical phone is connected

The launcher uses the first authorized physical device returned by ADB. Disconnect other phones before starting if a specific phone is required.

### The authorization prompt does not appear

1. Open **Developer options**.
2. Select **Revoke USB debugging authorizations**.
3. Disconnect and reconnect the phone.
4. Keep the phone unlocked and accept the new prompt.

### Windows sees the phone but ADB does not

- Change USB mode from charging to file transfer.
- Try a different data-capable cable or USB port.
- Install the manufacturer's Android USB driver or the Google USB Driver through Android Studio.
- Restart ADB:

```powershell
adb kill-server
adb start-server
adb devices -l
```

### Port 8082 is already occupied

Stop the old Metro/Node process, then rerun `npm run android`. Only one Metro server should use port 8082 because the USB launcher forwards that exact port.

### Emulator development

To intentionally use an Android emulator instead of the physical-device workflow, run:

```powershell
npm run android:emulator
```

## Disconnecting

Stopping Metro is normally sufficient. To remove USB port forwarding manually, run:

```powershell
adb reverse --remove tcp:8082
```
