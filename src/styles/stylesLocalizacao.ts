import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50, 
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  locationContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  currentLocationText: {
    fontSize: 14,
    color: "#777",
    marginTop: -5,
  },

  locationAddress: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 5,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  eventCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  eventInfo: {
    flex: 1,
  },

  eventName: {
    fontSize: 18,
    fontWeight: "500",
  },

  eventTime: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },

  eventLocation: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  attendButton: {
    backgroundColor: "#007AFF", 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },

  attendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  errorText: {
    textAlign: "center",
    marginTop: 50,
    color: "red",
  },
});