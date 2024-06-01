import {
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  PressableAndroidRippleConfig,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigations/StackNavigations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Prestador, obterPrestador } from "../../api/ApiService";
import { useQuery } from "react-query";
import React from "react";
import { NavigationState, SceneRendererProps, TabBar, TabBarIndicatorProps, TabBarItemProps, TabView } from "react-native-tab-view";
import { Scene, Event } from "react-native-tab-view/lib/typescript/src/types";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

interface Route {
  key: string;
  title: string;
}

interface RenderSceneProps extends SceneRendererProps {
  route: Route;
  prestadores: Prestador[];
}
const renderTabBar = (props: React.JSX.IntrinsicAttributes & SceneRendererProps & {
  navigationState: NavigationState<Route>; scrollEnabled?: boolean | undefined; bounces?: boolean | undefined; activeColor?: string | undefined; inactiveColor?: string | undefined; pressColor?: string | undefined; pressOpacity?: number | undefined; getLabelText?: ((scene: Scene<Route>) => string | undefined) | undefined; getAccessible?: ((scene: Scene<Route>) => boolean | undefined) | undefined; getAccessibilityLabel?: ((scene: Scene<Route>) => string | undefined) | undefined; getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined; renderLabel?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderIcon?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderBadge?: ((scene: Scene<Route>) => React.ReactNode) | undefined; renderIndicator?: ((props: TabBarIndicatorProps<Route>) => React.ReactNode) | undefined; renderTabBarItem?: ((props: TabBarItemProps<Route> & { key: string; }) => React.ReactElement<any, string | React.JSXElementConstructor<any // Cor do texto das abas
  >>) | undefined; onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; tabStyle?: StyleProp<ViewStyle>; indicatorStyle?: StyleProp<ViewStyle>; indicatorContainerStyle?: StyleProp<ViewStyle>; labelStyle?: StyleProp<TextStyle>; contentContainerStyle?: StyleProp<ViewStyle>; style?: StyleProp<ViewStyle>; gap?: number | undefined; testID?: string | undefined; android_ripple?: PressableAndroidRippleConfig | undefined;
}) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#3B82F6' }}
    style={{ backgroundColor: '#F5F5F5' }}
    labelStyle={{ color: 'black' }}
    activeColor={'grey'}
    inactiveColor={'grey'}
  />
);

interface StarRatingProps {
  rating: Double;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <Ionicons name="star" color={"#DAA520"} size={24} />
      );
    } else if (i < rating) {
      stars.push(
        <Ionicons name="star-half-outline" color={"#DAA520"} size={24} />
      );
    } else {
      stars.push(
        <Ionicons name="star-outline" color={"#DAA520"} size={24} />
      );
    }
  }
  return (
    <View style={styles.starContainer}>
      {stars}
    </View>
  );
};

const FirstRoute = ({ prestadores }: { prestadores?: Prestador[] }) => (
  <View style={styles.tabView}>
    {prestadores?.map((prestador, index) => (
      <Text key={index} style={{ marginTop: 10, fontSize: 16}}>{prestador.sobre}</Text>
    ))}
    <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold' }}>Habilidades</Text>
    <View style={styles.imagensContainer}>
      <FlatList
        data={prestadores}
        renderItem={({ item }) => (
          <FlatList
            data={item.habilidades}
            renderItem={({ item }) => (
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16 }}>{item.nome}</Text>
              </View>
            )}
            horizontal
          />
        )}
      />
    </View>
    <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold' }}>Avaliações</Text>
    <FlatList
      data={prestadores}
      renderItem={({ item }) => (
        <View>
          <View style={styles.headerAvaliacao}>
            <View style={styles.imagemContainer}>
              <Text style={{ fontSize: 35, fontWeight: "bold" }}> {item.mediaEstrelas},0 </Text>
            </View>
            <View style={styles.textoAvaliacao}>
              <StarRating rating={item.mediaEstrelas} />
              <Text style={{ marginTop: 1, fontSize: 15 }}> {item.avaliacoes.length} avaliações</Text>
            </View>
          </View>
          <FlatList
            data={item.avaliacoes}
            renderItem={({ item }) => (
              <View style={styles.header}>
                <View>
                  <Image
                    source={{ uri: item.avatarUrl }}
                    style={styles.imagemAvaliacao}
                  />
                </View>
                <View style={styles.textoContainer}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.clienteNome} <StarRating rating={item.quantidadeEstrelas} /></Text>
                  <Text style={{ fontSize: 16 }}>{item.conteudo}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    />
  </View>
);

const SecondRoute = ({ prestadores }: { prestadores?: Prestador[] }) => (
  <View>

  </View>
);
type AnunciarScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Anunciar"
>;
export function AnunciarScreen(
  props: AnunciarScreenProps
) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'first', title: 'Sobre' },
    { key: 'second', title: 'Histórico' },
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
                <Text style={{ fontSize: 25 }}>{item.nome}</Text>
                <Text style={{ fontSize: 14, color: '#64748B' }}>Alcance de atuação: área de {item.raioDeAlcance / 1000} km</Text>
                <Text style={{ marginTop: 5, fontSize: 17, fontWeight: "bold" }}><Ionicons name="star" color={"#DAA520"} size={18} /> {item.mediaEstrelas},0 ({item.avaliacoes.length})</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.fotosServico}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fotos</Text>
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
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          />
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}