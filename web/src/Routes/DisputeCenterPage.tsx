import React, { useEffect, useState } from "react";
import DisputeForm from "../components/DisputeForm";
import BookingCard from "../components/BookingCard";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export default function DisputeCenterPage() {
  const sdk = useCosmaSDK();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await sdk.listBookings();
      if (res.success) {
        const disputed = res.data.filter((b: any) => b.status === "disputed");
        setBookings(disputed);
      }
    })();
  }, []);

  return (
    <div className="page-container">
      <div className="page-title">Dispute Center</div>

      {bookings.map((b) => (
        <div key={b.id}>
          <BookingCard booking={b} />
          <DisputeForm bookingId={b.id} />
        </div>
      ))}
    </div>
  );
}

