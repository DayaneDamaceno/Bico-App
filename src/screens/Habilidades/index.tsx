import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { AntDesign } from "@expo/vector-icons";
import { obterHabilidades } from "../../api/ApiService";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/StackNavigations";

type HabilidadesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Habilidades"
>;

type HabilidadesScreenProps = {
  navigation: HabilidadesScreenNavigationProp;
};

// interface HabilidadeProps {
//   // idCategoria: number;
//   // nomeCategoria: string;
// }

export function HabilidadeScreen(props: HabilidadesScreenProps) {
  const { isLoading, data } = useQuery("habilidades", () =>
    obterHabilidades(1)
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itens}
              onPress={() => props.navigation.navigate("Prestadores")}
            >
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}
