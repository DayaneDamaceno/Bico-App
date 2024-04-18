import {
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
} from "react-native";

import { styles } from "./styles";
import { PrestadorItem } from "../../components/PrestadorItem";
import { usePrestadoresMaisProximos } from "../../hooks/usePrestadoresMaisProximos";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/StackNavigations";

type PrestadoresMaisProximosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Prestadores"
>;

type PrestadoresMaisProximosScreenProps = {
  navigation: PrestadoresMaisProximosScreenNavigationProp;
};

export function PrestadoresMaisProximosScreen(
  props: PrestadoresMaisProximosScreenProps
) {
  const {
    prestadores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
    remove,
    isError,
    error,
  } = usePrestadoresMaisProximos();

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
