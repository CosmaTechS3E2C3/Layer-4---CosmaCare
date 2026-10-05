CREATE OR REPLACE FUNCTION notify_booking_created()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'booking.created',
    'booking_id', NEW.id,
    'client', NEW.client_address,
    'provider', NEW.provider_address,
    'status', NEW.status
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
