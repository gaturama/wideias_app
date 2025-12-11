import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    marginTop: 40,
    padding: 10,
    backgroundColor: "#FE8B05",
    borderRadius: 10,
  },

  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  }
});
