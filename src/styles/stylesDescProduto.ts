import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EAEAEA",
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
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
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
    borderColor: "#f44336",
  },

  textRemovedOption: {
    color: "#f44336",
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
  },

  button: {
    backgroundColor: "#00A36C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
   
  },

  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
