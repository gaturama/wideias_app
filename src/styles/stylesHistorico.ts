import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  head: {
    backgroundColor: "#0F6EA8",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#999",
    fontSize: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    margin: 10,
    borderRadius: 10,
    padding: 12,
    elevation: 3,
  },

  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  subtitle: {
    color: "#555",
  },
});
