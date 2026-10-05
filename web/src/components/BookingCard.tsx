import React from "react";

export const BookingCard = ({ booking }) => (
  <div style={{ padding: 12, borderBottom: "1px solid #ccc" }}>
    <h3>Booking #{booking.id}</h3>
    <p>Status: {booking.status}</p>
    <p>Client: {booking.client_address}</p>
    <p>Provider: {booking.provider_address}</p>
  </div>
);

