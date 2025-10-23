import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Splash"
					component={}>
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	)
}