import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },

  head: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#1e7d67",
  },

  productImage: {
    width: 220,
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: "center",
  },

  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },

  productDesc: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },

  titleSection: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },

  option: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionText: {
    fontSize: 16,
    color: "#333",
  },

  toggleText: {
    fontSize: 14,
    color: "#666",
  },

  removedOption: {
    backgroundColor: "#fdecea",
    borderColor: "#fe8b05",
  },

  textRemovedOption: {
    color: "#fe8b05",
  },

  selectedOption: {
    backgroundColor: "#e3f2fd",
  },

  textSelectedOption: {
    color: "#00A36C",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#fff",
    marginTop: 8,
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 60,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6a00"
  },

  button: {
    backgroundColor: "#ff6a00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },

  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
