import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

type Props = {
  booking: any;
  onView?: (id: number) => void;
};

export const BookingCard: React.FC<Props> = ({ booking, onView }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking #{booking.id}</Text>

      <Text style={styles.text}>Client: {booking.client_address}</Text>
      <Text style={styles.text}>Provider: {booking.provider_address}</Text>
      <Text style={styles.text}>Service: {booking.service_code}</Text>
      <Text style={styles.text}>Status: {booking.status}</Text>

      <Text style={styles.small}>
        Created: {new Date(booking.created_at).toLocaleString()}
      </Text>

      {onView && (
        <Button title="View Details" onPress={() => onView(booking.id)} />
      )}
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

