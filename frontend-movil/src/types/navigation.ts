import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  Home: undefined;
  Search: { skillId: number };
  WorkerProfile: { workerId: number };
  Review: undefined;
  // Profile: { workerId: number };
}

export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SearchProps = RouteProp<RootStackParamList, 'Search'>;
export type WorkerProfileProps = RouteProp<RootStackParamList, 'WorkerProfile'>
// export type ProfileProps = RouteProp<RootStackParamList, 'Profile'>

export const API_URL = 'http://localhost:3003/';

