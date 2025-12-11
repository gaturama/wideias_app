import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },

  qrContainer: {
    backgroundColor: "#EAEAEA",
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
  },

  amount: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  copyButton: {
    backgroundColor: "#2EC970",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  copyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  orText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
  
  infoText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    paddingHorizontal: 15,
  },
});
