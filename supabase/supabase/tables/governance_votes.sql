CREATE TABLE IF NOT EXISTS governance_votes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  proposal_id BIGINT REFERENCES governance_proposals(id),
  voter_address TEXT NOT NULL,
  voter_did TEXT,
  support BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (proposal_id, voter_address)
);
