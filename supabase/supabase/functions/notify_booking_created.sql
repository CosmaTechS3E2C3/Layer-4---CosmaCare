create or replace function notify_booking_created()
returns trigger as $$
begin
  perform pg_notify(
    'cosmacare',
    json_build_object(
      'event', 'cosmacare.booking.created',
      'bookingId', NEW.id,
      'clientAddress', NEW.client_address,
      'providerAddress', NEW.provider_address,
      'serviceId', NEW.service_id,
      'scheduledAt', NEW.scheduled_at
    )::text
  );
  return NEW;
end;
$$ language plpgsql;
