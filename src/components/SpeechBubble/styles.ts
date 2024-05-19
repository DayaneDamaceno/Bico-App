import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  myBubbleContainer: {
    marginRight: 18,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    gap: 4,
    marginBottom: 8,
  },
  friendBubbleContainer: {
    marginLeft: 18,
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginBottom: 8,
    gap: 4,
  },
  bubble: {
    position: "relative",
    width: "80%",
    borderRadius: 8,
    padding: 10,
  },
  myBubble: {
    backgroundColor: "#007AF8",
  },
  friendBubble: {
    backgroundColor: "#E2E8F0",
  },
  triangle: {
    position: "absolute",
    top: -9,
    width: 0,
    height: 0,
    borderLeftColor: "transparent",
    borderTopWidth: 18,
    borderRightColor: "transparent",
    borderBottomWidth: 18,
    borderBottomColor: "transparent",
  },
  myTriangle: {
    right: -20,
    borderLeftWidth: 18,
    borderRightWidth: 0,
    borderTopColor: "#007AF8",
    transform: [{ rotate: "-90deg" }],
  },
  friendTriangle: {
    borderLeftWidth: 0,
    borderRightWidth: 18,
    left: -20,
    borderTopColor: "#E2E8F0",
    transform: [{ rotate: "90deg" }],
  },
  textMessage: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  myTextMessage: {
    color: "#FFFFFF",
  },
  friendTextMessage: {
    color: "#000",
  },
  hour: {
    color: "#1E293B",
    fontSize: 12,
  },
  myHour: {
    textAlign: "right",
  },
  friendHour: {
    textAlign: "left",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  myFooter: {
    justifyContent: "flex-end",
  },
  friendFooter: {
    justifyContent: "flex-start",
  },
});
