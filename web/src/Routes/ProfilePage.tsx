import React, { useEffect, useState } from "react";
import { useCosmaSDK } from "../hooks/useCosmaSDK";
import { ProfileHeader } from "../components/ProfileHeader";

export const ProfilePage = ({ address }) => {
  const sdk = useCosmaSDK();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    sdk.profiles.get(address).then(setProfile);
  }, [address]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <ProfileHeader profile={profile} />
      <p>ESEC Score: {profile.esec_score}</p>
      <p>S3E2C3 Tier: {profile.s3e2c3_tier}</p>
    </div>
  );
};

