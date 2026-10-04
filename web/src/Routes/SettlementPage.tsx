import React, { useEffect, useState } from "react";
import PayoutSummary from "../components/PayoutSummary";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export default function SettlementPage() {
  const sdk = useCosmaSDK();
  const [settlements, setSettlements] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await sdk.listSettlements();
      if (res.success) setSettlements(res.data);
    })();
  }, []);

  return (
    <div className="page-container">
      <div className="page-title">Settlements</div>

      {settlements.map((s) => (
        <PayoutSummary key={s.id} payout={s} />
      ))}
    </div>
  );
}

