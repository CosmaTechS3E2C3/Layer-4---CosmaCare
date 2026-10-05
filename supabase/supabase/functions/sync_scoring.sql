CREATE OR REPLACE FUNCTION sync_esec(addr TEXT, delta INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET esec_score = COALESCE(esec_score, 0) + delta,
      updated_at = NOW()
  WHERE address = addr;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sync_s3e2c3(addr TEXT, new_tier INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET s3e2c3_tier = new_tier,
      updated_at = NOW()
  WHERE address = addr;
END;
$$ LANGUAGE plpgsql;

