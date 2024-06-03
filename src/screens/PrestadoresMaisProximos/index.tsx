import {
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./styles";
import { PrestadorItem } from "../../components/PrestadorItem";
import { usePrestadoresMaisProximos } from "../../hooks/usePrestadoresMaisProximos";
import { RootStackParamList } from "../../navigations/StackNavigations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type PrestadoresMaisProximosScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Prestadores"
>;

export function PrestadoresMaisProximosScreen(
  props: PrestadoresMaisProximosScreenProps
) {
  const { habilidadeId } = props.route.params;
  const {
    prestadores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    refetch,
    remove,
    error,
  } = usePrestadoresMaisProximos(habilidadeId);

  if (isLoading) {
    return <ActivityIndicator style={{ alignSelf: "center" }} />;
  }

  if (isError) {
    console.log(error);
    return <Text>Error: {(error as Error).message}</Text>;
  }

  function handleCategoriaPress(prestadorId: number): void {
    console.log("chegou no onpress");
    props.navigation.navigate("Perfil", { prestadorId });
  }


  return (
    <FlatList
      data={prestadores?.pages.flatMap((page) => page)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Perfil", { prestadorId: item.id })
          }
        >
          <View>
            <PrestadorItem item={item}/>
          </View>
        </TouchableOpacity>
      )}
      style={styles.lista}
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.3}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <ActivityIndicator style={{ paddingVertical: 10 }} />
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            remove(); // Remove a consulta atual do cache
            refetch({ refetchPage: (page, index) => index === 0 }); // Refetch apenas a primeira página
          }}
        />
      }
    />
  );
}
