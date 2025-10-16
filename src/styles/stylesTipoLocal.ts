import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        backgroundColor: "#f5f5f5"
    },

    textLocal: {
        fontSize: 20, 
        fontWeight: "bold",
        marginBottom: 20,
    },

    buttonLocal: {
        backgroundColor: "#1e7d67",
        padding: 20,
        borderRadius: 20,
        width: 280,
        alignItems: "center",
    },

    textButton: {
        fontWeight: "bold",
        color: "#fff"
    },
})