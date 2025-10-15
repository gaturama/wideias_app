import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    paddingTop: 20,
  },

  head: {
    width: "100%",
    backgroundColor: "#2E78A6",
  },

  pagamentoText: {
    fontSize: 26,
    marginVertical: 5,
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
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  buttonCredito: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
    width: 100,
    height: 100,
    marginBottom: 25,
  },

  textValue: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    fontSize: 18,
    marginBottom: 30,
    textAlign: "auto",
  },
});
