import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_URL, RootStackParamList, WorkerProfileProps } from "../types/navigation"
import { useEffect, useState } from "react";
import { Rating, WorkerProfileData } from "../types/profile";
import PrettyStars from "../components/PrettyStars";
import ReviewCard from "../components/ReviewCard";

const { width } = Dimensions.get('window');

export default function WorkerProfile() {

    const route = useRoute<WorkerProfileProps>();
    const { workerId } = route.params;

    const [isLoadingProfileData, setIsLoadingProfileData] = useState(true);
    const [profileData, setProfileData] = useState<WorkerProfileData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const URL = API_URL + 'user/profileinfo/' + workerId;

        const loadWorkerInfo = async () => {
            try {
                setIsLoadingProfileData(true);
                setError(null);

                const response = await fetch(URL)

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: no se pudo buscar los perfiles`);
                }

                const responsejson: any = await response.json();

                if (!responsejson.success) {
                    setError('¡Vaya! Ocurrió un error')
                    setProfileData(null) // limpiar lista de perfiles en caso de error
                }

                setProfileData(responsejson.data);
            } catch (err: any) {
                console.log(err.message);
                setError('¡Vaya! Ocurrió un error')
            } finally {
                setIsLoadingProfileData(false);
            }
        }
        loadWorkerInfo();
    }, [workerId]);

    console.log(profileData);

    const renderSkillRating = (ratingItem: Rating, isGeneral: boolean) => {
        const ratingValue = parseFloat(ratingItem.rating)

        return (
            <View
                key={ratingItem.id}
                style={[
                    styles.skillBar,
                    isGeneral ? styles.skillGeneral : styles.skillSpecific
                ]}>
                <Text
                    style={isGeneral ? styles.skillNameGeneral : styles.skillNameText}>
                    {ratingItem.skill}
                </Text>
                <View style={styles.skillDetails}>
                    <Text style={isGeneral ? styles.skillRatingGeneral : styles.skillRatingText}>
                        {ratingValue.toFixed(1)}
                    </Text>
                    <PrettyStars rating={ratingValue} />
                </View>

            </View>
        )
    }

    if (error || !profileData) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorMessage}>{error || "Error al cargar el perfil."}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonError}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const info = profileData.info;
    const ratings = profileData.ratings;
    const reviews = profileData.reviews;

    const generalRating = ratings.find(r => r.skill === "General");
    const specificRatings = ratings.filter(r => r.skill !== "General");

    return (
        <View style={styles.container} >
            {/* <ScrollView style={styles.scroll} > */}

                {/* INFORMACIÓN GENERAL */}
                <View style={styles.mainInfo}>
                    <Image
                        style={styles.pfpImage}
                        source={{ uri: API_URL + '/images/' + info.pfpFileName }}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.workerName}>
                            {info.fullName}
                        </Text>
                        <View style={styles.ratingRow}>
                            <Text style={styles.overallRating}>{
                                info.reviewAverage}
                            </Text>
                            <PrettyStars rating={info.reviewAverage} />
                            <Text style={styles.totalReviewsText}>
                                {info.totalReviews}
                                {info.totalReviews === 1 ? ' reseña' : ' reseñas'}
                            </Text>
                        </View>
                        <View style={styles.skillTagsContainer}>

                            {info.skills.map((skill: string, index: number) => (
                                <Text style={styles.skill} key={index}>{skill}</Text>
                            ))}
                        </View>
                    </View>

                </View>

                {/* PORTAFOLIO */}
                {info.gallery.length > 0 && (
                    <View style={styles.portfolioContainer}>
                        {/* Imagen principal del portafolio */}
                        <Image
                            style={styles.portfolioImage}
                            source={{ uri: API_URL + '/images/' + info.gallery[0] }}
                        />
                    </View>
                )}

                {/* BOTÓN DE CONTACTO */}
                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>
                        Contactar
                    </Text>
                </TouchableOpacity>

                {/* BIOGRAFÍA */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        {info.biography}
                    </Text>
                </View>

                {/* --- SEPARADOR --- */}
                <View style={styles.separator} />
                {/* RESEÑAS */}
                <Text style={styles.reviewsTitle}>
                    Reseñas de clientes
                </Text>

                {/* ---------- RESEÑA GENERAL ---------- */}
                {generalRating && renderSkillRating(generalRating, true)}

                {/* ---------- SKILL RATINGS ESPECÍFICAS ---------- */}
                <View style={styles.specificSkillsContainer}>
                    {specificRatings.map(skill => renderSkillRating(skill, false))}
                </View>

                {/* ---------- BOTÓN ESCRIBIR RESEÑA ---------- */}
                <TouchableOpacity
                    style={styles.writeReviewButton}
                    onPress={() => navigation.navigate('Review')}>
                    <Text style={styles.writeReviewButtonText}>
                        Escribir Reseña
                    </Text>
                </TouchableOpacity>

                {/* ---------- LISTA DE RESEÑAS ---------- */}
                <View style={styles.reviewsList}>
                    {reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </View>
            {/* </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
    },
    scroll: {
        // flex: 1,
        // height: '100%',
        paddingBottom: 30
    },
    contentContainer: {
        flex: 1,
        paddingBottom: 20,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#2A5C8C',
        fontFamily: 'Inter_400Regular',
    },
    errorMessage: {
        fontSize: 18,
        padding: 20,
        color: 'white',
        backgroundColor: '#D9534F',
        borderRadius: 8,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Inter_400Regular',
    },
    backButtonError: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#2A5C8C',
        borderRadius: 5,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Inter_400Regular',
    },

    // --- INFO GEN ---

    mainInfo: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    pfpImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginRight: 15,
        backgroundColor: '#E0E0E0',
        resizeMode: 'cover',
    },
    nameContainer: {
        flex: 1,
    },
    workerName: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Inter_400Regular',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    overallRating: {
        fontSize: 16,
        color: 'black',
        marginRight: 5,
        fontFamily: 'Inter_400Regular',
    },
    totalReviewsText: {
        fontSize: 14,
        color: 'black',
        marginLeft: 8,
        fontFamily: 'Inter_400Regular',
    },
    skillTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8, // Espacio debajo de la fila de rating
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
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        // overflow: 'hidden'
    },

    // --- GALLERY ---
    portfolioContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        justifyContent: 'center',
        marginTop: 10,
    },
    portfolioImage: {
        width: 338,
        height: 338,
        backgroundColor: '#E0E0E0',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    // --- CONTACT ---
    contactButton: {
        backgroundColor: '#FFC107',
        borderRadius: 12,
        paddingVertical: 15,
        marginHorizontal: 25,
        marginTop: 25,
        marginBottom: 20,
    },
    contactButtonText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },

    // --- BIO ---

    descriptionContainer: {
        paddingHorizontal: 25,
        backgroundColor: 'white',
        paddingVertical: 15,
    },
    descriptionText: {
        fontSize: 16,
        color: 'black',
        lineHeight: 22,
        textAlign: 'justify',
        fontFamily: 'Inter_400Regular',
    },

    separator: {
        height: 0.5,
        backgroundColor: '#a3a3a3ff',
        width: '100%',
        marginBottom: 10,
    },

    // --- REVIEWS ---

    reviewsTitle: {
        alignSelf: 'center',
        fontSize: 22,
        color: 'black',
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 10,
        backgroundColor: 'white',
        fontFamily: 'Inter_500Medium',
    },

    // --- SKILL REVS ---

    skillBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    skillGeneral: {
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    skillSpecific: {
        backgroundColor: '#2A5C8C',
    },
    skillNameText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'white',
        fontFamily: 'Inter_400Regular',
    },
    skillNameGeneral: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Inter_400Regular',
    },
    skillDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
    },
    skillRatingText: {
        fontSize: 16,
        color: 'white',
        marginRight: 5,
        fontFamily: 'Inter_400Regular',
    },
    skillRatingGeneral: {
        fontSize: 18,
        color: 'black',
        marginRight: 5,
        fontFamily: 'Inter_400Regular',
    },
    specificSkillsContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 10,
    },

    // --- WRITE REV ---

    writeReviewButton: {
        backgroundColor: '#FFC107',
        borderRadius: 12,
        paddingVertical: 15,
        marginHorizontal: 25,
        marginVertical: 15,
    },
    writeReviewButtonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
    reviewsList: {
        paddingHorizontal: 20,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 20
    }
});