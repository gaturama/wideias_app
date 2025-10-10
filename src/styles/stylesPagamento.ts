import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2ebe0",
  },

  head: {
    width: "100%",
     backgroundColor: "#d9bea7",
  },


  pagamentoText: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },

  buttonContent: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    width: "80%",
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },
  
  textContent: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },

  iconContent: {
    width: 50,
    height: 50,
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
    marginBottom: 10,
  },
});
