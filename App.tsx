import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View} from 'react-native';
import Habilidade from './Habilidade';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
   {/*<Text>Gostoso e solteiro</Text>
      <Button title='Clique ai' ></Button>
      <StatusBar style="auto" />*/}

      <Habilidade idCategoria={1} nomeCategoria='Beleza' />
    </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
