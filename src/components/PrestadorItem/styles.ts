import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    flex: 1,
    flexDirection: "row",
  },
  nome: {
    fontWeight: "600",
    fontSize: 18,
  },
  info: {
    gap: 4,
  },
  avaliacao: {
    alignItems: "center",
    gap: 4,
    flexDirection: "row",
  },
  roundImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
});
