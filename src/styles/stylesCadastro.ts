import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  head: {
    width: "100%",
     backgroundColor: "#0F6EA8",
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
    marginBottom: 15,
    borderColor: "#cccbcbff",
  },

  button: {
    backgroundColor: "#0F6EA8",
    padding: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
    flexDirection: "row",
    marginTop: 15,
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

  icon: {
    marginBottom: 30,
    alignSelf: "center",
    justifyContent: "center",
  },

  iconExit: {
    width: 25,
    height: 25,
    tintColor: "#000",
    margin: 20,
  },

  inputText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    left: 5,
  }
});