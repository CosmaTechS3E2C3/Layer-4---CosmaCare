CREATE OR REPLACE FUNCTION on_reward_minted()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'reward.minted',
    'reward_id', NEW.id,
    'booking_id', NEW.booking_id,
    'provider', NEW.provider_address,
    'provider_did', NEW.provider_did,
    'amount', NEW.credit_amount,
    'token', NEW.token_symbol,
    'reason_code', NEW.reason_code
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
