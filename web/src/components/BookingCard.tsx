import React from "react";

export default function BookingCard({ booking, onView }: { booking: any; onView?: (id: number) => void }) {
  return (
    <div className="card">
      <div className="card-title">Booking #{booking.id}</div>

      <div className="card-text">Client: {booking.client_address}</div>
      <div className="card-text">Provider: {booking.provider_address}</div>
      <div className="card-text">Service: {booking.service_id}</div>
      <div className="card-text">Status: {booking.status}</div>

      <div className="card-text small">
        Created: {new Date(booking.created_at).toLocaleString()}
      </div>

      {onView && (
        <button className="btn" onClick={() => onView(booking.id)}>
          View Details
        </button>
      )}
    </div>
  );
}

