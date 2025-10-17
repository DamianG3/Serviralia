// En el archivo: mobile/app/_layout.tsx

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Ocultamos el header para el grupo de pantallas con tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Ocultamos el header para nuestra pantalla de login */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}