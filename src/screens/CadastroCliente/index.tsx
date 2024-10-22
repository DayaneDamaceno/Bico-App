import React, { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./styles";
import { TextInputMask } from "react-native-masked-text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigations/AuthNavigation";
type CadastroClienteScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "CadastroCliente"
>;

export function CadastroClienteScreen(
  props: Readonly<CadastroClienteScreenProps>
) {
  const [cpf, setCpf] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.cadastroCliente}>
        <Text style={styles.textoPrincipal}>
          Preencha as informações para criar uma conta
        </Text>

        <View style={styles.inputAll}>
          <Text style={styles.textInput}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="João Almeida"
            returnKeyType="done"
          />
        </View>

        <View style={styles.inputAll}>
          <Text style={styles.textInput}>CPF</Text>
          <TextInputMask
            style={styles.input}
            placeholder="000.000.000-00"
            type={"custom"}
            options={{
              mask: "999.999.999-99",
            }}
            keyboardType="numeric"
            returnKeyType="done"
            value={cpf}
            onChangeText={(text) => setCpf(text)}
          />
        </View>

        <View style={styles.inputAll}>
          <Text style={styles.textInput}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="meuemail@gmail.com"
            returnKeyType="done"
          />
        </View>

        <View style={styles.inputAll}>
          <Text style={styles.textInput}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua Atla, 15, São Paulo - SP, 12345-123"
            returnKeyType="done"
          />
        </View>

        <View style={styles.inputAll}>
          <Text style={styles.textInput}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="**********"
            returnKeyType="done"
          />
        </View>

        <View style={styles.margemH}>
          <TouchableOpacity style={styles.botaoCadastrar}>
            <Text style={styles.textoBotao}>Cadastrar-me</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("CadastroPrestador");
        }}
        style={[
          styles.botaoCadastrarPrestador,
          { paddingBottom: Platform.OS === "ios" ? 28 : 0 },
        ]}
      >
        <Text style={styles.textoLink}>
          Deseja prestar serviços? Faça o cadastro aqui
        </Text>
      </TouchableOpacity>
    </View>
  );
}
