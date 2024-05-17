import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigations/AuthNavigation";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "./styles";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen(props: Readonly<LoginScreenProps>) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.textoPrincipal}>Entre para continuar</Text>

        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          placeholder="Insira seu e-mail"
          value={email}
          onChangeText={setEmail}
          returnKeyType="done"
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Insira sua senha"
          value={senha}
          onChangeText={setSenha}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.loginGoogle}
          onPress={() => login(email, senha)}
        >
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.segundaOpcao}>
          <Text style={styles.textoSecundario}>Não tem uma conta?</Text>
          <Text style={styles.textoLink}>Crie uma</Text>
        </View>
      </View>
      <View style={styles.logo}>
        <Image
          source={{ uri: "https://i.imgur.com/bBfGYNp.png" }}
          style={styles.image}
        />
        <Text style={styles.appNome}>Bico • by QuickPro </Text>
      </View>
    </View>
  );
}
