create or replace function notify_booking_status_changed()
returns trigger as $$
begin
  perform pg_notify(
    'cosmacare',
    json_build_object(
      'event', 'cosmacare.booking.' || NEW.status,
      'bookingId', NEW.id
    )::text
  );
  return NEW;
end;
$$ language plpgsql;
