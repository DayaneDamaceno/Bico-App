import { createStackNavigator } from "@react-navigation/stack";
import { PrestadoresMaisProximosScreen } from "../screens/PrestadoresMaisProximos";
import { HabilidadeScreen } from "../screens/Habilidades";
import { CategoriasScreen } from "../screens/Categorias";
import { PerfilScreen } from "../screens/Perfil";
import { AnunciarScreen } from "../screens/Anunciar";
import { AlteraPerfilScreen } from "../screens/AlteraPerfil";

export type RootStackParamList = {
  Categorias: undefined;
  Habilidades: { categoriaId?: number; textoBusca?: string };
  Prestadores: { habilidadeId: number };
  Perfil: {prestadorId: number};
  Anunciar: {prestadorId: number};
  AlteraPerfil: {id: number}
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
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Anunciar" component={AnunciarScreen} />
      <Stack.Screen name="AlteraPerfil" component={AlteraPerfilScreen} />
    </Stack.Navigator>
  );
}
