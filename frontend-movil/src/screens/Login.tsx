import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginProps } from "../types/navigation";
import { Inter_400Regular, Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

export default function Login({ navigation }: LoginProps) {

    let [fontsLoaded] = useFonts({
        Inter_400Regular
    })

    // para similar el remember me
    const [rememberMe, setRememberMe] = useState(false);

    // para simular el login y navegar a la pantalla splash
    const handleLogin = () => {
        navigation.replace('MainTabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Logo imagen.png')}
                />

                <Text style={styles.title}>
                    Iniciar Sesión
                </Text>

                {/* -------------------- INPUTS -------------------- */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.inputEmail]}
                        placeholder="Correo electrónico">
                    </TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña">
                    </TextInput>
                </View>

                {/* -------------------- BOTONES -------------------- */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.rememberMe}
                        onPress={() => setRememberMe(!rememberMe)}>
                        <View style={[styles.checkbox, { backgroundColor: rememberMe ? '#2A5C8C' : '#D9D9D9' }]} />
                        <Text style={styles.rememberMeText}>Recuérdame</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>O crear una cuenta</Text>
                    <View style={styles.dividerLine} />
                </View>
                <View style={styles.roleButtonContainer}>
                    <TouchableOpacity style={styles.roleButton}>
                        <Text style={styles.roleButtonText}>Cliente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roleButton}>
                        <Text style={styles.roleButtonText}>Trabajador</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: '400',
        marginBottom: 20,
        fontFamily: 'Inter_400Regular'
    },
    inputContainer: {
        width: 275,
        height: 94,
        borderColor: '#BEBEBE',
        borderWidth: 1,
        borderRadius: 0
    },
    input: {
        height: 47, // La mitad de la altura del contenedor (94 / 2)
        paddingHorizontal: 10,
        fontSize: 15,
        fontFamily: 'Inter_400Regular'
    },
    inputEmail: {
        borderBottomWidth: 1, // La línea que separa los dos campos
        borderColor: '#BEBEBE',
    },
    optionsContainer: {
        flexDirection: 'row', // Pone los elementos en una fila
        justifyContent: 'space-between', // Empuja los elementos a los extremos
        alignItems: 'center',
        width: 275,
        marginTop: 20,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#636363',
        borderRadius: 5,
    },
    rememberMeText: {
        marginLeft: 8,
        fontFamily: 'Inter_400Regular'
    },
    loginButton: {
        backgroundColor: '#2A5C8C',
        width: 275,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter_400Regular'
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: 275,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
    dividerText: {
        marginHorizontal: 10,
        color: 'black',
        fontFamily: 'Inter_400Regular'
    },
    roleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 275,
        marginTop: 20,
    },
    roleButton: {
        backgroundColor: '#FFC107',
        width: 125,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleButtonText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'normal',
        fontFamily: 'Inter_400Regular'
    },
});