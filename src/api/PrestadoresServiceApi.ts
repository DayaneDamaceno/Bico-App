interface Prestador {
  id: number;
  nome: string;
  avatarUrl: string;
  latitude: number;
  longitude: number;
}
export const fetchPrestadoresMaisProximos = async (): Promise<Prestador[]> => {
  const response = await fetch(
    "http://192.168.170.8:5283/v1/clientes/1/prestadores/proximos?habilidade=3"
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }
  return response.json();
};
