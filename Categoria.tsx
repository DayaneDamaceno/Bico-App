import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component}  from 'react';
import { ActivityIndicator, SafeAreaView, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import { obterHabilidades } from './src/Services/Api';
import { useQuery } from 'react-query';
import Icon from 'react-native-vector-icons/AntDesign';


export default function Categoria() {
  const {isLoading, data } = useQuery("habilidades", () => obterHabilidades(1))  //Id categoria
  if(isLoading){

    return <ActivityIndicator />
  }
  return (
 


    <View style={styles.container}>
      <View style={styles.top}>
      
      <Icon style={styles.voltar} name="left" size={20} color="#000000" />
      <Text style={styles.titulo}> Reforma e reparos</Text>
      </View>

      <View style={styles.content}>
      

        <FlatList 
          data={data}
          renderItem = {({item}) => <Text style={styles.itens}>{item.nome}</Text>}
          keyExtractor={item => item.id.toString()}
          
        
        />

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: '#3B82F6',
    width: '100%',
    height: '100%'
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
    paddingRight:10
  },
  titulo:{
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
