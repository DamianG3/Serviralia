import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_URL, RootStackParamList, SearchProps } from "../types/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../types/profile";
import ProfileCardList from "../components/ProfileCardList";

interface Skill {
    id_skill: number;
    skill_name: string;
}

export default function Search() {

    const route = useRoute<SearchProps>();
    const { skillId } = route.params;

    const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
    const [isLoadingSkillName, setIsLoadingSkillName] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [skillName, setSkillName] = useState('skill seleccionada');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {

        const fetchSkillName = async () => {
            try {
                setIsLoadingSkillName(true);
                const response = await fetch(API_URL + 'user/skills');

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: no se pudo obtener la lista de skills.`);
                }

                const responsejson: { success: boolean, data: Skill[] } = await response.json();

                if (responsejson.success && responsejson.data) {
                    // busca el name por id 
                    const selectedSkill = responsejson.data.find(s => s.id_skill === skillId);

                    if (selectedSkill) {
                        setSkillName(selectedSkill.skill_name);
                    } else {
                        // id no en la lista
                        setSkillName(`ID desconocido (${skillId})`);
                    }
                }
            } catch (err: any) {
                console.error("Error al obtener el nombre de la skill:", err);
                setSkillName(`Error al cargar nombre (ID: ${skillId})`);
            } finally {
                setIsLoadingSkillName(false);
            }
        };

        fetchSkillName();
    }, [skillId]);

    useEffect(() => {
        const URL = API_URL + 'user/SearchSkill/' + skillId;

        const loadProfiles = async () => {
            try {
                setIsLoadingProfiles(true);
                setError(null);

                const response = await fetch(URL)

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: no se pudo buscar los perfiles`);
                }

                const responsejson: any = await response.json();

                if (!responsejson.success) {
                    setError('¡Vaya! Ocurrió un error')
                    setProfiles([]) // limpiar lista de perfiles en caso de error
                }

                setProfiles(responsejson.data.slice(0, 10));
            } catch (err: any) {
                console.log(err.message);
                setError('¡Vaya! Ocurrió un error')
            } finally {
                setIsLoadingProfiles(false);
            }
        }
        loadProfiles();
    }, [skillId]);

    // selección de trabajador para visualizar perfil
    const handleWorkerSelection = (workerId: number) => {
        console.log(`Trabajador seleccionado: ${workerId}`);
        navigation.navigate('WorkerProfile', { workerId: workerId })
    };

    if (isLoadingProfiles || isLoadingSkillName) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#2A5C8C" />
                <Text>
                    Cargando perfiles...
                </Text>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ paddingBottom: 40 }}>
        <Image
            style={{ width: '100%', height: 150 }}
            source={{ uri: API_URL + '/backgrounds/' + skillId + '.png' }}
        />

        <Text style={styles.title}>
            {skillName}
        </Text>

        {error ? (
            <Text style={styles.errorMessage}>{error}</Text>
        ) : (
            <ProfileCardList
                Profiles={profiles}
                onProfilePress={handleWorkerSelection}
            />
        )}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scroll: {
        // flex: 1,
        paddingBottom: 40,
        backgroundColor: 'red' // para pruebas
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 40
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 32,
        marginTop: 20,
        marginBottom: 22,
        color: 'black',
        fontFamily: 'Inter_500Medium'
    },
    errorMessage: {
        fontSize: 18,
        padding: 20,
        color: 'red',
        fontFamily: 'Inter_500Medium'
    },
    cardContainer: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
        // marginHorizontal: 30,
        marginLeft: 30,
        marginRight: 30,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    workerIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    cardInfo: {

    },
    name: {
        fontSize: 18,
        paddingBottom: 5,
        fontFamily: 'Inter_400Regular'
    },
    review: {
        fontSize: 13,
        // paddingBottom: 1,
        marginHorizontal: 5,
        fontFamily: 'Inter_400Regular'
    },
    reviewContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    skill: {
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        color: 'white',
        backgroundColor: '#333333',
        marginRight: 10,
        fontFamily: 'Inter_400Regular',
        fontSize: 13
    }
})