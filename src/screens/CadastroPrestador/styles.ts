import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    //backgroundColor: "blue",
    paddingTop: 30,
    alignItems: "center",
  },
  cadastroCliente: {
    width: "100%",
    paddingTop: 0,
    //backgroundColor: "#c27cc1",
    alignItems: "center",
    gap: 3,
  },
  textoPrincipal: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  inputAll: {
    width: "100%",
    height: 75,
    //backgroundColor: "#470a10",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#000",
  },
  margemH: {
    paddingHorizontal: 10,
    width: "100%",
  },
  botaoCadastrar: {
    width: "100%",
    height: 45,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textoBotao: {
    fontSize: 16,
    color: "#ffffff",
  },
});
