import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>
                Serviralia
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // imagen y el texto a la izquierda
        backgroundColor: '#2A5C8C',
        paddingHorizontal: 15,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    title: {
        color: 'white',
        paddingLeft: 3,
        fontSize: 30,
        letterSpacing: 0.5,
        // fontFamily: 'Inter_500Medium',
        fontFamily: 'Inter_400Regular'
    },
});