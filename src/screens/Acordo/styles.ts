import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 10,
  },

  input: {
    minHeight: 50,
    maxHeight: 250,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  send: {
    height: 50,
    width: "100%",
    backgroundColor: "#007AF8",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
