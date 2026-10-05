CREATE OR REPLACE FUNCTION on_profile_updated()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'profile.updated',
    'profile_id', NEW.id,
    'address', NEW.address,
    'did', NEW.did,
    'role', NEW.role,
    'esec_score', NEW.esec_score,
    's3e2c3_tier', NEW.s3e2c3_tier,
    'updated_at', NEW.updated_at
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

