import React, { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export default function BookingHistoryPage() {
  const sdk = useCosmaSDK();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await sdk.listBookings();
      if (res.success) setBookings(res.data);
    })();
  }, []);

  return (
    <div className="page-container">
      <div className="page-title">Booking History</div>

      {bookings.map((b) => (
        <BookingCard key={b.id} booking={b} />
      ))}
    </div>
  );
}

