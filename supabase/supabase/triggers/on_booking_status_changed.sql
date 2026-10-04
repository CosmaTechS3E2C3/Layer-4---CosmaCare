create trigger on_booking_status_changed
after update on bookings
for each row
execute procedure notify_booking_status_changed();
