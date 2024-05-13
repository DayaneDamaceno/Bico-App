import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  plusButton: {
    height: 50,
    width: 50,
    backgroundColor: "#007AF8",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    backgroundColor: "#FFF",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  send: {
    height: 50,
    width: 50,
    backgroundColor: "#007AF8",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  hide: {
    display: "none",
  },
  btnAction: { paddingHorizontal: 6 },
  footer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});