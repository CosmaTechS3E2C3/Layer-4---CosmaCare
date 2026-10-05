import React from "react";
import { View, Text } from "react-native";

const ProfileHeader = ({ profile }) => (
  <View style={{ padding: 16 }}>
    <Text>{profile.address}</Text>
    <Text>DID: {profile.did}</Text>
    <Text>Role: {profile.role}</Text>
  </View>
);

export default ProfileHeader;

