const { spawn, spawnSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const { join } = require('node:path');

const adb = process.platform === 'win32'
  ? join(process.env.LOCALAPPDATA ?? '', 'Android', 'Sdk', 'platform-tools', 'adb.exe')
  : 'adb';

if (process.platform === 'win32' && !existsSync(adb)) {
  console.error(`ADB was not found at ${adb}.`);
  process.exit(1);
}

process.loadEnvFile(join(__dirname, '..', '.env'));
const metroPort = Number(process.env.RCT_METRO_PORT ?? 8081);

const devicesResult = spawnSync(adb, ['devices'], { encoding: 'utf8' });
const devices = devicesResult.stdout
  .split(/\r?\n/)
  .slice(1)
  .map((line) => line.trim().split(/\s+/))
  .filter(([serial, state]) => serial && state === 'device' && !serial.startsWith('emulator-'));

if (devices.length === 0) {
  console.error('No authorized physical Android device found. Enable USB debugging and reconnect the phone.');
  process.exit(1);
}

const [serial] = devices[0];
const forwardedPorts = [metroPort, 3001, 3002];

for (const port of forwardedPorts) {
  const reverseResult = spawnSync(
    adb,
    ['-s', serial, 'reverse', `tcp:${port}`, `tcp:${port}`],
    { stdio: 'inherit' }
  );

  if (reverseResult.status !== 0) {
    process.exit(reverseResult.status ?? 1);
  }
}

console.log(
  `Using physical Android device ${serial} over USB (ports ${forwardedPorts.join(', ')}).`
);

const expoCli = require.resolve('expo/bin/cli');
const expo = spawn(process.execPath, [expoCli, 'start', '--clear', '--lan', '--android', '--dev-client'], {
  env: {
    ...process.env,
    EXPO_PACKAGER_PROXY_URL: `http://127.0.0.1:${metroPort}`,
  },
  stdio: 'inherit',
});

expo.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
