import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import axios from "axios";
import ListaBusca from "./ListaBusca";

interface Habilidade {
  id: number,
  nome: string,
  categoriaId: number
}

export default function Busca() {
  const [busca, setBusca] = useState('');

  async function Buscar(textoBusca: string) {    
    ListaBusca(textoBusca);
  }
  useEffect(() => {
    Buscar(busca);
  }, [busca]);

  return (
    <View style={styles.container}>
      <View style={styles.textinput}>      
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="O que você precisa?"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "2%",
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  }, 
  textinput: {
    justifyContent: 'center',
    padding: 10,
    gap: 12,
    width: 400,
    height: 38,
    left: "4%",
    top: "80%",
    shadowColor: "black",
    shadowRadius: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#CBD5E1",
    borderWidth: 1
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