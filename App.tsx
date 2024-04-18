import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigation } from "./src/navigations/TabNavigation";
import { QueryClient, QueryClientProvider } from "react-query";

import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <TabNavigation />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
