import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PayoutSummary = ({ payout }: { payout: any }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Payout Summary</Text>

      <Text style={styles.text}>Booking: {payout.booking_id}</Text>
      <Text style={styles.text}>Provider: {payout.provider_address}</Text>
      <Text style={styles.text}>Amount: {payout.amount}</Text>
      <Text style={styles.text}>Token: {payout.token_symbol}</Text>

      <Text style={styles.small}>
        Settled: {new Date(payout.settled_at).toLocaleString()}
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
    fontSize: 18,
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

