import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_URL, RootStackParamList, SearchProps } from "../types/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../types/profile";
import ProfileCardList from "../components/ProfileCardList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PrettyStars from "../components/PrettyStars";

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


    // -------------------------------------------- FLATLIST EVERYTHING --------------------------------------------------------

    // const HeaderComponent = () => (
    //     <>
    //         <Image style={{ width: '100%', height: 150 }} source={{ uri: API_URL + '/backgrounds/' + skillId + '.png' }} />
    //         <Text style={styles.title}>{skillName}</Text>
    //     </>
    // );

    // const RenderProfileCard  = ({ item, onPress }: any) => (
    //     <TouchableOpacity
    //         style={styles.cardContainer}
    //         onPress={() => onPress(item.id_worker)}
    //         activeOpacity={0.8}
    //     >

    //         <View style={styles.cardHeader}>
    //             <Image
    //                 source={{ uri: API_URL + '/images/' + item.pfpFileName }}
    //                 style={styles.workerIcon}
    //             />


    //             <View style={styles.cardInfo}>
    //                 <Text style={styles.name}>
    //                     {item.fullName}</Text>

    //                 <View style={styles.reviewContainer}>
    //                     <Text style={styles.review}>{item.rating}</Text>

    //                     <PrettyStars rating={item.rating} />

    //                     <Text style={styles.review}>
    //                         {item.totalReviews}
    //                         {item.totalReviews === 1 ? ' reseña' : ' reseñas'}
    //                     </Text>
    //                 </View>

    //                 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

    //                     {item.skills.map((skill: string, index: number) => (
    //                         <Text style={styles.skill} key={index}>{skill}</Text>
    //                     ))}
    //                 </View>


    //             </View>
    //         </View>

    //     </TouchableOpacity>
    // );

    return (
        // {/* <GestureHandlerRootView style={{ flex: 1 }}>
        //     <View style={styles.container}>
        //         <FlatList
        //             data={profiles}
        //             keyExtractor={(item) => item.id_worker.toString()}
        //             renderItem={({ item }) => <RenderProfileCard item={item} onPress={handleWorkerSelection} />}
        //             ListHeaderComponent={<HeaderComponent />}
        //             contentContainerStyle={{ paddingBottom: 40 }}
        //             showsVerticalScrollIndicator={true}
        //         />
        //         <ScrollView style={styles.scroll}
        //         contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        //         showsVerticalScrollIndicator={true}> */}
        <View style={styles.content}>
            <View>
                <Image
                    style={{ width: '100%', height: 150 }}
                    source={{ uri: API_URL + '/backgrounds/' + skillId + '.png' }}
                />
            </View>
            <ScrollView style={styles.scroll}>
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
        </View>
        //     {/* </ScrollView>} */}
        //     {/* </View>
        // </GestureHandlerRootView> */}
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
        // width: 150,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        color: 'white',
        backgroundColor: '#333333',
        marginRight: 10,
        fontFamily: 'Inter_400Regular',
        fontSize: 13
    }
})