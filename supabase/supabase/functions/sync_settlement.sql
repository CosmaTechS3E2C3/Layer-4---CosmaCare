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

