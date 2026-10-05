CREATE TABLE IF NOT EXISTS governance_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_type TEXT,
  proposal_id BIGINT,
  actor_address TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
