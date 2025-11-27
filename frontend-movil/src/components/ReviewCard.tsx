import { StyleSheet, Text, View } from "react-native";
import { Review } from "../types/profile";
import PrettyStars from "./PrettyStars";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <View style={styles.iconPlaceholder}>
                    <Text style={styles.iconText}>
                        {review.username[0]}
                    </Text>
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.reviewerName}>{
                        review.username}
                    </Text>
                    <Text style={styles.reviewDate}>
                        Publicado en {review.date}
                    </Text>
                </View>

                <View style={styles.skillContainer}>
                    <Text style={styles.skill}>
                        {review.skill}
                    </Text>
                </View>
            </View>

            <View style={styles.ratingAndComment}>
                <PrettyStars rating={review.rating} />
                <Text style={styles.comment}>
                    {review.review}

                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    userInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Inter_400Regular',
    },
    reviewDate: {
        paddingTop: 5,
        fontSize: 12,
        color: '#4C4C4C',
        fontFamily: 'Inter_400Regular',
    },
    skillContainer: {
        alignSelf: 'flex-start',
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
    },
    ratingAndComment: {
        paddingLeft: 50,
    },
    comment: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        lineHeight: 20,
    }
});