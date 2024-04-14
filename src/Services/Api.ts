import axios from "axios";

const api = axios.create({

    baseURL: 'http://10.0.2.2:5283'
})

export const obterHabilidades = async (idCategoria: number) => {
    const response = await api.get('/Habilidade/idCategotia=' + idCategoria);
    return response.data;
}

//export default obterHabilidades;