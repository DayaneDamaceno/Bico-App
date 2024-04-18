import { createStackNavigator } from "@react-navigation/stack";
import { PrestadoresMaisProximosScreen } from "../screens/PrestadoresMaisProximos";
import { HabilidadeScreen } from "../screens/Habilidades";

export type RootStackParamList = {
  Habilidades: undefined;
  Prestadores: undefined;
  // Prestadores: { itemId: number, otherParam?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export function SearchStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Habilidades" component={HabilidadeScreen} />
      <Stack.Screen
        name="Prestadores"
        component={PrestadoresMaisProximosScreen}
      />
    </Stack.Navigator>
  );
}
