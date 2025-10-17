import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    // Estados para guardar lo que el usuario escribe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* 1. Logo de la aplicación */}
                <Image
                    source={require('../assets/images/logo.png')} // ¡IMPORTANTE! Cambia esto por la ruta a tu logo
                    style={styles.logo}
                />

                {/* 2. Título */}
                <Text style={styles.title}>Iniciar Sesión</Text>

                {/* 3. Contenedor para los campos de texto con borde compartido */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.inputEmail]} // Combina estilos
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>

                {/* 4. Sección de "Recuérdame" y mensaje de error */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.rememberMe}
                        onPress={() => setRememberMe(!rememberMe)} // Cambia el estado al presionar
                    >
                        <View style={[styles.checkbox, { backgroundColor: rememberMe ? '#2A5C8C' : '#D9D9D9' }]} />
                        <Text style={styles.rememberMeText}>Recuérdame</Text>
                    </TouchableOpacity>
                    <Text style={styles.errorText}>Mensaje de error</Text>
                </View>

                {/* 5. Botón de Entrar */}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => alert(`Email: ${email}, Pass: ${password}`)}
                >
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>

                {/* 6. Divisor de "O crear una cuenta" */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>O crear una cuenta</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* 7. Botones de rol (Cliente / Trabajador) */}
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
    );
}

// Estos son los estilos, traducidos de tu Figma
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Asumiendo fondo blanco, cámbialo si es necesario
    },
    content: {
    flex: 1,
    alignItems: 'center',       // Centra todo horizontalmente
    justifyContent: 'center',  // ¡LA CLAVE! Centra todo verticalmente
    paddingHorizontal: 16,
    },
    logo: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
    // Reducimos drásticamente el margen fijo
    marginBottom: 40, 
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: '400', // 'regular' se traduce a 400
        marginBottom: 20, // Espacio entre título e inputs
    },
    inputContainer: {
        width: 275,
        height: 94,
        borderColor: '#BEBEBE',
        borderWidth: 1,
        borderRadius: 0, // Como mencionaste
    },
    input: {
        height: 47, // La mitad de la altura del contenedor (94 / 2)
        paddingHorizontal: 10,
        fontSize: 15,
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
        marginTop: 20, // Un pequeño espacio
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
    },
    errorText: {
        color: 'red',
        fontSize: 12.5,
    },
    loginButton: {
    backgroundColor: '#2A5C8C',
    width: 275,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // Reducimos drásticamente el margen fijo
    marginTop: 30, 
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: 275,
    },
    dividerLine: {
        flex: 1, // Hace que la línea ocupe el espacio disponible
        height: 1, // Usamos 1 en vez de 0 para que sea visible
        backgroundColor: 'black',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#888',
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
        color: '#000', // Asumiendo texto negro sobre amarillo para contraste
        fontWeight: 'bold',
    },
});