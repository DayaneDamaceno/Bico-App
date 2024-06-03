import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { styles } from "./styles";
import { TextInputMask } from 'react-native-masked-text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/StackNavigations';
import { useQuery } from 'react-query';
import { Usuario, obterUsuario, postAlteraPerfilCliente } from '../../api/ApiService';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; // Importando o ícone FontAwesome
import * as Location from 'expo-location';

type AlteraPerfilScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AlteraPerfil"
>;

type PhotoType = {
  uri: string;
};

export function AlteraPerfilScreen(
  props: AlteraPerfilScreenProps
) {
  const { id } = props.route.params;
  const { isLoading, data, error } = useQuery(["usuario", id], () =>
    obterUsuario(id)
  );
  const [photo, setPhoto] = useState<PhotoType | null>(null);
  const [nome, setNome] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos da permissão de localização para fazer isso funcionar!');
        }
      }
    })();
  }, []); 

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão de localização para fazer isso funcionar!');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude);
      setLatitude(location.coords.latitude);
      console.log(latitude);

      setLongitude(location.coords.longitude);
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (data) {
      setNome(data.nome.toString());
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

  const onPressLoc = () => {
      setLocalizacao(`${latitude}|${longitude}`);
   
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <View>
      <View style={styles.imagemContainer}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.imagemPerfil}
        />
        <View style={styles.overlay}>
          <FontAwesome name="pencil" size={48} color="white" />
        </View>
      </View>
    </View>
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
      <View style={styles.margemH}>
        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={onPressLoc}
        >
          <Text style={styles.textoBotao}>Alterar Endereço para localização Atual?</Text>
        </TouchableOpacity>
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
  );
}
