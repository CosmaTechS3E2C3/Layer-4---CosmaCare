CREATE TRIGGER sync_booking_did_trigger
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION sync_booking_did();

