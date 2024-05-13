import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigations/SearchStackNavigation";
import { useQuery } from "react-query";
import CategoriaItem from "../../components/CategoriaItem";
import { obterCategorias } from "../../api/ApiService";
import { Ionicons } from "@expo/vector-icons";
import { useKeyboardOffset } from "../../hooks/useKeyboardOffset";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type CategoriasScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Categorias"
>;
export function CategoriasScreen(props: Readonly<CategoriasScreenProps>) {
  const [textoBusca, setTextoBusca] = useState("");
  const { keyboardOffset } = useKeyboardOffset();
  const { isLoading, data: categorias } = useQuery(
    "categorias",
    obterCategorias
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  function handleEnterPress(): void {
    props.navigation.navigate("Habilidades", { textoBusca });
  }

  function handleCategoriaPress(categoriaId: number): void {
    props.navigation.navigate("Habilidades", { categoriaId });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.listaCategorias}>
        {categorias?.map((item) => (
          <CategoriaItem
            key={item.id}
            item={item}
            onPress={() => handleCategoriaPress(item.id)}
          />
        ))}
      </View>
      <View style={{ ...styles.inputContainer, bottom: keyboardOffset }}>
        <Ionicons name="search" color={"grey"} size={18} />
        <TextInput
          style={styles.textInput}
          value={textoBusca}
          onChangeText={setTextoBusca}
          placeholder="O que você precisa?"
          onSubmitEditing={handleEnterPress} // Captura o evento de Enter
          returnKeyType="done" // Configura o tipo de tecla de retorno no iOS
        />
      </View>
    </KeyboardAvoidingView>
  );
}
