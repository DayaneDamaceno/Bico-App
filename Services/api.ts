// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.9:5283", // Substitua pela URL da sua API
});

interface Categoria{
  id: number;
  nome: string;
}

export const obterCategorias = async(): Promise<Categoria[]> => {
  const response = await api.get('/Categoria');
  // console.log(response.data)
  return response.data;
}

