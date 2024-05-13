import {
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { PrestadorItem } from "../../components/PrestadorItem";
import { usePrestadoresMaisProximos } from "../../hooks/usePrestadoresMaisProximos";
import { RootStackParamList } from "../../navigations/StackNavigations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Prestador, obterPrestador } from "../../api/ApiService";
import { useQuery } from "react-query";
import React from "react";

type PerfilScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Perfil"
>;

export function PerfilScreen(
  props: PerfilScreenProps
) {
  console.log("chegou no perfil");
  const { prestadorId } = props.route.params;  
  const { isLoading, data } = useQuery("prestador", () =>
    obterPrestador(prestadorId)
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return ( 
 <View style={styles.container}> 
 <View style={styles.header}>      

    <FlatList
       data={data}
       renderItem={({ item }) => (
        <View style={styles.header}>      
        <View style={styles.imagemContainer}>
          <Image
            source={{ uri: item.avatarUrl }}
            style={styles.imagemPerfil}
          />
        </View>
        <View style={styles.textoContainer}>
          <Text style={{ fontSize: 25}}>{item.nome}</Text>
          <Text style={{ fontSize: 14, color: '#64748B' }}>Alcance de atuação: {item.raioDeAlcance}m</Text>
          <Text style={{ marginTop: 5, fontSize: 18}}><Ionicons name="star" color={"gold"} size={18} /> {item.mediaEstrelas} ({item.avaliacoes.length})</Text>
        </View>
      </View>
       )}
     />
      </View>

    <View style={styles.fotosServico}>
    <Text style={{ fontSize: 20 }}>Fotos</Text>
      <View style={styles.imagensContainer}>
      <FlatList
       data={data}
       renderItem={({ item }) => (
        <FlatList
       data={item.fotosServico}
       renderItem={({ item }) => (
        <Image
         source={{ uri: item.foto }}
         style={styles.imagem}
         />
        )} 
        horizontal // Para fazer a lista de imagens ficar na horizontal
        showsHorizontalScrollIndicator={false} // Para esconder a barra de rolagem horizontal     
     />       
        )}
     />
      </View>    
    </View>    
    <View style={styles.habilidades}>
    <Text style={{ marginTop: 10, fontSize: 20 }}>Sobre</Text>
    <FlatList
       data={data}
       renderItem={({ item }) => (
        <Text style={{ fontSize: 15, marginRight: 25, marginTop: 5 }}>{item.sobre}</Text>
        )}
     />
      <Text style={{ marginTop: 10, fontSize: 20}}>Habilidades</Text>
      <View style={styles.imagensContainer}>
      <FlatList
       data={data}
       renderItem={({ item }) => (
        <FlatList
       data={item.habilidades}
       renderItem={({ item }) => (
        <View style={styles.inputContainer}>
            <Text style={{ fontSize: 16}}>{item.nome}</Text>       
        </View>
        )}
        horizontal // Para fazer a lista de imagens ficar na horizontal
     />       
        )}
     />
      </View>    
    </View>
  </View>

);
}
