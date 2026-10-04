create or replace function notify_settlement_created()
returns trigger as $$
begin
  perform pg_notify(
    'cosmacare',
    json_build_object(
      'event', 'cosmacare.booking.settled',
      'bookingId', NEW.booking_id,
      'settlementId', NEW.id,
      'providerAmount', NEW.provider_amount,
      'platformAmount', NEW.platform_amount,
      'partnerAmount', NEW.partner_amount,
      'burnAmount', NEW.burn_amount
    )::text
  );
  return NEW;
end;
$$ language plpgsql;
