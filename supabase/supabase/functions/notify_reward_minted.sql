CREATE OR REPLACE FUNCTION notify_reward_minted()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'reward.minted',
    'reward_id', NEW.id,
    'booking_id', NEW.booking_id,
    'provider', NEW.provider_address,
    'amount', NEW.credit_amount,
    'token', NEW.token_symbol,
    'reason_code', NEW.reason_code
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

