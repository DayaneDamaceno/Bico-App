import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingTop: 25,
    backgroundColor: "white",
  },
  header:{
    alignItems: 'flex-start',
    flexDirection: 'row', // imagens serão posicionadas lado a lado horizontalmente
   },
  imagemPerfil:{
    width: 80,
    height: 80,
    borderRadius: 100, // metade da largura/altura para fazer um círculo
    overflow: 'hidden', // para garantir que a imagem seja cortada para caber no círculo   
    resizeMode: 'cover', // ou outro modo de redimensionamento que desejar
  },
  imagensContainer: {
    flexDirection: 'row', // imagens serão posicionadas lado a lado horizontalmente
    marginTop: 5,
  },
  imagem: {
    borderRadius: 10, // metade da largura/altura para fazer um círculo
    width: 150,
    height: 150,
    resizeMode: 'cover', // ou outro modo de redimensionamento que desejar
    marginRight: 10, // espaçamento entre as imagens
  },
  textoContainer: {
    marginLeft: 10,
    flexDirection: 'column', // Textos ficarão em uma coluna
  },
  imagemContainer: {
    flexDirection: 'row', // Itens ficarão em uma linha
  },
  fotosServico:{
    marginTop: 10,
  },
  habilidades:{
   
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
/* Ellipse 1 */


