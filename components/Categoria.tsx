// Categoria.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fontisto } from "@expo/vector-icons";

interface CategoriaProps {
  nameIcone?: string;
  nome: string;
  corIcone?: string;
  cor?: string;
  
}
export default function BotaoPersonalizado(props: CategoriaProps) {
  return (
    <TouchableOpacity onPress={() => console.log("clicou")} style={{ padding: 32 }}>
      <Fontisto name="home" size={34} color="blue" />
      <Text>{props.nome}</Text>
    </TouchableOpacity>
  );
}
    

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#F97316',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderBottomColor: '1',
  },
  button2: {
    backgroundColor: '#7C3AED',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button3: {
    backgroundColor: '#14B8A6',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button4: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

