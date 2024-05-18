import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigation } from "./src/navigations/TabNavigation";
import { QueryClient, QueryClientProvider } from "react-query";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/AuthContext";
import { AppNavigation } from "./src/navigations/AppNavigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <AppNavigation />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
