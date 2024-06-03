import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  lista: {
    flex: 1,
    fontSize: 20,
  },
  inputContainer: {
    gap: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "white",
    textAlign: "left",
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 6,
    position: "absolute",
    left: 0,
    right: 0,
    shadowColor: "rgba(0,0,0,0.17)",
    shadowOffset: { width: 0, height: 14 }, // Deslocamento da sombra
    shadowOpacity: 1, // Opacidade da sombra
    shadowRadius: 154, // Raio do desfoque da sombra
    elevation: 20, // Para Android
  },
  textInput: {
    fontSize: 16,
    width: "100%",
  },
  listaCategorias: {
    gap: 10,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  historicoPesquisa: {
    paddingHorizontal: 15,
    marginTop: 12,
    marginBottom: 12,
    width: "100%",
  },
  historicoPesquisaTexto: {
    fontSize: 16,
    height: 50,
    paddingTop: 15,
  },
  listaHistorico: {
    width: "100%",
  },
  itemHistoricoArea: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
    height: 40,
    paddingTop: 9,
    alignItems: "center",
  },
  itemHistoricoIcon: {
    flexDirection: "row",
    color: "#475569",
    paddingTop: 2,
  },
  itemHistorico: {
    flexDirection: "row",
    fontSize: 14,
    color: "#475569",
  },
});
