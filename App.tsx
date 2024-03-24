import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Categoria } from "./components/Categoria";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Dayane Wesley e dudu</Text>
      <Button title="Clique Aqui" />
      <StatusBar style="auto" />
      <View style={styles.listaCategorias}>
        <Categoria icon="icon" nome="Reformas e raparos" />
        <Categoria nome="nome 2" icon="icon 2" />
        <Categoria nome="nome 3" icon="icon 3" />
        <Categoria nome="nome 4" icon="icon 4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
