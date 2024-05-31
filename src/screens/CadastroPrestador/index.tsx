import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";

import { styles } from "./styles";
import { TextInputMask } from 'react-native-masked-text';


export default function CadastroPrestador() {
  const [cpf, setCpf] = useState('');

  return (
    <View style={styles.container}>
        <View style={styles.cadastroCliente}>
            <Text style={styles.textoPrincipal}>Preencha as informações para criar uma conta</Text>
            
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
                type={'custom'}
                options={{
                  mask: '999.999.999-99'
                }}
                keyboardType="numeric"
                returnKeyType="done" 
                value={cpf}
                onChangeText={text => setCpf(text)}
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
              <Text style={styles.textInput}>Habilidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Pintor"
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
              <TouchableOpacity
                style={styles.botaoCadastrar}>

                <Text style={styles.textoBotao}>Cadastrar-me como prestador</Text>
              </TouchableOpacity>
            </View>

        </View>
    </View>
    
  );
}