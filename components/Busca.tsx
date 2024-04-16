import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import axios from "axios";

interface Habilidade {
  id: number,
  nome: string,
  categoriaId: number
}

export default function Busca() {
  const [busca, setBusca] = useState('');
  const [lista, setLista] = useState<Habilidade[]>([]);

  async function Buscar(textoBusca: string) {
    const response = await fetch(`http://192.168.0.76:5283/Habilidade/Buscar/${textoBusca}`);
    const data = await response.json();
    setLista(data);
  }
  useEffect(() => {
    Buscar(busca);
  }, [busca]);


  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="O que você precisa?"
        />
      </View>
      
        <FlatList
          data={lista}
          renderItem={({ item }) => <Text style={styles.itens}>{item.nome}</Text>}
          keyExtractor={item => item.id.toString()}
        />
      

    </View>
  );
}



const styles = StyleSheet.create({
  list: {
    paddingTop: 25,
    backgroundColor: 'grey',
    width: '100%',
    height: '100%'
  },
  container: {
    paddingTop: 25,
    backgroundColor: 'grey',
    width: '100%',
    height: '100%'
  },
  input: {
    padding: 10,
    gap: 12,
    width: 400,
    height: 38,
    left: 15,
    right: 6,
    top: 390,
    backgroundColor: 'white',
    borderRadius: 5

  },
  top: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    //justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0'
  },
  voltar: {
    paddingRight: 10
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  itens: {
    fontSize: 18,
    height: 50,
    width: '100%',
    paddingLeft: 40,
    paddingTop: 10,
    borderBottomWidth: 1.5, // Border width
    borderBottomColor: '#E2E8F0',
  }
});