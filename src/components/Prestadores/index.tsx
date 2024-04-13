import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { Fontisto } from "@expo/vector-icons";
import { fetchPrestadoresMaisProximos } from "../../api/PrestadoresServiceApi";

import { styles } from "./styles";

interface PrestadoresProps {}

export function Prestadores(props: PrestadoresProps) {
  const {
    data: prestadores,
    error,
    isLoading,
    isError,
  } = useQuery("prestadoresMaisProximos", fetchPrestadoresMaisProximos);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    console.log(error);
    return <Text>Error: {(error as Error).message}</Text>;
  }
  return (
    <FlatList
      data={prestadores}
      style={styles.lista}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item}>
          <Image source={{ uri: item.avatarUrl }} style={styles.roundImage} />
          <View style={styles.info}>
            <Text style={styles.nome}>{item.nome}</Text>
            <View style={styles.avaliacao}>
              <Fontisto name="star" size={16} color="#EAB308" />
              <Text>4,5</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
