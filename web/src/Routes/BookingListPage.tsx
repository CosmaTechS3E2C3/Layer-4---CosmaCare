import React, { useEffect, useState } from "react";
import { useCosmaSDK } from "../hooks/useCosmaSDK";
import { BookingCard } from "../components/BookingCard";

export const BookingListPage = () => {
  const sdk = useCosmaSDK();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    sdk.bookings.list().then(setBookings);
  }, []);

  return (
    <div>
      <h1>Bookings</h1>
      {bookings.map(b => (
        <BookingCard key={b.id} booking={b} />
      ))}
    </div>
  );
};

