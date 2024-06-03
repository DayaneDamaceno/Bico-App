import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { styles } from './styles';
import { TextInputMask } from 'react-native-masked-text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/StackNavigations';
import { useQuery } from 'react-query';
import { Usuario, obterUsuario, postAlteraPerfilCliente } from '../../api/ApiService';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

type AlteraPerfilScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AlteraPerfil'
>;
type PhotoType = {
  uri: string;
};

export function AlteraPerfilScreen(props: AlteraPerfilScreenProps) {
  const { id } = props.route.params;
  const { isLoading, data, error } = useQuery(['usuario', id], () => obterUsuario(id));
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
      setLatitude(location.coords.latitude);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto({ uri: result.assets[0].uri });
    }
  };

  const onPressSalvar = async () => {
   

    const usuario: Usuario = {
      id: id,
      nome: nome,
      avatarUrl: avatarUrl, // If imageUrl is empty, keep the current avatarUrl
      cpf: cpf,
      email: email,
      senha: senha,
      localizacao: localizacao,
    };
    postAlteraPerfilCliente(usuario);
  };

  const onPressLoc = () => {
    if (latitude !== null && longitude !== null) {
      setLocalizacao(`${latitude}|${longitude}`);
    } else {
      alert('A localização não está disponível.');
    }
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
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imagemContainer}>
            <Image
              source={{ uri: photo ? photo.uri : avatarUrl }}
              style={styles.imagemPerfil}
            />
            <View style={styles.overlay}>
              <FontAwesome name="pencil" size={48} color="white" />
            </View>
          </View>
        </TouchableOpacity>
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
            mask: '999.999.999-99',
          }}
          keyboardType="numeric"
          returnKeyType="done"
          value={cpf}
          onChangeText={setCpf}
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
        <TouchableOpacity style={styles.botaoCadastrar} onPress={onPressLoc}>
          <Text style={styles.textoBotao}>
            Alterar Endereço para localização Atual?
          </Text>
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
      <TouchableOpacity style={styles.botaoCadastrar} onPress={onPressSalvar}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
