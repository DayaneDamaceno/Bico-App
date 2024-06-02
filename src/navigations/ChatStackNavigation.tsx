import { createStackNavigator } from "@react-navigation/stack";
import { ConversasScreen } from "../screens/Conversas";
import { ChatScreen } from "../screens/Chat";
import ChatHeader from "../components/ChatHeader";
import { AcordoScreen } from "../screens/Acordo";

export type RootStackParamList = {
  Conversas: undefined;
  Chat: {
    friendId: number;
    name: string;
    avatarUrl: string;
    isOnline: boolean;
  };
  Acordo: {
    friendId: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export function ChatStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conversas"
        component={ConversasScreen}
        options={() => ({ headerTitle: "Conversas Recentes" })}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          header: () => (
            <ChatHeader
              name={route.params.name}
              avatarUrl={route.params.avatarUrl}
              isOnline={route.params.isOnline}
            />
          ),
        })}
      />

      <Stack.Screen name="Acordo" component={AcordoScreen} />
    </Stack.Navigator>
  );
}
