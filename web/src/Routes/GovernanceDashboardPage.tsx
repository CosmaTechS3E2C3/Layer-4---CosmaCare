import React, { useEffect, useState } from "react";
import GovernanceProposalCard from "../components/GovernanceProposalCard";
import GovernancePolicyCard from "../components/GovernancePolicyCard";
import { useAPI } from "../hooks/useAPI";

export default function GovernanceDashboardPage() {
  const api = useAPI();
  const [proposals, setProposals] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const p = await api.get("/governance/proposals");
      if (p.success) setProposals(p.data);

      const pol = await api.get("/governance/policies");
      if (pol.success) setPolicies(pol.data);
    })();
  }, []);

  return (
    <div className="page-container">
      <div className="page-title">CosmaCare Governance</div>

      <div className="card-title">Active Proposals</div>
      {proposals.map((p) => (
        <GovernanceProposalCard key={p.id} proposal={p} />
      ))}

      <div className="card-title" style={{ marginTop: 24 }}>
        Policies
      </div>
      {policies.map((p) => (
        <GovernancePolicyCard key={p.id} policy={p} />
      ))}
    </div>
  );
}
