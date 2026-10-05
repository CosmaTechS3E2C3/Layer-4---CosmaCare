-- ============================
-- AUTO-UPDATE TIMESTAMPS
-- ============================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_bookings_timestamp
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ============================
-- REALTIME EVENT EMITTER
-- ============================
CREATE OR REPLACE FUNCTION emit_realtime_event()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'table', TG_TABLE_NAME,
    'action', TG_OP,
    'record', row_to_json(NEW)
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach realtime triggers
CREATE TRIGGER rt_profiles
AFTER INSERT OR UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION emit_realtime_event();

CREATE TRIGGER rt_bookings
AFTER INSERT OR UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION emit_realtime_event();

CREATE TRIGGER rt_disputes
AFTER INSERT OR UPDATE ON disputes
FOR EACH ROW EXECUTE FUNCTION emit_realtime_event();

CREATE TRIGGER rt_rewards
AFTER INSERT OR UPDATE ON rewards
FOR EACH ROW EXECUTE FUNCTION emit_realtime_event();

CREATE TRIGGER rt_settlements
AFTER INSERT OR UPDATE ON settlements
FOR EACH ROW EXECUTE FUNCTION emit_realtime_event();

-- ============================
-- GOVERNANCE AUDIT LOG
-- ============================
CREATE OR REPLACE FUNCTION governance_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO governance_events(event_type, proposal_id, actor_address, payload)
  VALUES (
    TG_OP,
    NEW.id,
    NEW.proposer_address,
    row_to_json(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_governance_proposals
AFTER INSERT OR UPDATE ON governance_proposals
FOR EACH ROW EXECUTE FUNCTION governance_audit();

