import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.4:5283",
});

export const obterHabilidades = async (idCategoria: number) => {
  const response = await api.get(`/v1/habilidades/categoria/${idCategoria}`);
  return response.data;
};
