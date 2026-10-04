create or replace function notify_dispute_created()
returns trigger as $$
begin
  perform pg_notify(
    'cosmacare',
    json_build_object(
      'event', 'cosmacare.booking.disputed',
      'bookingId', NEW.booking_id,
      'disputeId', NEW.id,
      'raisedBy', NEW.raised_by,
      'reason', NEW.reason
    )::text
  );
  return NEW;
end;
$$ language plpgsql;
