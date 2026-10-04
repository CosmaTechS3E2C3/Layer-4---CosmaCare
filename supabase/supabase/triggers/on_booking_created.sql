create trigger on_booking_created
after insert on bookings
for each row
execute procedure notify_booking_created();
