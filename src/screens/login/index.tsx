import React from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
  } from "react-native";

import { styles } from "./styles";


export default function Login() {

  return (
    <View style={styles.container}>
        <View style={styles.login}>
            <Text style={styles.textoPrincipal}>Entre para continuar</Text>
            
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              placeholder="Seu e-mail"
              returnKeyType="done" // Configura o tipo de tecla de retorno no iOS
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Sua senha"
              returnKeyType="done" // Configura o tipo de tecla de retorno no iOS
            />
            <TouchableOpacity
              style={styles.loginGoogle}>

              <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.segundaOpcao}>
                <Text style={styles.textoSecundario}>Não tem uma conta?</Text>
                <Text style={styles.textoLink}>Crie uma</Text>
            </View>

        </View>
        <View style={styles.logo}>
            <Image source={{ uri: 'https://i.imgur.com/bBfGYNp.png' }} style={styles.image} />
            <Text style={styles.appNome}>Bico • by QuickPro </Text>
        </View>
    </View>
    
  );
}