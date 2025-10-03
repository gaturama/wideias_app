import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#EAEAEA ",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#333",
  },

  input: {
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#7a7a7aff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 20,
  },

  image: {
    padding: 20,
    width:320,
    height: 80,
    alignSelf: "center",
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#2020cfff",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 5,
    width: "80%",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },

  inputPassword: {
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#7a7a7aff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  icon: {
    position: "absolute",
    right: 50,
    top: "35%",
    transform: [{ translateY: -11 }],
    padding: 5,
  },

  passwordContainer: {
    position: "relative",
    marginBottom: 15,
  },
});