import React, { useState } from "react";
import { View, ActivityIndicator, useWindowDimensions, GestureResponderEvent, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { obterPrestador, Prestador } from "../../api/ApiService";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import TabSobre from "../../components/TabSobre";
import TabAvaliacoes from "../../components/TabAvaliacoes";
import ProfileDetail from "../../components/ProfileDetail";
import Fotos from "../../components/Fotos";
import { RootStackParamList } from "../../navigations/SearchStackNavigation";
interface FloatingButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="chatbubble" size={24} color="white" />
    </TouchableOpacity>
  );
};
type PerfilScreenProps = NativeStackScreenProps<RootStackParamList, "Perfil">;

export const PerfilScreen: React.FC<PerfilScreenProps> = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Sobre" },
    { key: "second", title: "Avaliações" },
  ]);
  const { prestadorId } = props.route.params;
  const { isLoading, data } = useQuery<Prestador[]>("prestador", () =>
    obterPrestador(prestadorId)
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }
  const renderScene = SceneMap({
    first: () => <TabSobre prestadores={data} />,
    second: () => <TabAvaliacoes prestadores={data} />,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#3B82F6" }}
      style={{ backgroundColor: "#F5F5F5" }}
      labelStyle={{ color: "black" }}
      activeColor={"grey"}
      inactiveColor={"grey"}
    />
  );
  return (
    <View style={styles.container}>
      <ProfileDetail data={data} />
      <Fotos data={data} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <FloatingButton onPress={() => console.log('Botão pressionado')} />
    </View>
  );
};
