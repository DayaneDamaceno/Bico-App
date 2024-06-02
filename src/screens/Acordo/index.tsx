import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
import { RootStackParamList } from "../../navigations/ChatStackNavigation";
import { useAuth } from "../../contexts/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  formatCurrency,
  parseCurrency,
} from "../../api/helpers/CurrencyHelper";
import { Acordo, criarAcordo } from "../../api/ApiService";

type AcordoScreenProps = NativeStackScreenProps<RootStackParamList, "Acordo">;

export function AcordoScreen(props: Readonly<AcordoScreenProps>) {
  const { friendId } = props.route.params;
  const { user } = useAuth();
  const [numericValue, setNumericValue] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [textValue, setTextValue] = useState<string>(formatCurrency(0));

  const handleChange = (text: string) => {
    const newNumericValue = parseCurrency(text);
    setNumericValue(newNumericValue);
    setTextValue(formatCurrency(newNumericValue / 100));
  };

  const handleEnviarAcordo = async () => {
    await criarAcordo(user!.id, friendId, description, numericValue);
    props.navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={{ fontSize: 16 }}>Descreva o que será feito:</Text>
      <TextInput
        multiline={true}
        placeholder="Digite seu orçamento aqui..."
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      ></TextInput>
      <Text style={{ fontSize: 16 }}>Qual o valor a ser pago?</Text>
      <TextInput
        style={[styles.input, { fontSize: 24 }]}
        keyboardType="numeric"
        returnKeyType="done"
        value={textValue}
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={handleChange}
        placeholder="R$ 0,00"
      ></TextInput>

      <TouchableOpacity style={styles.send} onPress={handleEnviarAcordo}>
        <Text style={styles.sendText}>Enviar acordo</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
