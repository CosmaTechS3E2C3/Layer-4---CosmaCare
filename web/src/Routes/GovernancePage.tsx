import React, { useEffect, useState } from "react";
import { useCosmaSDK } from "../hooks/useCosmaSDK";

export const GovernancePage = () => {
  const sdk = useCosmaSDK();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    sdk.governance.proposals().then(setProposals);
  }, []);

  return (
    <div>
      <h1>Governance</h1>
      {proposals.map(p => (
        <p key={p.id}>{p.title} — {p.status}</p>
      ))}
    </div>
  );
};

