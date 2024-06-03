import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },
  header: {
    paddingLeft: 8,
    alignItems: "flex-start",
    flexDirection: "row", // imagens serão posicionadas lado a lado horizontalmente
  },
  avaliacaoConteudo: {
    paddingLeft: 0,
    alignItems: "flex-start",
    flexDirection: "row", // imagens serão posicionadas lado a lado horizontalmente
    paddingBottom: 10,
  },
  headerAvaliacao: {
    alignItems: "center",
    flexDirection: "row", // imagens serão posicionadas lado a lado horizontalmente
    justifyContent: "center", // Alinha os itens horizontalmente ao centro
    paddingBottom: 10,
  },
  imagemPerfil: {
    width: 80,
    height: 80,
    borderRadius: 100, // metade da largura/altura para fazer um círculo
    overflow: "hidden", // para garantir que a imagem seja cortada para caber no círculo
    resizeMode: "cover", // ou outro modo de redimensionamento que desejar
  },
  imagemAvaliacao: {
    marginTop: 5,
    marginLeft: 0,
    width: 35,
    height: 35,
    borderRadius: 100, // metade da largura/altura para fazer um círculo
    overflow: "hidden", // para garantir que a imagem seja cortada para caber no círculo
    resizeMode: "cover", // ou outro modo de redimensionamento que desejar
  },
  tabView: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
  },
  imagensContainer: {
    flexDirection: "row", // imagens serão posicionadas lado a lado horizontalmente
    marginTop: 5,
  },
  imagem: {
    borderRadius: 10, // metade da largura/altura para fazer um círculo
    width: 150,
    height: 150,
    resizeMode: "cover", // ou outro modo de redimensionamento que desejar
    marginRight: 10, // espaçamento entre as imagens
  },
  textoContainer: {
    marginLeft: 10,
    flexDirection: "column", // Textos ficarão em uma coluna
  },
  textoAvaliacao: {
    paddingTop: 7,
    marginLeft: 10,
    flexDirection: "column", // Textos ficarão em uma coluna
  },
  imagemContainer: {
    flexDirection: "row", // Itens ficarão em uma linha
  },
  fotosServico: {
    fontSize: 18,
    marginTop: 10,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  starContainer: {
    flexDirection: "row", // As estrelas serão dispostas em uma linha horizontal
    alignItems: "center", // Alinha o texto e as estrelas verticalmente
  },
  star: {
    marginHorizontal: 2, // Ajuste o espaço entre as estrelas conforme necessário
  },
  halfStarContainer: {
    position: "relative",
    width: 30, // Deve ser igual ao tamanho das estrelas
    height: 30, // Deve ser igual ao tamanho das estrelas
  },
  fullStar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 15, // Metade da largura
    overflow: "hidden",
  },
  halfStar: {
    position: "absolute",
    top: 0,
    left: 15, // Metade da largura
    width: 15, // Metade da largura
  },
  label: {
    marginRight: 10, // Espaço entre o texto e as estrelas
    fontSize: 18, // Tamanho da fonte do texto
  },
  inputContainer: {
    marginRight: 10, // espaçamento entre as imagens
    gap: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    textAlign: "left",
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 50,
    left: 0,
    right: 0,
    shadowColor: "rgba(0,0,0,0.17)",
    shadowOffset: { width: 0, height: 14 }, // Deslocamento da sombra
    shadowOpacity: 1, // Opacidade da sombra
    shadowRadius: 154, // Raio do desfoque da sombra
    elevation: 20, // Para Android
  },
});
