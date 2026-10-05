import React from "react";
import VoteForm from "./VoteForm";

export default function GovernanceProposalCard({ proposal }: { proposal: any }) {
  return (
    <div className="card">
      <div className="card-title">{proposal.title}</div>
      <div className="card-text">{proposal.description}</div>
      <div className="card-text">Policy: {proposal.policy_key}</div>
      <div className="card-text">Yes: {proposal.yes_votes} | No: {proposal.no_votes}</div>
      <div className="card-text small">Status: {proposal.status}</div>

      <VoteForm proposalId={proposal.id} />
    </div>
  );
}
