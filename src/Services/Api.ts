import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.0.103:5283'
});

export const obterHabilidades = async (idCategoria: number) => {
    const response = await api.get(`/Habilidade?idCategoria=${idCategoria}`);
    return response.data;
}
