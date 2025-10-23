import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },

  containerProduto: {
    flexDirection: "row",
  },

  head: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#0F6EA8",
  },

  image: {
    width: 40,
    height: 40,
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
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },

  productImage: {
    width: 40,
    height: 75,
    resizeMode: "cover",
    borderRadius: 8,
  },

  productName: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  productPrice: {
    marginTop: 4,
    color: "#e67d05ff",
    fontWeight: "bold",
  },

  addButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fe8b05",
    borderRadius: 10,
    flexDirection: "row",
  },

  iconLoggout: {
    width: 35,
    height: 35,
    tintColor: "#000",
    margin: 20,
  },

  iconMenu: {
    width: 35,
    height: 35,
    tintColor: "#000",
    marginStart: 280,
  },

  cartFooter: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#0B537E",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },

  cartText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cartAction: { color: "#fff", fontWeight: "600" },

  addButtonText: { color: "#fff", fontWeight: "bold" },

  iconCarrinho: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginTop: 1,
    tintColor: "#fff",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#d9bea7",
    paddingHorizontal: 16,
  },

  textFooter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
});