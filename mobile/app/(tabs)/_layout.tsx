// En el archivo: mobile/app/(tabs)/_layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#FFC107',  
        tabBarInactiveTintColor: '#FFFFFF', 
        tabBarShowLabel: false, // Oculta el texto
        tabBarStyle: {
          backgroundColor: '#2A5C8C', 
          borderTopWidth: 0, 
          height: 60, 
        },
      }}
    >
      {/* 1. Home (Orden: 1º) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={28} color={color} />
          ),
        }}
      />
      {/* 2. Solicitudes/Contacto (Orden: 2º) */}
      <Tabs.Screen
        name="contact"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email" size={28} color={color} />
          ),
        }}
      />
      {/* 3. Perfil (Orden: 3º) */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={28} color={color} />
          ),
        }}
      />
      {/* 4. Preguntas/FAQ (Orden: 4º) */}
      <Tabs.Screen
        name="faq"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="help-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}