import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  head: {
    width: "100%",
    backgroundColor: "#0F6EA8",
  },

  pagamentoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },

  buttonContent: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
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

  totalText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#000",
  },

  totalValor: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "800",
  },
});
