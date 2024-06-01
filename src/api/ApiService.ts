import axios from "axios";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

const api = axios.create({
  baseURL: "http://192.168.0.60:5283",
});

export interface Categoria {
  id: number;
  nome: string;
}

export interface FotoServico {
  id: number;
  foto: string;
  prestadorId: number;
}

export interface Avaliacoes {
  id: number;
  conteudo: string; 
  quantidadeEstrelas: Double;
  clienteNome: string;
  avatarUrl: string;
}


export interface Prestador {
  id: number;
  nome: string;
  avatarUrl: string;
  mediaEstrelas: Double; 
  sobre: string;
  habilidades: Habilidade[];
  raioDeAlcance: number;
  fotosServico: FotoServico[];
  avaliacoes: Avaliacoes[];
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
export const obterCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get("/v1/categorias");
  console.log('API Response:', response.data.nome);

  return response.data;
};

export const obterPrestador = async (prestadorId?: number): Promise<Prestador[]> => {
  const response = await api.get(`/v1/prestadores?numero=${prestadorId}`);
  return response.data;
};
export interface Usuario {
  id: number;
  nome: string;
  avatarUrl: string;
  cpf: string;
  email: string;
  senha: string;
  localizacao: string;
}

export const obterUsuario = async (id: number): Promise<Usuario> => {
  try {
    const response = await api.get(`/v1/usuarios?id=${id}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      throw console;
    }
  } catch (error) {
    throw console;
  }
};

export const postAlteraPerfilCliente = async (usuario: Usuario): Promise<Usuario> => {
  const response = await api.post('/v1/usuarios/altera', usuario);
  return response.data;
};