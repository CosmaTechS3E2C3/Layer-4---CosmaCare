CREATE OR REPLACE FUNCTION on_governance_policy_updated()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'governance.policy.updated',
    'policy_id', NEW.id,
    'key', NEW.key,
    'value', NEW.value,
    'active', NEW.active,
    'updated_by', NEW.updated_by,
    'updated_at', NEW.updated_at
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

