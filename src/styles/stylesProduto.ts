import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EAEAEA",
  },

  containerProduto: {
    flexDirection: "row",
  },

  head: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#2E78A6",
  },

  image: {
    width: 40,
    height: 40,
  },

  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#ff6a00",
    marginTop: 30,
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
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },

  productImage: {
    width: 120,
    height: 120,
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

  iconContent: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ff6a00",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#008b8b",
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

  local: {
    textAlign: "left",
    left: 15,
    color: "#444",
    fontSize: 12,
    marginTop: 8,
    opacity: 0.8,
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
