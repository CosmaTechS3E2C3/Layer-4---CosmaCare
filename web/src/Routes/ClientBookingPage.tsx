import React, { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import PayoutSummary from "../components/PayoutSummary";
import { useCosmaSDK } from "../hooks/useCosmaSDK";
import { useParams } from "react-router-dom";

export default function ClientBookingPage() {
  const { id } = useParams();
  const sdk = useCosmaSDK();

  const [booking, setBooking] = useState<any | null>(null);
  const [settlement, setSettlement] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const b = await sdk.getBooking(Number(id));
      if (b.success) setBooking(b.data);

      const s = await sdk.getSettlement(Number(id));
      if (s.success) setSettlement(s.data);
    })();
  }, [id]);

  return (
    <div className="page-container">
      <div className="page-title">Booking #{id}</div>

      {booking && <BookingCard booking={booking} />}

      {settlement && (
        <>
          <div className="card-title">Settlement</div>
          <PayoutSummary payout={settlement} />
        </>
      )}
    </div>
  );
}
