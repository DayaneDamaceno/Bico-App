import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View} from 'react-native';
import Categoria from './Categoria';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
   {/*<Text>Gostoso e solteiro</Text>
      <Button title='Clique ai' ></Button>
      <StatusBar style="auto" />*/}

      <Categoria/>
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
