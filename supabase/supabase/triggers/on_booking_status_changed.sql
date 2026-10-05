CREATE OR REPLACE FUNCTION on_booking_status_changed()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'booking.status_changed',
    'booking_id', NEW.id,
    'client', NEW.client_address,
    'provider', NEW.provider_address,
    'status', NEW.status,
    'client_did', NEW.client_did,
    'provider_did', NEW.provider_did
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
