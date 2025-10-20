import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  text: { color: "white", fontSize: 16, marginBottom: 12 },

  button: {
    backgroundColor: "#11658f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: { color: "white", fontWeight: "bold" },
});
