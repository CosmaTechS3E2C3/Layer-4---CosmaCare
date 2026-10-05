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

