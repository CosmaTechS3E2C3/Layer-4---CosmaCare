import React, { useState } from "react";
import { useAPI } from "../hooks/useAPI";

export default function VoteForm({ proposalId }: { proposalId: number }) {
  const api = useAPI();
  const [support, setSupport] = useState<boolean | null>(null);
  const [voter, setVoter] = useState("");

  async function submit() {
    if (support === null || !voter.trim()) return;
    await api.post(`/governance/proposals/${proposalId}/vote`, {
      voter_address: voter,
      support
    });
    setSupport(null);
    setVoter("");
  }

  return (
    <div style={{ marginTop: 12 }}>
      <input
        className="input"
        placeholder="Your address"
        value={voter}
        onChange={(e) => setVoter(e.target.value)}
      />
      <div>
        <button className="btn" onClick={() => setSupport(true)}>
          Vote Yes
        </button>
        <button className="btn" style={{ marginLeft: 8 }} onClick={() => setSupport(false)}>
          Vote No
        </button>
      </div>
      <button className="btn" style={{ marginTop: 8 }} onClick={submit}>
        Submit Vote
      </button>
    </div>
  );
}
