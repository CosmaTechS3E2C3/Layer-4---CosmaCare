CREATE OR REPLACE FUNCTION on_dispute_created()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'dispute.created',
    'dispute_id', NEW.id,
    'booking_id', NEW.booking_id,
    'raised_by', NEW.raised_by,
    'reason', NEW.reason,
    'status', NEW.status
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
