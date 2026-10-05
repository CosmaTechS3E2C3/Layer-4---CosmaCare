import React from "react";
import { View, Text } from "react-native";

const BookingCard = ({ booking }) => (
  <View style={{ padding: 12, borderBottomWidth: 1 }}>
    <Text>Booking #{booking.id}</Text>
    <Text>Status: {booking.status}</Text>
    <Text>Client: {booking.client_address}</Text>
    <Text>Provider: {booking.provider_address}</Text>
  </View>
);

export default BookingCard;

