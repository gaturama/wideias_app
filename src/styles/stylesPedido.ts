import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  head: {
    backgroundColor: "#1e7d67",
    elevation: 4,
  },

  iconPerfil: {
    width: 35,
    height: 35,
    tintColor: "#fff",
    margin: 2,
    right: 15,
  },

  cardCredito: {
    backgroundColor: "#fe8b05",
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  labelCredito: {
    color: "#fff",
    fontSize: 14,
  },

  valorCredito: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 4
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  icon: {
    width: 45,
    height: 45,
    marginRight: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});