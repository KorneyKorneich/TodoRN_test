import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/shared/types/navigationTypes/navigationTypes.ts";

export type Nullable<T> = null | T;
export const useAppNavigation = () =>
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
