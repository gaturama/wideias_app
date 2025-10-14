import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2ebe0",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "60%",
    height: 180,
    borderWidth: 1,
    borderColor: "#cccbcbff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "60%",
    height: 50,
    backgroundColor: "#008b8b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});