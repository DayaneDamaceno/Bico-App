import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.17:5283",
});

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

export interface Mensagem {
  id: number;
  remetenteId: number;
  destinatarioId: number;
  conteudo: string;
  enviadoEm: Date;
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
  const mensagens = response.data
    .reverse()
    .map((item) => ({ ...item, enviadoEm: new Date(item.enviadoEm) }));
  return mensagens;
};

export interface ConversaRecente {
  id: number;
  nome: string;
  avatarUrl: string;
  ultimaMensagem: string;
  dataUltimaMensagem: Date;
}

export const obterConversasRecentes = async (
  userId: number
): Promise<ConversaRecente[]> => {
  const response = await api.get<ConversaRecente[]>(
    `/v1/chat/conversas/recentes/${userId}`
  );
  return response.data;
};
