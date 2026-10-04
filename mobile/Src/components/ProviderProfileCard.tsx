import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ProviderProfileCard = ({ provider }: { provider: any }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{provider.display_name || "Provider"}</Text>

      <Text style={styles.text}>Address: {provider.address}</Text>
      <Text style={styles.text}>Specialty: {provider.specialty}</Text>
      <Text style={styles.text}>Rating: {provider.rating || "N/A"}</Text>

      <Text style={styles.small}>
        Joined: {new Date(provider.created_at).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 4
  },
  small: {
    fontSize: 12,
    color: "#777",
    marginTop: 6
  }
});

