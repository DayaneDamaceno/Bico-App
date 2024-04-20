import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { PrestadoresMaisProximosScreen } from "../PrestadoresMaisProximos";
import { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/StackNavigations";
import { useQuery } from "react-query";
import { obterHabilidadesBusca } from "../../api/ApiService";
import { Ionicons, Feather } from "@expo/vector-icons";

type CategoriasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Categorias"
>;

type CategoriasScreenProps = {
  navigation: CategoriasScreenNavigationProp;
};
export function CategoriasScreen(props: CategoriasScreenProps) {
  const [busca, setBusca] = useState('');
  const { isLoading, data } = useQuery("habilidades-busca", () =>
    obterHabilidadesBusca(busca)
  );

  async function Buscar(textoBusca: string) {
    setBusca(textoBusca)
    console.log(textoBusca)
  }
  useEffect(() => {
    Buscar(busca);
  }, [busca]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container_wrapper}>
        <View style={styles.input_wrapper}>
          <TouchableOpacity
            style={styles.lista}
            onPress={() => props.navigation.navigate("Habilidades", { itens: data })}
          >
            <Ionicons name="search" color={"grey"} size={20}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
            placeholder="O que você precisa?"
          />
        </View>
      </View>
    </View>
  );
}
