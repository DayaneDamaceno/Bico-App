import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { obterHabilidades, obterHabilidadesBusca } from "../../api/ApiService";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigations/StackNavigations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type HabilidadesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Habilidades"
>;

export function HabilidadeScreen(props: Readonly<HabilidadesScreenProps>) {
  const { textoBusca, categoriaId } = props.route.params;

  const { data, isLoading } = useQuery(
    ["buscarItems", categoriaId, textoBusca],
    () => {
      if (categoriaId) {
        return obterHabilidades(categoriaId);
      } else if (textoBusca) {
        return obterHabilidadesBusca(textoBusca);
      }
    },
    {
      enabled: !!categoriaId || !!textoBusca,
    }
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
          onPress={() =>
            props.navigation.navigate("Prestadores", { habilidadeId: item.id })
          }
        >
          <Text>{item.nome}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
