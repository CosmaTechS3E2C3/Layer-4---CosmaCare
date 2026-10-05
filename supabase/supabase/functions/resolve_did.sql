CREATE OR REPLACE FUNCTION resolve_did(addr TEXT)
RETURNS TEXT AS $$
DECLARE
  did_val TEXT;
BEGIN
  SELECT did INTO did_val FROM profiles WHERE address = addr;
  RETURN did_val;
END;
$$ LANGUAGE plpgsql;

