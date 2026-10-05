import React from "react";

export default function GovernancePolicyCard({ policy }: { policy: any }) {
  return (
    <div className="card">
      <div className="card-title">{policy.key}</div>
      <div className="card-text">Value: {policy.value}</div>
      <div className="card-text">Active: {policy.active ? "Yes" : "No"}</div>
      <div className="card-text small">
        Updated: {new Date(policy.updated_at).toLocaleString()}
      </div>
    </div>
  );
}
