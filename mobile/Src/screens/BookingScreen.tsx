import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAPI } from "../hooks/useAPI";

export const BookingScreen: React.FC = () => {
  const api = useAPI();
  const [provider, setProvider] = useState("");
  const [serviceId, setServiceId] = useState<string>("1");

  const handleCreateBooking = async () => {
    await api.createBooking({
      provider,
      serviceId: Number(serviceId),
      scheduledAt: Date.now(),
    });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Book a CosmaCare Service</Text>
      <TextInput
        placeholder="Provider address"
        value={provider}
        onChangeText={setProvider}
        style={{ borderWidth: 1, marginVertical: 8 }}
      />
      <TextInput
        placeholder="Service ID"
        value={serviceId}
        onChangeText={setServiceId}
        style={{ borderWidth: 1, marginVertical: 8 }}
      />
      <Button title="Create Booking" onPress={handleCreateBooking} />
    </View>
  );
};

