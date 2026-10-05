CREATE OR REPLACE FUNCTION notify_dispute_resolved()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'dispute.resolved',
    'dispute_id', NEW.id,
    'booking_id', NEW.booking_id,
    'status', NEW.status,
    'resolution_note', NEW.resolution_note
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

