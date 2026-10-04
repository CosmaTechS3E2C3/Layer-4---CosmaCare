import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Screen } from "../components/Screen";
import { PayoutSummary } from "../components/PayoutSummary";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export const PayoutsScreen: React.FC = () => {
  const sdk = useCosmaSDK();
  const [settlements, setSettlements] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await sdk.listSettlements();
      if (res.success) setSettlements(res.data);
    })();
  }, []);

  return (
    <Screen>
      <ScrollView>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 16 }}>
          Payouts
        </Text>

        {settlements.map((s) => (
          <PayoutSummary key={s.id} payout={s} />
        ))}
      </ScrollView>
    </Screen>
  );
};

