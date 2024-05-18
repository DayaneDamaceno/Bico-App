import { Text, View, Image, FlatList } from "react-native";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigations/ChatStackNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "react-query";
import { obterConversasRecentes } from "../../api/ApiService";
import { formatTime } from "../../api/helpers/DateHelper";

type ConversasScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Conversas"
>;
export function ConversasScreen(props: Readonly<ConversasScreenProps>) {
  const { user, login } = useAuth();

  const { isLoading, data: conversasRecentes } = useQuery(
    `conversas-recentes`,
    async () => await obterConversasRecentes(user?.id ?? 0)
  );

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      {!isLoading && (
        <FlatList
          style={styles.list}
          data={conversasRecentes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                props.navigation.navigate("Chat", {
                  friendId: item.id,
                })
              }
            >
              <Image src={item.avatarUrl} style={styles.roundImage} />
              <View style={styles.content}>
                <View style={styles.title}>
                  <Text style={styles.name}>{item.nome}</Text>
                  <View style={styles.detail}>
                    <Text style={styles.time}>
                      {formatTime(new Date(item.dataUltimaMensagem))}
                    </Text>
                    <View style={styles.amountNotification}>
                      <Text style={styles.amountNotificationText}>1</Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={styles.previa}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.ultimaMensagem}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
