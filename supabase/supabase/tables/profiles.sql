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
