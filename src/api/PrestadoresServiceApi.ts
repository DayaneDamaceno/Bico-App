export interface Prestador {
  id: number;
  nome: string;
  avatarUrl: string;
  latitude: number;
  longitude: number;
}

export const fetchPrestadoresMaisProximos = async (
  pagina: number = 0
): Promise<Prestador[]> => {
  const url = `http://192.168.0.5:5283/v1/clientes/1/prestadores/proximos?habilidade=3&pagina=${pagina}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }
  return response.json();
};
