import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 200,
    height: 200,
    position: "relative",
    marginBottom: 30,
    overflow: "hidden",
  },
  logo: {
    width: 200,
    height: 200,
  },
  liquidMask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});