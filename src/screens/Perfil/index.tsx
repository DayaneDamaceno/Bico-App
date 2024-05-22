import {
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
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

import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view";

interface Route {
  key: string;
  title: string;
}

interface RenderSceneProps extends SceneRendererProps {
  route: Route;
  prestadores: Prestador[];
}
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#3B82F6' }}
    style={{ backgroundColor: '#F5F5F5' }}
    labelStyle={{ color: 'black' }} // Cor do texto das abas
    activeColor={'grey'} // Cor do texto da aba ativa
    inactiveColor={'grey'} // Cor do texto das abas inativas
  />
);
const FirstRoute = ({ prestadores }: { prestadores?: Prestador[] }) => (
  <View style={styles.tabView}> 
    {prestadores?.map((prestador, index) => (
      <Text key={index}>{prestador.sobre}</Text>
    ))}
    <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Habilidades</Text>
      <View style={styles.imagensContainer}>
      <FlatList
       data={prestadores}
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
);

const SecondRoute = ({ prestadores }: { prestadores?: Prestador[] }) => (
  <View style={styles.tabView}> 

  <View style={styles.imagensContainer}>
  <FlatList
   data={prestadores}
   renderItem={({ item }) => (
    <FlatList
   data={item.avaliacoes}
   renderItem={({ item }) => (
    <View >
        <Text style={{ fontSize: 16}}>{item.clienteId}</Text>      
        <Text style={{ fontSize: 16}}>{item.conteudo}</Text>    
    </View>
    )}
 />       
    )}
 />
  </View>    
  </View>

);



type PerfilScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Perfil"
>;

export function PerfilScreen(
  props: PerfilScreenProps
) {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'first', title: 'Sobre' },
    { key: 'second', title: 'Avaliações' },
  ]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute prestadores={data} />;
      case 'second':
        return <SecondRoute prestadores={data} />;
      default:
        return null;
    }
  };

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
          <Text style={{ fontSize: 14, color: '#64748B' }}>Alcance de atuação: área de {item.raioDeAlcance}m</Text>
          <Text style={{ marginTop: 5, fontSize: 18}}><Ionicons name="star" color={"gold"} size={16} /> {item.mediaEstrelas} ({item.avaliacoes.length})</Text>
        </View>
      </View>
       )}
     />
      </View>


    <View style={styles.fotosServico}>
    <Text style={{fontSize: 16, fontWeight: 'bold'  }}>Fotos</Text>
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

    <TabView
  navigationState={{ index, routes }}
  renderScene={renderScene}
  renderTabBar={renderTabBar} // Adicionando a função renderTabBar
  onIndexChange={setIndex}
  initialLayout={{ width: layout.width }}
/>    
      
  </View>

);
}