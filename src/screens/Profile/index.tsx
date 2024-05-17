import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "./styles";

export function ProfileScreen() {
  const { user, logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{user?.token}</Text>

      <TouchableOpacity onPress={logout} style={styles.buttonLogout}>
        <Text style={styles.textButtonLogout}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
