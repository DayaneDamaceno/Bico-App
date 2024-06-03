export const formatCurrency = (value: number): string => {
  const formattedValue = value
    .toFixed(2) // Mantém duas casas decimais
    .replace(".", ",") // Substitui o ponto pela vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona pontos como separadores de milhar
  return `R$ ${formattedValue}`;
};

export const parseCurrency = (formattedValue: string): number => {
  const numericValue = formattedValue.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  return parseInt(numericValue, 10);
};
