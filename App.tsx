import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Categoria } from "./components/Categoria";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Dayane Wesley e dudu e Gui</Text>
      <Button title="Clique Aqui" />
      <View style={styles.listaCategorias}>
        <Categoria icon="icon" nome="Reformas e reparos" />
        <Categoria nome="nome 2" icon="icon 2" />
        <Categoria nome="nome 3" icon="icon 3" />
        <Categoria nome="nome 4" icon="icon 4" />
        <Categoria nome="sdasdsad" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nome: {
    backgroundColor: "#212334",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listaCategorias: {
    gap: 10,
    flexDirection: "row",
    // flexWrap: "wrap",
  },
});
