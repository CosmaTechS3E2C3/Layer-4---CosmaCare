import React from "react";

export const ProfileHeader = ({ profile }) => (
  <div style={{ padding: 16 }}>
    <h2>{profile.address}</h2>
    <p>DID: {profile.did}</p>
    <p>Role: {profile.role}</p>
  </div>
);

