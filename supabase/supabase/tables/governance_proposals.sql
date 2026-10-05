CREATE TABLE IF NOT EXISTS governance_proposals (
  id BIGINT PRIMARY KEY,
  proposer_address TEXT NOT NULL,
  proposal_did TEXT,
  title TEXT NOT NULL,
  description TEXT,
  policy_key TEXT,
  policy_value TEXT,
  policy_active BOOLEAN,
  yes_votes INTEGER DEFAULT 0,
  no_votes INTEGER DEFAULT 0,
  status TEXT CHECK (
    status IN ('pending', 'active', 'passed', 'failed', 'executed')
  ),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ
);
