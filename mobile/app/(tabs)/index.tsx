// En el archivo: mobile/app/(tabs)/index.tsx

import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { Link } from 'expo-router'; // <--- 1. AÑADE ESTA LÍNEA

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      
      {/* --- 2. AÑADE ESTE BLOQUE DE CÓDIGO --- */}
      <View style={styles.linkContainer}>
        <Link href="/login" style={styles.link}>
          <Text style={styles.linkText}>Ir a Iniciar Sesión</Text>
        </Link>
      </View>
      {/* --- FIN DEL BLOQUE AÑADIDO --- */}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  // --- 3. AÑADE ESTOS ESTILOS AL FINAL ---
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2A5C8C',
    borderRadius: 10,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});