import React from "react";

export default function ProviderProfileCard({ provider }: { provider: any }) {
  return (
    <div className="card">
      <div className="card-title">{provider.display_name || "Provider"}</div>

      <div className="card-text">Address: {provider.address}</div>
      <div className="card-text">Specialty: {provider.specialty}</div>
      <div className="card-text">Rating: {provider.rating || "N/A"}</div>

      <div className="card-text small">
        Joined: {new Date(provider.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}

