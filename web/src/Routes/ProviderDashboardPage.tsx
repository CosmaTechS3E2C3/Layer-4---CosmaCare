import React, { useEffect, useState } from "react";
import ProviderProfileCard from "../components/ProviderProfileCard";
import BookingCard from "../components/BookingCard";
import PayoutSummary from "../components/PayoutSummary";
import { useSupabase } from "../hooks/useSupabase";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export default function ProviderDashboardPage() {
  const supabase = useSupabase();
  const sdk = useCosmaSDK();

  const [profile, setProfile] = useState<any | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const p = await supabase.from("profiles").select("*").eq("role", "provider").limit(1).single();
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
    <div className="page-container">
      <div className="page-title">Provider Dashboard</div>

      {profile && <ProviderProfileCard provider={profile} />}

      <div className="card-title">Your Bookings</div>
      {bookings.map((b) => (
        <BookingCard key={b.id} booking={b} />
      ))}

      <div className="card-title">Your Payouts</div>
      {payouts.map((p) => (
        <PayoutSummary key={p.id} payout={p} />
      ))}
    </div>
  );
}

