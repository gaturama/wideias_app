import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
    overflow: "hidden",
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#eee",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  plusButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff6a00",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  plusText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    padding: 8,
  },

  name: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },

  description: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  
  price: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6a00",
  },
});
