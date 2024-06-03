import { Text, View, Image, TouchableOpacity } from "react-native";
import { Prestador } from "../../api/ApiService";
import { Fontisto } from "@expo/vector-icons";

import { styles } from "./styles";

interface PrestadorItemProps {
  item: Prestador;
}

export function PrestadorItem({ item }: Readonly<PrestadorItemProps>) {
  const mediaEstrelasFormatado = item.mediaEstrelas
    .toFixed(1)
    .replace(".", ",");

  return (
    <View style={styles.item}>
      <Image source={{ uri: item.avatarUrl }} style={styles.roundImage} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <View style={styles.avaliacao}>
          <Fontisto name="star" size={16} color="#EAB308" />
          <Text>{mediaEstrelasFormatado}</Text>
        </View>
      </View>
    </View>
  );
}
