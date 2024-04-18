import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.4:5283",
});

export interface Prestador {
  id: number;
  nome: string;
  avatarUrl: string;
  mediaEstrelas: number;
}

export const obterPrestadoresMaisProximos = async (
  pagina: number = 0
): Promise<Prestador[]> => {
  const response = await api.get(
    `/v1/clientes/1/prestadores/proximos?habilidade=3&pagina=${pagina}`
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
