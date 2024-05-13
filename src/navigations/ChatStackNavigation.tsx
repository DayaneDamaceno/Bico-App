import { createStackNavigator } from "@react-navigation/stack";
import { ConversasScreen } from "../screens/Conversas";
import { ChatScreen } from "../screens/Chat";

export type RootStackParamList = {
  Conversas: undefined;
  Chat: { friendId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export function ChatStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Conversas" component={ConversasScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
