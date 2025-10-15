import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  containerBody: {
    flex: 1,
    padding: 20,
  
  },

  head: {
    width: "100%",
    backgroundColor: "#2E78A6",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    borderColor: "#cccbcbff",
  },

  button: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "25%",
    flexDirection: "row",
    gap: 8,
  },

  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 18,
  },

  editButton: {
    backgroundColor: "#008b8b",
    borderRadius: 20,
    padding: 18,
    marginTop: 10,
    alignItems: "center",
  },

  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },

  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e6e6e6ff",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  icon: {
    width: 60,
    height: 60,
  },

  iconLoggout: {
    width: 25,
    height: 25,
    tintColor: "#000",
    margin: 20,
  },

  exit: {
    width: 40,
    height: 40,
    marginRight: 8,
    tintColor: "#000",
  },
});
