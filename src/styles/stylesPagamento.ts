import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },

  head: {
    width: "100%",
    backgroundColor: "#11658f",
  },

  pagamentoText: {
    fontSize: 26,
    marginVertical: 20,
    fontWeight: "bold",
    color: "#333",
  },

  buttonContent: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    width: "85%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  textContent: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },

  iconContent: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  iconExit: {
    width: 35,
    height: 35,
    tintColor: "#000",
    margin: 20,
  },

  iconPay: {
    marginTop: 30,
    resizeMode: "contain",
  },
});
