import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#EAEAEA ",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
    color: "#ff6a00",
  },

  input: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
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
    color: "#ff6a00",
    fontSize: 18,
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

  exit: {
    width: 40,
    height: 40,
    marginRight: 8,
    tintColor: "#ff6a00"
  },
});
