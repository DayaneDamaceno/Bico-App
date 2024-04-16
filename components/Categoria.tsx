import { StyleSheet, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

interface CategoriaProps {
  id: string;
  nome: string;
}

export function Categoria(props: CategoriaProps) {
  return (
    <View style={styles.categoria}>
      <Fontisto name="home" size={24} color="black" />
      <Text>{props.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoria: {
    backgroundColor: "#7C3AED",
    // width: "50%",
  },
});
