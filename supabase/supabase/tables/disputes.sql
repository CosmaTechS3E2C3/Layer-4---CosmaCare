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
