import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
// const apiUrl = "https://bico-api-hml.azurewebsites.net";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Fazer algo com erro de requisição
    return error;
  }
);

export const obterToken = async (
  email: string,
  senha: string
): Promise<{ id: number; token: string }> => {
  const response = await api.post("/v1/autenticacao/login", {
    email,
    senha,
  });
  return response.data;
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

export interface Acordo {
  id: number;
  mensagemId: number;
  descricao: string;
  valor: number;
  resposta: boolean;
  respondidoEm: Date;
}

export const criarAcordo = async (
  remetenteId: number,
  destinatarioId: number,
  descricao: string,
  valor: number
): Promise<void> => {
  const response = await api.post(`/v1/acordos`, {
    remetenteId,
    destinatarioId,
    descricao,
    valor,
  });
  return response.data;
};

export const responderAcordo = async (
  id: number,
  aceito: boolean
): Promise<void> => {
  const response = await api.patch(`/v1/acordos/${id}/${aceito}`);
  return response.data;
};

export interface Mensagem {
  id: number;
  remetenteId: number;
  destinatarioId: number;
  conteudo: string;
  enviadoEm: Date;
  mensagemLida: boolean;
  acordo?: Acordo;
}

export const enviarMensagem = async (mensagem?: Mensagem): Promise<void> => {
  const response = await api.post(`/v1/chat/mensagem`, {
    remetenteId: mensagem?.remetenteId,
    destinatarioId: mensagem?.destinatarioId,
    conteudo: mensagem?.conteudo,
  });
  return response.data;
};

export const obterMensagemDeUmaConversa = async (
  userId: number,
  friendId: number
): Promise<Mensagem[]> => {
  const response = await api.get<Mensagem[]>(
    `/v1/chat/conversa/${userId}/${friendId}`
  );
  const mensagens = response.data.reverse().map((item) => ({ ...item }));
  return mensagens;
};

export interface ConversaRecente {
  id: number;
  nome: string;
  avatarUrl: string;
  ultimaMensagem: string;
  dataUltimaMensagem: Date;
  quantidadeMensagensNaoLidas: number;
}

export const obterConversasRecentes = async (
  userId: number
): Promise<ConversaRecente[]> => {
  const response = await api.get<ConversaRecente[]>(
    `/v1/chat/conversas/recentes/${userId}`
  );
  return response.data;
};

export const marcarMensagensComoLida = async (mensagemIds: number[]) => {
  const response = await api.patch(`/v1/chat/mensagens/ler`, {
    mensagemIds,
  });
  return response.data;
};

export const obterPrestador = async (
  prestadorId?: number
): Promise<Prestador[]> => {
  const response = await api.get(`/v1/prestadores?id=${prestadorId}`);
  console.log(response.data);
  return response.data;
};
