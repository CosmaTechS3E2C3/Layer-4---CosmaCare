import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { CosmaMobileSDK } from "../sdk/cosma";

export const BookingDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    CosmaMobileSDK.bookings.get(id).then(setBooking);
  }, [id]);

  if (!booking) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Booking #{booking.id}</Text>
      <Text>Status: {booking.status}</Text>
      <Text>Client: {booking.client_address}</Text>
      <Text>Provider: {booking.provider_address}</Text>
    </View>
  );
};

