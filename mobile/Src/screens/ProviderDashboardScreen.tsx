import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Screen } from "../components/Screen";
import { ProviderProfileCard } from "../components/ProviderProfileCard";
import { BookingCard } from "../components/BookingCard";
import { PayoutSummary } from "../components/PayoutSummary";
import { useSupabase } from "../hooks/useSupabase";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export const ProviderDashboardScreen: React.FC = () => {
  const supabase = useSupabase();
  const sdk = useCosmaSDK();

  const [profile, setProfile] = useState<any | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const p = await supabase.from("providers").select("*").limit(1).single();
      setProfile(p.data);

      const b = await sdk.listBookings();
      if (b.success) {
        const mine = b.data.filter((x: any) => x.provider_address === p.data.address);
        setBookings(mine);
      }

      const s = await sdk.listSettlements();
      if (s.success) {
        const mine = s.data.filter((x: any) => x.provider_address === p.data.address);
        setPayouts(mine);
      }
    })();
  }, []);

  return (
    <Screen>
      <ScrollView>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 16 }}>
          Provider Dashboard
        </Text>

        {profile && <ProviderProfileCard provider={profile} />}

        <Text style={{ color: "#fff", fontSize: 18, marginTop: 16 }}>
          Your Bookings
        </Text>
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} />
        ))}

        <Text style={{ color: "#fff", fontSize: 18, marginTop: 16 }}>
          Your Payouts
        </Text>
        {payouts.map((p) => (
          <PayoutSummary key={p.id} payout={p} />
        ))}
      </ScrollView>
    </Screen>
  );
};

