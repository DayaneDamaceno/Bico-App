import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { TextInputMask } from 'react-native-masked-text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/StackNavigations';
import { useQuery } from 'react-query';
import { Usuario, obterUsuario, postAlteraPerfilCliente } from '../../api/ApiService';

type AlteraPerfilScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AlteraPerfil"
>;

export function AlteraPerfilScreen(
  props: AlteraPerfilScreenProps
) {
  const { id } = props.route.params;
  const { isLoading, data, error } = useQuery(["usuario", id], () =>
    obterUsuario(id)
  );

  const [nome, setNome] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  useEffect(() => {
    if (data) {
      setNome(data.nome);
      setAvatarUrl(data.avatarUrl);
      setCpf(data.cpf);
      setEmail(data.email);
      setSenha(data.senha);
      setLocalizacao(data.localizacao);
    }
  }, [data]);

  const onPressSalvar = () => {
    const usuario: Usuario = {
      id: id,
      nome: nome,
      avatarUrl: avatarUrl,
      cpf: cpf,
      email: email,
      senha: senha,
      localizacao: localizacao,
    };
    postAlteraPerfilCliente(usuario);
  };

  if (isLoading) {
    return <Text>Carregando...</Text>;
  } 

  return (
    <View style={styles.container}>
      <View style={styles.cadastroCliente}>
        <Text style={styles.textoPrincipal}>Preencha as informações para alterar sua conta</Text>
        <View style={styles.inputAll}>
          <Text style={styles.textInput}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="João Almeida"
            onChangeText={setNome}
            value={nome}
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
            value={email}
            returnKeyType="done"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputAll}>
          <Text style={styles.textInput}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua Atla, 15, São Paulo - SP, 12345-123"
            value={localizacao}
            returnKeyType="done"
            onChangeText={setLocalizacao}
          />
        </View>
        <View style={styles.inputAll}>
          <Text style={styles.textInput}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="**********"
            value={senha}
            returnKeyType="done"
            onChangeText={setSenha}
          />
        </View>
        <View style={styles.margemH}>
          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={onPressSalvar}
          >
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.botaoCadastrarPrestador}>
      </TouchableOpacity>
    </View>
  );
}
