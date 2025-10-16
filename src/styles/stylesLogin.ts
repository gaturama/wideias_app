import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },

  input: {
    width: "100%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#cccbcbff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 20,
  },

  image: {
    padding: 20,
    width: 310,
    height: 76,
    alignSelf: "center",
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#11658f",
    padding: 18,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 5,
    width: "100%",
  },

  buttonText: {
    color: "white",
    fontSize: 20,
  },

  inputPassword: {
    width: "100%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#cccbcbff",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  icon: {
    position: "absolute",
    right: 15,
    top: "35%",
    transform: [{ translateY: -11 }],
    padding: 5,
    marginTop: 10,
  },

  passwordContainer: {
    position: "relative",
    marginBottom: 15,
  },

  textCadastro: {
    fontSize: 16,
    color: "#0551dfff",
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center"
  },
});