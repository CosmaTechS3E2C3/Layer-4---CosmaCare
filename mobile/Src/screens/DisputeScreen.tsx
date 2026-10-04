import React, { useEffect, useState } from "react";
import { ScrollView, Text, Button } from "react-native";
import { Screen } from "../components/Screen";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export const DisputeScreen: React.FC = () => {
  const sdk = useCosmaSDK();
  const [disputes, setDisputes] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await sdk.listBookings(); // bookings contain dispute references
      if (res.success) {
        const all = res.data.filter((b: any) => b.dispute_id);
        setDisputes(all);
      }
    })();
  }, []);

  async function resolve(id: number) {
    await sdk.resolveDispute(id, "Issue resolved", "Resolved");
  }

  return (
    <Screen>
      <ScrollView>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 16 }}>
          Dispute Center
        </Text>

        {disputes.map((d) => (
          <Text key={d.dispute_id} style={{ color: "#ccc", marginBottom: 12 }}>
            Dispute #{d.dispute_id} — Booking #{d.id}
            <Button title="Resolve" onPress={() => resolve(d.dispute_id)} />
          </Text>
        ))}
      </ScrollView>
    </Screen>
  );
};

