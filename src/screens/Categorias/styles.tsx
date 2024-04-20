import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  lista: {
    flex: 1,
    fontSize: 20,


  },
  container_wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
 
  input_wrapper: {
    alignItems: "flex-start",
    width:"90%",
    height: 45,
    paddingHorizontal: 10,
    flexDirection:"row",
    paddingVertical: 11,
    display: "flex",
    gap: 6,
    backgroundColor: "white",
    borderColor:"#CBD5E1",
    borderStyle: "solid",
    borderWidth: 1,
    elevation: 1,
    borderRadius: 8,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { height: 1, width: 1},
    shadowOpacity: 0.75
  },
  input: {
    width: "90%",
    backgroundColor: "transparent",
    textAlign:"left",
  }
});
