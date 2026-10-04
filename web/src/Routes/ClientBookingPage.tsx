import React, { useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { BookingCard } from "../components/BookingCard";

export const ClientBookingPage: React.FC = () => {
  const api = useAPI();
  const [provider, setProvider] = useState("");
  const [serviceId, setServiceId] = useState<number>(1);
  const [scheduledAt, setScheduledAt] = useState<number>(Date.now());

  const handleCreateBooking = async () => {
    await api.createBooking({ provider, serviceId, scheduledAt });
    // TODO: show toast, refresh list
  };

  return (
    <div className="page">
      <h1>Book a CosmaCare Service</h1>
      {/* simple form */}
      <input
        placeholder="Provider address"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      />
      <input
        type="number"
        placeholder="Service ID"
        value={serviceId}
        onChange={(e) => setServiceId(Number(e.target.value))}
      />
      <button onClick={handleCreateBooking}>Create Booking</button>

      {/* Example booking card */}
      <BookingCard
        booking={{
          id: 1,
          provider,
          client: "you",
          serviceName: "Sample Service",
          status: "Pending",
        }}
      />
    </div>
  );
};

