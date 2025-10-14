import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f2ebe0 ",
  },

  head: {
    width: "100%",
     backgroundColor: "#b38c7d",
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
    backgroundColor: "#008b8b",
    padding: 12,
    borderRadius: 25,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
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

  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "#e6e6e6ff",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  icon: {
    width: 70,
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    tintColor: "#cccbcbff"
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