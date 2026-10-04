create or replace function notify_dispute_resolved()
returns trigger as $$
begin
  perform pg_notify(
    'cosmacare',
    json_build_object(
      'event', 'cosmacare.dispute.resolved',
      'disputeId', NEW.id,
      'bookingId', NEW.booking_id,
      'status', NEW.status,
      'resolutionNote', NEW.resolution_note
    )::text
  );
  return NEW;
end;
$$ language plpgsql;
