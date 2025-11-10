// En el archivo: mobile/app/_layout.tsx

import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    ...MaterialCommunityIcons.font,
  });

  // ✅ LÍNEA DE DEPURACIÓN AÑADIDA
  useEffect(() => {
    if (fontError) {
      console.error("Error al cargar la fuente de íconos:", fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack initialRouteName="login"> 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup-client" options={{ headerShown: false }} />
      <Stack.Screen name="signup-worker" options={{ headerShown: false }} />
    </Stack>
  );
}