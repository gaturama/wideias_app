import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  info: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: "500",
  },
  subtext: {
    marginTop: 8,
    fontSize: 15,
    color: "#666",
  },
});
