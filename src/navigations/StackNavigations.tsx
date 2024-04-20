import { createStackNavigator } from "@react-navigation/stack";
import { PrestadoresMaisProximosScreen } from "../screens/PrestadoresMaisProximos";
import { HabilidadeScreen } from "../screens/Habilidades";
import { CategoriasScreen } from "../screens/Categorias";
import { Habilidade } from "../api/ApiService";

export type RootStackParamList = {
  Habilidades: { itens?: Habilidade[] };
  Prestadores: undefined;
  Categorias: undefined;
  // Prestadores: { itemId: number, otherParam?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export function SearchStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categorias" component={CategoriasScreen} />
      <Stack.Screen name="Habilidades" component={HabilidadeScreen} />
      <Stack.Screen
        name="Prestadores"
        component={PrestadoresMaisProximosScreen}
      />
    </Stack.Navigator>
  );
}
