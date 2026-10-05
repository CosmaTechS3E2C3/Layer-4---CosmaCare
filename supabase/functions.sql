-- ============================
-- RESOLVE DID FROM PROFILES
-- ============================
CREATE OR REPLACE FUNCTION resolve_did(addr TEXT)
RETURNS TEXT AS $$
DECLARE
  did_val TEXT;
BEGIN
  SELECT did INTO did_val FROM profiles WHERE address = addr;
  RETURN did_val;
END;
$$ LANGUAGE plpgsql;

-- ============================
-- SYNC BOOKING DID FIELDS
-- ============================
CREATE OR REPLACE FUNCTION sync_booking_did()
RETURNS TRIGGER AS $$
BEGIN
  NEW.client_did := resolve_did(NEW.client_address);
  NEW.provider_did := resolve_did(NEW.provider_address);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_booking_did_trigger
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION sync_booking_did();

-- ============================
-- SYNC ESEC SCORE
-- ============================
CREATE OR REPLACE FUNCTION update_esec_score(addr TEXT, delta INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET esec_score = COALESCE(esec_score, 0) + delta,
      updated_at = NOW()
  WHERE address = addr;
END;
$$ LANGUAGE plpgsql;

-- ============================
-- SYNC S3E2C3 TIER
-- ============================
CREATE OR REPLACE FUNCTION update_s3e2c3_tier(addr TEXT, new_tier INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET s3e2c3_tier = new_tier,
      updated_at = NOW()
  WHERE address = addr;
END;
$$ LANGUAGE plpgsql;

-- ============================
-- SETTLEMENT SYNC
-- ============================
CREATE OR REPLACE FUNCTION sync_settlement()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE bookings
  SET status = 'settled',
      tx_hash_settle = NEW.tx_hash,
      updated_at = NOW()
  WHERE id = NEW.booking_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_settlement_trigger
AFTER INSERT ON settlements
FOR EACH ROW EXECUTE FUNCTION sync_settlement();

