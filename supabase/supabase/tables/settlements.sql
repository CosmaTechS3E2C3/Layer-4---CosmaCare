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
