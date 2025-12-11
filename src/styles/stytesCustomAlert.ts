import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },

  modalText: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: "center",
    color: "#666",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
    alignItems: "center",
  }, 

  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: 100,
  },

  confirmButton: {
    backgroundColor: "#007AFF",
  },

  cancelButton: {
    backgroundColor: "#E5E5EA",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  cancelText: {
    color: "#333",
  },
});