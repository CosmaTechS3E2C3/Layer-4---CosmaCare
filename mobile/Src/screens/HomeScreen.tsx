import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Screen } from "../components/Screen";
import { BookingCard } from "../components/BookingCard";
import { useCosmaSDK } from "../hooks/useCosmaSDK";
import { useRealtime } from "../hooks/useRealtime";

export const HomeScreen: React.FC = () => {
  const sdk = useCosmaSDK();
  const { events } = useRealtime();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await sdk.listBookings();
      if (res.success) setBookings(res.data);
    })();
  }, []);

  return (
    <Screen>
      <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 16 }}>
        CosmaCare Dashboard
      </Text>

      <ScrollView>
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} />
        ))}

        <Text style={{ marginTop: 24, color: "#ccc", fontSize: 16 }}>
          Realtime Events
        </Text>

        {events.map((e, idx) => (
          <Text key={idx} style={{ color: "#888", marginTop: 4 }}>
            {JSON.stringify(e)}
          </Text>
        ))}
      </ScrollView>
    </Screen>
  );
};

