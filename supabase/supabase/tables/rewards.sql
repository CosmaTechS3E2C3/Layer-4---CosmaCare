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
