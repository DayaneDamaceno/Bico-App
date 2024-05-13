import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
  },
  container: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  roundImage: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
  },
  previa: {
    color: "#334155",
  },
  title: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    fontWeight: "600",
    fontSize: 16,
    color: "#3B82F6",
  },
  amountNotification: {
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  amountNotificationText: {
    fontSize: 16,
    textAlign: "center",
    color: "#DBEAFE",
    fontWeight: "600",
  },
  detail: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
});
