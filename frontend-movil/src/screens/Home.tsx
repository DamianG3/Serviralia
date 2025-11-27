import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../navigation/Header";
import ProfileCardList from "../components/ProfileCardList";
import { useEffect, useState } from "react";
import { API_URL, RootStackParamList } from "../types/navigation";
import { Profile } from "../types/profile";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const skills = [
    { id: 1, name: 'Plomería', image: require('../../assets/skills/Plomeria.png') },
    { id: 2, name: 'Electricidad', image: require('../../assets/skills/Electricidad.png') },
    { id: 3, name: 'Limpieza', image: require('../../assets/skills/Limpieza.png') },
    { id: 4, name: 'Mecánica', image: require('../../assets/skills/Mecanica.png') },
    { id: 5, name: 'Construcción', image: require('../../assets/skills/Construccion.png') },
    { id: 6, name: 'Otros', image: require('../../assets/skills/Otros.png') },
];

const SkillsGrid = ({ skill, onPress }: any) => {

    // asigna color diferente botones de skills
    let backgroundColor;
    switch (skill.id) {
        case 1: backgroundColor = '#CAEBFF'; break;
        case 2: backgroundColor = '#FFECAC'; break;
        case 3: backgroundColor = '#FEE4E8'; break;
        case 4: backgroundColor = '#FFEDE0'; break;
        case 5: backgroundColor = '#DFD3D3'; break;
        case 6: backgroundColor = '#E9E8E8'; break;
        default: backgroundColor = '#F0F0F0';
    }

    // pone la información de los skills en los botones
    return (
        <TouchableOpacity
            style={[styles.gridItem, { backgroundColor: backgroundColor }]}
            onPress={() => onPress(skill.id)}
            activeOpacity={0.7}
        >
            <Image source={skill.image} style={styles.gridItemImage} />
            <Text style={styles.gridItemText}>{skill.name}</Text>
        </TouchableOpacity>
    )
}

export default function Home() {

    const URL = API_URL + 'user/SearchSkill/all';
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfiles = async () => {
            try {
                setError(null);
                const response = await fetch('http://localhost:3003/user/SearchSkill/null');

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: no se pudo conectar con la api`);
                }

                const responsejson: any = await response.json();
                if (!responsejson.success) {
                    setError('¡Vaya! Ocurrió un error')
                }

                setProfiles(responsejson.data.slice(0, 5));
            } catch (err: any) {
                console.log(err.message);
                setError('¡Vaya! Ocurrió un error')
            }
        };

        loadProfiles();
    }, []);

    // selección de skill
    const handleSkillSelection = (skillId: number) => {
        console.log(`Skill seleccionada: ${skillId}`);
        navigation.navigate('Search', { skillId: skillId })
    };

    // selección de trabajador para visualizar perfil
    const handleWorkerSelection = (workerId: number) => {
        console.log(`Trabajador seleccionado: ${workerId}`);
        navigation.navigate('WorkerProfile', { workerId: workerId })
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <Text
                        style={styles.title} >
                        ¿Qué buscas?
                    </Text>
                    {/* hace la cuadricula con la lista de skills */}
                    <FlatList
                        data={skills}
                        renderItem={({ item }) => (
                            <SkillsGrid skill={item} onPress={handleSkillSelection} />
                        )}
                        keyExtractor={(item) => String(item.id)}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        scrollEnabled={false}
                    />

                    <Text
                        style={styles.title} >
                        Recomendados
                    </Text>

                    {error ?
                        <Text style={styles.errorMessage}>
                            {error}
                        </Text>
                        :
                        <ProfileCardList
                            Profiles={profiles}
                            onProfilePress={handleWorkerSelection}
                        />}

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        paddingBottom: 40
    },
    content: {
        flex: 1,
        paddingTop: 16,
    },
    title: {
        paddingHorizontal: 30,
        fontSize: 26,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 22,
        color: 'black',
        fontFamily: 'Inter_400Regular'
    },
    row: {
        paddingHorizontal: 30,
        justifyContent: 'space-between', // espacio igual entre columnas
        marginBottom: 24,
    },
    gridItem: {
        height: 120,
        // width: 156,
        width: (Dimensions.get('window').width / 2) - 40, // para pantallas más grandes
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    gridItemImage: {
        width: 62,
        height: 62,
        marginBottom: 8,
        resizeMode: 'contain',
    },
    gridItemText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Inter_600SemiBold'
    },
    errorMessage: {
        fontSize: 18,
        padding: 20,
        color: 'red',
        fontFamily: 'Inter_500Medium'
    }
})