⭐ PROFILES (Universal Identity Layer)
sql
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
✔ Why
Matches Layer‑2 CosmaID, ESEC, S3E2C3.

⭐ SERVICES (Universal Service Catalog)
sql
CREATE TABLE IF NOT EXISTS services (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  base_price NUMERIC NOT NULL,
  s3e2c3_code TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
⭐ BOOKINGS (Universal Booking Lifecycle)
sql
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
✔ Why
Matches:

Layer‑1 BookingLifecycleEvent

Layer‑2 DID resolution

Layer‑0 anchoring

Layer‑3 realtime

Layer‑5 analytics

⭐ SETTLEMENTS (Universal Dual‑Coin Settlement)
sql
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
⭐ DISPUTES (Universal Dispute Lifecycle)
sql
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
⭐ REWARDS (Universal Reward Minting)
sql
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
