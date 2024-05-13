import {
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
} from "react-native";

import { styles } from "./styles";
import { PrestadorItem } from "../../components/PrestadorItem";
import { usePrestadoresMaisProximos } from "../../hooks/usePrestadoresMaisProximos";
import { RootStackParamList } from "../../navigations/SearchStackNavigation";
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

  return (
    <FlatList
      data={prestadores?.pages.flatMap((page) => page)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PrestadorItem item={item} />}
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
