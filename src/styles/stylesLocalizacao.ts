import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  textLocal: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  textRua: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  textBairro: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },

  buttonConfirm: {
    backgroundColor: "#008b8b",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },

  buttonText: {
    color: "#fff", fontWeight: "bold", fontSize: 16
  }
});
