import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#EAEAEA",
  },

  image: {
    width: 40,
    height: 40,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
    color: "#ff6a00",
  },

  headerButton: { padding: 8 },
  headerButtonText: { color: "#333" },

  productsGrid: {
    marginTop: 20,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },

  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    elevation: 2,
  },

  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },

  productName: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  productPrice: {
    marginTop: 4,
    color: "#ff6a00",
    fontWeight: "bold",
  },

  addButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ff6a00",
    borderRadius: 20,
  },

  addButtonText: { color: "#fff", fontWeight: "bold" },
});
