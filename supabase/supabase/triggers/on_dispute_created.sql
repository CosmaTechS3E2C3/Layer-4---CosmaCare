create trigger on_dispute_created
after insert on disputes
for each row
execute procedure notify_dispute_created();
