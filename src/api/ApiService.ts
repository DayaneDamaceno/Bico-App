import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.5:5283",
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
