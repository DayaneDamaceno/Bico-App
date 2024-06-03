import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 40,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  login: {
    width: "100%",
    height: 275,
    marginTop: 160,
    alignItems: "center",
    gap: 5,
  },
  textoPrincipal: {
    fontSize: 20,
    color: "#444444",
    marginBottom: 15,
  },
  textInput: {
    width: "100%",
    height: 50,
    fontSize: 17,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#000",
  },
  loginGoogle: {
    width: "100%",
    height: 50,
    backgroundColor: "#1d8bf2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textoBotao: {
    fontSize: 17,
    color: "#ffffff",
  },
  segundaOpcao: {
    //backgroundColor: "orange",
    flexDirection: "row",
    gap: 7,
  },
  textoSecundario: {
    fontSize: 17,
    color: "#444444",
  },
  textoLink: {
    fontSize: 17,
    color: "#025F8F",
    textDecorationLine: "underline",
  },
  logo: {
    flexDirection: "row",
    width: 300,
    height: 150,
    justifyContent: "center",
    gap: 7,
  },
  image: {
    width: 25,
    height: 25,
  },
  appNome: {
    fontSize: 16,
  },
});
