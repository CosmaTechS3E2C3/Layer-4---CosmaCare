-- ============================
-- PROFILES (Universal Identity Layer)
-- ============================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT UNIQUE NOT NULL,
  did TEXT UNIQUE,
  role TEXT CHECK (role IN ('provider', 'client')),
  esec_score INTEGER DEFAULT 0,
  s3e2c3_tier INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- SERVICES (Universal Service Catalog)
-- ============================
CREATE TABLE IF NOT EXISTS services (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  base_price NUMERIC NOT NULL,
  s3e2c3_code TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- BOOKINGS (Universal Booking Lifecycle)
-- ============================
CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT PRIMARY KEY,
  client_address TEXT NOT NULL,
  provider_address TEXT NOT NULL,
  client_did TEXT,
  provider_did TEXT,
  service_id BIGINT REFERENCES services(id),
  scheduled_at TIMESTAMPTZ,
  status TEXT CHECK (
    status IN (
      'pending',
      'confirmed',
      'completed',
      'settled',
      'closed',
      'disputed'
    )
  ),
  tx_hash_create TEXT,
  tx_hash_update TEXT,
  tx_hash_settle TEXT,
  l0_anchor_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- SETTLEMENTS (Dual‑Coin Settlement)
-- ============================
CREATE TABLE IF NOT EXISTS settlements (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  booking_id BIGINT REFERENCES bookings(id),
  total_amount NUMERIC NOT NULL,
  provider_amount NUMERIC NOT NULL,
  platform_amount NUMERIC NOT NULL,
  partner_amount NUMERIC NOT NULL,
  burn_amount NUMERIC NOT NULL,
  token_symbol TEXT CHECK (token_symbol IN ('C2', 'S1')),
  settled_at TIMESTAMPTZ DEFAULT NOW(),
  tx_hash TEXT,
  l0_anchor_hash TEXT
);

-- ============================
-- DISPUTES (Universal Dispute Lifecycle)
-- ============================
CREATE TABLE IF NOT EXISTS disputes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  booking_id BIGINT REFERENCES bookings(id),
  raised_by TEXT CHECK (raised_by IN ('client', 'provider', 'system')),
  reason TEXT,
  status TEXT CHECK (
    status IN (
      'open',
      'under_review',
      'resolved',
      'rejected'
    )
  ),
  resolution_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  tx_hash TEXT,
  l0_anchor_hash TEXT
);

-- ============================
-- REWARDS (Universal Reward Minting)
-- ============================
CREATE TABLE IF NOT EXISTS rewards (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  booking_id BIGINT REFERENCES bookings(id),
  provider_address TEXT NOT NULL,
  provider_did TEXT,
  credit_amount NUMERIC NOT NULL,
  token_symbol TEXT CHECK (token_symbol IN ('C2', 'S1')),
  reason_code TEXT,
  minted_at TIMESTAMPTZ DEFAULT NOW(),
  tx_hash TEXT,
  l0_anchor_hash TEXT
);

-- ============================
-- GOVERNANCE POLICIES (Universal Governance Layer)
-- ============================
CREATE TABLE IF NOT EXISTS governance_policies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  updated_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- GOVERNANCE PROPOSALS
-- ============================
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

-- ============================
-- GOVERNANCE VOTES
-- ============================
CREATE TABLE IF NOT EXISTS governance_votes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  proposal_id BIGINT REFERENCES governance_proposals(id),
  voter_address TEXT NOT NULL,
  voter_did TEXT,
  support BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (proposal_id, voter_address)
);

-- ============================
-- GOVERNANCE EVENTS (Audit Log)
-- ============================
CREATE TABLE IF NOT EXISTS governance_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_type TEXT,
  proposal_id BIGINT,
  actor_address TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
