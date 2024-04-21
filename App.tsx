import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import Categoria from "./components/Categoria";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { obterCategorias } from "./Services/api";
import BotaoPersonalizado from "./components/Categoria";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View >
        <StatusBar style="auto" />
        <ListaCategorias />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  listaCategorias: {
    display: 'flex',
    gap: 10,
    flexDirection: "row",
    borderRadius: 25, // Bordas arredondadas
    marginHorizontal: 40,
    overflow: 'hidden', // Garante que o borderRadius seja aplicado corretamente
    flexWrap: "wrap",
    margin: 80,
    backgroundColor: 'green',
  },

});


function ListaCategorias(){
  const {isLoading, data: categorias} = useQuery("Categorias", obterCategorias)
  if(isLoading){
    
    return <ActivityIndicator/>
  }

  console.log(categorias)
  return (

      <View >
        <Text>Buscar</Text>
        <View style={styles.listaCategorias}>
          {categorias?.map(
            item => (
              <BotaoPersonalizado key={item.id} nome={item.nome}/>
            )
          )}
        </View>
      </View>
  );

}