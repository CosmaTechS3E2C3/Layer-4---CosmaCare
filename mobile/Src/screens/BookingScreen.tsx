import React, { useEffect, useState } from "react";
import { ScrollView, Text, Button } from "react-native";
import { Screen } from "../components/Screen";
import { BookingCard } from "../components/BookingCard";
import { PayoutSummary } from "../components/PayoutSummary";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export const BookingScreen = ({ route }: any) => {
  const { bookingId } = route.params;
  const sdk = useCosmaSDK();

  const [booking, setBooking] = useState<any | null>(null);
  const [settlement, setSettlement] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const b = await sdk.getBooking(bookingId);
      if (b.success) setBooking(b.data);

      const s = await sdk.getSettlement(bookingId);
      if (s.success) setSettlement(s.data);
    })();
  }, []);

  return (
    <Screen>
      <ScrollView>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 16 }}>
          Booking Details
        </Text>

        {booking && <BookingCard booking={booking} />}

        {settlement && (
          <>
            <Text style={{ color: "#fff", fontSize: 18, marginTop: 16 }}>
              Settlement
            </Text>
            <PayoutSummary payout={settlement} />
          </>
        )}

        <Button
          title="Open Dispute"
          onPress={() => sdk.openDispute(bookingId, "Service issue")}
        />
      </ScrollView>
    </Screen>
  );
};
