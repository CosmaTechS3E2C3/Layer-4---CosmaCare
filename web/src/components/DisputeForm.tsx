import React, { useState } from "react";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export default function DisputeForm({ bookingId }: { bookingId: number }) {
  const sdk = useCosmaSDK();
  const [reason, setReason] = useState("");

  async function submit() {
    if (!reason.trim()) return;
    await sdk.openDispute(bookingId, reason);
    setReason("");
  }

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="card-title">Open Dispute</div>

      <textarea
        className="input"
        placeholder="Describe the issue..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        style={{ minHeight: 80 }}
      />

      <button className="btn" onClick={submit}>
        Submit Dispute
      </button>
    </div>
  );
}

