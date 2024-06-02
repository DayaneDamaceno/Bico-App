import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 20,
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
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopColor: "#CBD5E1",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  action: {
    width: 90,
    height: 80,
    padding: 10,
    gap: 4,
    backgroundColor: "#DBEAFE",
    borderColor: "#007AF8",
    borderWidth: 1,
    borderRadius: 5,
  },
  actionText: {
    color: "#007AF8",
  },
  actions: {
    paddingHorizontal: 16,
    paddingTop: 0,
  },
});
