import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenName() { // <-- Cambia "ScreenName"
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* ▼ Cambia este texto ▼ */}
                <Text style={styles.title}>Pantalla de search</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});