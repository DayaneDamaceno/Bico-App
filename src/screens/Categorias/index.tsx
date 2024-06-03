import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigations/SearchStackNavigation";
import { useQuery } from "react-query";
import CategoriaItem from "../../components/CategoriaItem";
import { obterCategorias } from "../../api/ApiService";
import { Ionicons } from "@expo/vector-icons";
import { useKeyboardOffset } from "../../hooks/useKeyboardOffset";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

type CategoriasScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Categorias"
>;
export function CategoriasScreen(props: Readonly<CategoriasScreenProps>) {
  const [textoBusca, setTextoBusca] = useState("");
  const [contador, setContador] = useState<ValorGuardado[]>();
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

  function pressSearchButton(): void {
    handleEnterPress();
    saveData(textoBusca);
  }

  const saveData = async (textoBusca: string) => {
    let allKeys = await AsyncStorage.getAllKeys();
    let allKeysSort = allKeys
      .slice()
      .map(Number)
      .sort((a, b) => a - b);
    let quntRegistro: number = allKeys.length;
    let ultimaChave: number = quntRegistro;

    if (allKeys != null) {
      if (quntRegistro >= 5) {
        ultimaChave = allKeysSort[4];
        await AsyncStorage.removeItem(allKeysSort[0].toString());
      }
      await AsyncStorage.setItem((ultimaChave + 1).toString(), textoBusca);

      listData();
    }
  };

  interface ValorGuardado {
    chave: number;
    valor: string;
  }

  const listData = async () => {
    let allKeys = await AsyncStorage.getAllKeys();
    let chaveReverse = allKeys.slice().reverse();
    let list: ValorGuardado[] = [];

    if (allKeys != null) {
      for (let chave of chaveReverse) {
        if (chave === null || chave == "userToken") continue;

        let valor = await AsyncStorage.getItem(chave);

        if (valor !== null) {
          let item: ValorGuardado = {
            chave: parseInt(chave),
            valor: valor,
          };

          list.push(item);
        }
      }
      setContador(list);
    }
  };

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
      <View style={styles.historicoPesquisa}>
        <Text style={styles.historicoPesquisaTexto}>
          Você procurou recentemente
        </Text>

        <FlatList
          data={contador}
          style={styles.listaHistorico}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemHistoricoArea}
              onPress={handleEnterPress}
            >
              <Entypo
                name="back-in-time"
                size={18}
                color="black"
                style={styles.itemHistoricoIcon}
              />
              <Text style={styles.itemHistorico}>{item.valor}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ ...styles.inputContainer, bottom: keyboardOffset }}>
        <Ionicons name="search" color={"grey"} size={18} />
        <TextInput
          style={styles.textInput}
          value={textoBusca}
          onChangeText={setTextoBusca}
          placeholder="O que você precisa?"
          onSubmitEditing={pressSearchButton}
          returnKeyType="done"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
