import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  top: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    //justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#E2E8F0",
    gap: 5,
  },
  voltar: {},
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  itens: {
    fontSize: 18,
    height: 50,
    width: "100%",
    paddingLeft: 40,
    paddingTop: 10,
    borderBottomWidth: 1.5, // Border width
    borderBottomColor: "#E2E8F0",
  },
});
