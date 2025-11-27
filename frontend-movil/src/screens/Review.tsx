import { Text, TouchableOpacity, View } from "react-native";

export default function Review() {

    return (
        <View>
            <Text>
                Escribir reseña
            </Text>
            {/* SKILL PICKER */}
            <View>
                <Text>
                    Valoración
                </Text>
                {/* ESTRELLAS */}
            </View>
            <View>
                <Text>
                    Comentario
                </Text>
                {/* INPUT TEXT BOX */}
            </View>
            <View>
                {/* ADJUNTAR FOTO? */}
            </View>
            <TouchableOpacity>
                Enviar
            </TouchableOpacity>
        </View>
    )
}