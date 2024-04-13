import { View } from "react-native";
import { Prestadores } from "../../components/Prestadores";
export function SearchScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Prestadores />
    </View>
  );
}
