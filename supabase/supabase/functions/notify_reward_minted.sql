create or replace function notify_reward_minted()
returns trigger as $$
begin
  perform pg_notify(
    'cosmacare',
    json_build_object(
      'event', 'cosmacare.rewards.minted',
      'rewardId', NEW.id,
      'bookingId', NEW.booking_id,
      'providerAddress', NEW.provider_address,
      'creditAmount', NEW.credit_amount,
      'tokenSymbol', NEW.token_symbol,
      'reasonCode', NEW.reason_code
    )::text
  );
  return NEW;
end;
$$ language plpgsql;
