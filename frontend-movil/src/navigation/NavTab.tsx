import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Leads from "../screens/Leads";
import Profile from "../screens/Profile";
import FAQ from "../screens/FAQ";

const Tab = createBottomTabNavigator();

export default function NavTab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                // headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;
                    const iconSize = 35;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Leads') {
                        iconName = focused ? 'mail' : 'mail';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person';
                    } else if (route.name === 'FAQ') {
                        iconName = focused ? 'help-circle' : 'help-circle';
                    }

                    return <Ionicons name={iconName} size={iconSize} color={color} />
                },
                tabBarStyle: {
                    backgroundColor: '#2A5C8C',
                    borderTopColor: '#2A5C8C',
                    height: 100
                },
                tabBarActiveTintColor: '#FFC107',
                tabBarInactiveTintColor: 'white',
                tabBarIconStyle: {
                    marginTop: 10
                }
            })}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}>
            </Tab.Screen>
            <Tab.Screen
                name="Leads"
                component={Leads}>
            </Tab.Screen>
            <Tab.Screen
                name="Perfil"
                component={Profile}>
            </Tab.Screen>
            <Tab.Screen
                name="FAQ"
                component={FAQ}>
            </Tab.Screen>
        </Tab.Navigator>
    )
}