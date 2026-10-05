import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { CosmaMobileSDK } from "../sdk/cosma";

export const GovernanceScreen = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    CosmaMobileSDK.governance.proposals().then(setProposals);
  }, []);

  return (
    <View>
      <Text>Governance Proposals</Text>
      <FlatList
        data={proposals}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Text>{item.title} — {item.status}</Text>
        )}
      />
    </View>
  );
};

