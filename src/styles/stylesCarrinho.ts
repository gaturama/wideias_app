import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    backgroundColor: "#11658f",
    elevation: 2,
  },

  listContent: {
    padding: 16,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  itemImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  itemPrice: {
    fontSize: 14,
    color: "#555",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  qtySymbol: {
    fontSize: 18,
    color: "#fe8b05",
    fontWeight: "bold",
  },

  qtyText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  obsContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  obsLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },

  obsInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  totalText: {
    fontSize: 16,
    color: "#333",
  },

  totalValue: {
    color: "#fe8b05",
    fontWeight: "bold",
  },

  nextButton: {
    backgroundColor: "#fe8b05",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});