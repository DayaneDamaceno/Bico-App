import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { TabNavigation } from "./TabNavigation";
import { AuthNavigation } from "./AuthNavigation";

export function AppNavigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
