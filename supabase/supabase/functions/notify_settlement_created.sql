CREATE OR REPLACE FUNCTION notify_settlement_created()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'settlement.created',
    'settlement_id', NEW.id,
    'booking_id', NEW.booking_id,
    'total_amount', NEW.total_amount,
    'provider_amount', NEW.provider_amount,
    'platform_amount', NEW.platform_amount,
    'partner_amount', NEW.partner_amount,
    'burn_amount', NEW.burn_amount,
    'token', NEW.token_symbol
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

