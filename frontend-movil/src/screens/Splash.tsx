import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SplashProps } from "../types/navigation";

export default function Splash({ navigation }: SplashProps) {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login')
        }, 3000)
    }, [])

    return (
        <View style={styles.contenedor}>
            <Image
                source={require('../../assets/Logo imagen.png')}
                style={styles.logo} />
            <Text style={styles.titulo}>
                Bienvenido a Serviralia
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logo: {
        width: 200,
        height: 200,
        margin: 20
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'normal',
        color: 'black',
        margin: 10,
        fontFamily: 'Inter_400Regular'
    }
})