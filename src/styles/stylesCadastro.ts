import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#EAEAEA ",
  },

  head: {
    width: "100%",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#00A36C",
    padding: 12,
    borderRadius: 25,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
    gap: 8,
  },

  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },

  iconExit: {
    width: 25,
    height: 25,
    tintColor: "#000",
    margin: 20,
  },
});