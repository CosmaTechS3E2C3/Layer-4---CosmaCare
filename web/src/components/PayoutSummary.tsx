import React from "react";

export default function PayoutSummary({ payout }: { payout: any }) {
  return (
    <div className="card">
      <div className="card-title">Payout Summary</div>

      <div className="card-text">Booking: {payout.booking_id}</div>
      <div className="card-text">Provider: {payout.provider_address}</div>
      <div className="card-text">Amount: {payout.total_amount}</div>
      <div className="card-text">Token: {payout.token_symbol}</div>

      <div className="card-text small">
        Settled: {new Date(payout.settled_at).toLocaleString()}
      </div>
    </div>
  );
}

