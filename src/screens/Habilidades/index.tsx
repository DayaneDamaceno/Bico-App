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

export function HabilidadeScreen(props: HabilidadesScreenProps) {
  const { isLoading, data } = useQuery("habilidades", () =>
    obterHabilidades(1)
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.habilidade}
          onPress={() => props.navigation.navigate("Prestadores")}
        >
          <Text>{item.nome}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
