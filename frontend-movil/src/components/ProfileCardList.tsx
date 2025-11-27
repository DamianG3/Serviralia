import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { API_URL } from "../types/navigation";
import PrettyStars from './PrettyStars';
import { Profile } from '../types/profile';

interface ProfileCardListProps {
    Profiles: Profile[];
    onProfilePress: (workerId: number) => void;
}

export default function ProfileCardList({ Profiles, onProfilePress }: ProfileCardListProps) {
    // console.log(API_URL);

    console.log(Profiles); // This prints the list fine


    const RenderCard = ({ item }: any) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => onProfilePress(item.id_worker)}
            activeOpacity={0.8}
        >

            <View style={styles.cardHeader}>
                <Image
                    source={{ uri: API_URL + '/images/' + item.pfpFileName }}
                    style={styles.workerIcon}
                />


                <View style={styles.cardInfo}>
                    <Text style={styles.name}>
                        {item.fullName}</Text>

                    <View style={styles.reviewContainer}>
                        <Text style={styles.review}>{item.rating}</Text>

                        <PrettyStars rating={item.rating} />

                        <Text style={styles.review}>
                            {item.totalReviews}
                            {item.totalReviews === 1 ? ' reseña' : ' reseñas'}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                        {item.skills.map((skill: string, index: number) => (
                            <Text style={styles.skill} key={index}>{skill}</Text>
                        ))}
                    </View>


                </View>
            </View>

        </TouchableOpacity>
    );


    return (
        <FlatList
            data={Profiles}
            renderItem={({ item }) => <RenderCard item={item} />}
            keyExtractor={(item) => item.id_worker.toString()}
            scrollEnabled={false}
        />
    )
}

const styles = StyleSheet.create({
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