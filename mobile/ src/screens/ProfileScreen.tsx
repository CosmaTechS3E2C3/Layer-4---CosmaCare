import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/profileSlice";
import ProfileHeader from "../components/ProfileHeader";

export const ProfileScreen = ({ route }) => {
  const { address } = route.params;
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile(address));
  }, [address]);

  if (!profile) return <Text>Loading...</Text>;

  return (
    <View>
      <ProfileHeader profile={profile} />
      <Text>ESEC Score: {profile.esec_score}</Text>
      <Text>S3E2C3 Tier: {profile.s3e2c3_tier}</Text>
    </View>
  );
};

