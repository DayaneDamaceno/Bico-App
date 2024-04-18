import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Habilidade } from "./Habilidade";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <View style={styles.container}>
        <Habilidade idCategoria={1} nomeCategoria="Beleza" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
