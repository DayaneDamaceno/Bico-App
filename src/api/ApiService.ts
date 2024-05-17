import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: "http://192.168.169.219:5283",
});

export interface Login {
  email: string;
  senha: string;
}

export const fazerLogin = async (emailParametro: string, senhaParametro:string) => {
  var login: Login = {
    email: emailParametro,
    senha: senhaParametro
  }
  const response = await api.post("/v1/autenticacao/login", login);
  if(response.status >= 200 && response.status < 300){
      await AsyncStorage.setItem("token", response.data.token);
      return true;
    }

  return false;
};

export interface Categoria {
  id: number;
  nome: string;
}

export const obterCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get("/v1/categorias");
  return response.data;
};

export interface Prestador {
  id: number;
  nome: string;
  avatarUrl: string;
  mediaEstrelas: number;
}

export const obterPrestadoresMaisProximos = async (
  habilidadeId: number,
  pagina: number = 0
): Promise<Prestador[]> => {
  const response = await api.get(
    `/v1/clientes/4/prestadores/proximos?habilidade=${habilidadeId}&pagina=${pagina}`
  );
  return response.data;
};

export interface Habilidade {
  id: number;
  nome: string;
}

export const obterHabilidades = async (
  idCategoria: number
): Promise<Habilidade[]> => {
  const response = await api.get(`/v1/habilidades/categoria/${idCategoria}`);
  return response.data;
};

export const obterHabilidadesBusca = async (
  texto?: string
): Promise<Habilidade[]> => {
  const response = await api.get(`/v1/habilidades?texto=${texto}`);
  return response.data;
};
